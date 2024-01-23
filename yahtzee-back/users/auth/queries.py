
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from pymongo import MongoClient
from typing import Annotated
from fastapi import Depends, HTTPException, status
from datetime import datetime, timedelta, timezone
from auth.schema import Token, TokenData, UserInDB, User
from bson import ObjectId
from auth.auth_helpers import AuthHelpers


client = MongoClient("localhost", 27017, uuidRepresentation="standard")
db = client.yahtzee_database
users_collection = db.users

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

AuthHelpers = AuthHelpers()


class AuthQueries:
    # async def get_current_user(
    #     self,
    #     token: Annotated[str, Depends(oauth2_scheme)],
    #     settings: Annotated[Settings, Depends(get_settings)]
    # ):
    #     credentials_exception = HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Could not validate credentials",
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )
    #     try:
    #         payload = jwt.decode(
    #             token,
    #             settings.SECRET_KEY,
    #             algorithms=[settings.ALGORITHM]
    #         )
    #         username: str = payload.get("sub")
    #         if username is None:
    #             raise credentials_exception
    #         token_data = TokenData(username=username)
    #     except JWTError:
    #         raise credentials_exception
    #     user = self.get_user(
    #         username=token_data.username
    #     )
    #     if user is None:
    #         raise credentials_exception
    #     return user

    # async def get_current_active_user(
    #     self,
    #     current_user: Annotated[User, Depends(get_current_user)]
    # ):
    #     if current_user.disabled:
    #         raise HTTPException(status_code=400, detail="Inactive user")
    #     return current_user

    def login_for_access_token(
        self, form_data, settings
    ):
        user = AuthHelpers.authenticate_user(
            username=form_data.username,
            password=form_data.password,
            collection=users_collection
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(
            minutes=settings.access_token_expire_minutes
        )
        access_token = AuthHelpers.create_access_token(
            data={"sub": user.username},
            settings=settings,
            expires_delta=access_token_expires,
        )
        return Token(access_token=access_token, token_type="bearer")

    # async def read_users_me(
    #     self,
    #     current_user: Annotated[User, Depends(get_current_active_user)]
    # ):
    #     return current_user

    # async def read_own_items(
    #     self,
    #     current_user: Annotated[User, Depends(get_current_active_user)]
    # ):
    #     return [{"user_id": current_user[ObjectId(id)], "owner": current_user.username}]

    def create_user(self, form_data):
        user_info = form_data.model_dump(by_alias=True, exclude=["id"])
        username_taken = users_collection.find_one({
            "username": user_info["username"]
        })
        if not username_taken:
            hashed_password = self.get_password_hash(user_info["password"])
            user_info["hashed_password"] = hashed_password
            del user_info["password"]
            users_collection.insert_one(user_info)
            user = self.get_user(user_info["username"])
            return user
        raise HTTPException(status_code=404, detail="Username taken")
