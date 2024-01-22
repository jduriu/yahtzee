
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pymongo import MongoClient
from typing import Annotated
from fastapi import Depends, HTTPException, status
from datetime import datetime, timedelta, timezone
from auth.schema import Token, TokenData, UserInDB, User
from config import Settings
from functools import lru_cache
from bson import ObjectId


client = MongoClient("localhost", 27017, uuidRepresentation="standard")
db = client.yahtzee_database
users_collection = db.users

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@lru_cache
def get_settings():
    return Settings()


class AuthQueries:
    def verify_password(
        self,
        plain_password,
        hashed_password
    ):
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(
        self,
        password
    ):
        return pwd_context.hash(password)

    def get_user(
        self,
        username: str
    ):
        user = users_collection.find_one({"username": username})
        if user:
            return UserInDB(**user)
        else:
            raise HTTPException(
                status_code=404,
                detail="Username not found"
            )

    def authenticate_user(
        self,
        username: str,
        password: str
    ):
        user = self.get_user(username)
        if not user:
            return False
        if not self.verify_password(password, user.hashed_password):
            return False
        return user

    def create_access_token(
        self,
        data: dict,
        settings: dict,
        expires_delta: timedelta | None = None,
    ):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )
        return encoded_jwt

    async def get_current_user(
        self,
        token: Annotated[str, Depends(oauth2_scheme)],
        settings: Annotated[Settings, Depends(get_settings)]
    ):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.ALGORITHM]
            )
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            token_data = TokenData(username=username)
        except JWTError:
            raise credentials_exception
        user = self.get_user(
            username=token_data.username
        )
        if user is None:
            raise credentials_exception
        return user

    async def get_current_active_user(
        self,
        current_user: Annotated[User, Depends(get_current_user)]
    ):
        if current_user.disabled:
            raise HTTPException(status_code=400, detail="Inactive user")
        return current_user

    async def login_for_access_token(
        self,
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        settings: Annotated[Settings, Depends(get_settings)],
    ) -> Token:
        user = self.authenticate_user(
            form_data.username,
            form_data.password
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        access_token = self.create_access_token(
            data={"sub": user.username},
            expires_delta=access_token_expires,
            settings=settings,
        )
        return Token(access_token=access_token, token_type="bearer")

    async def read_users_me(
        self,
        current_user: Annotated[User, Depends(get_current_active_user)]
    ):
        return current_user

    async def read_own_items(
        self,
        current_user: Annotated[User, Depends(get_current_active_user)]
    ):
        return [{"user_id": current_user[ObjectId(id)], "owner": current_user.username}]

    async def create_user(
        self,
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    ):
        username_taken = users_collection.find_one({
            "username": form_data.username
        })
        if not username_taken:
            users_collection.insert_one(form_data)
        user = self.get_user(form_data.username)
        return user
