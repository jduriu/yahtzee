from passlib.context import CryptContext
from jose import jwt
from auth.schema import UserInDB
from fastapi import HTTPException
from datetime import datetime, timedelta, timezone


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthHelpers:
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
        username: str,
        collection
    ):
        user = collection.find_one({"username": username})
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
        password: str,
        collection
    ):
        user = self.get_user(
            username=username,
            collection=collection
        )
        if not user:
            return False
        if not self.verify_password(
            plain_password=password,
            hashed_password=user.hashed_password
        ):
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
            settings.secret_key,
            algorithm=settings.algorithm
        )
        return encoded_jwt
