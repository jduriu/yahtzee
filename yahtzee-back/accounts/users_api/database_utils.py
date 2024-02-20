from pymongo import MongoClient
from fastapi import HTTPException, status
from users_api.schema import UserInDB
from users_api.config import Settings
from users_api.auth import AuthenticationUtilities
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import os

settings = Settings()
auth_utils = AuthenticationUtilities()

db_url = os.environ.get("DATABASE_URL")
client = MongoClient(db_url, uuidRepresentation="standard")
db = client.yahtzee_database.users


class Mongo_Users:
    def create_user(self, form_data):
        user_info = form_data.model_dump(by_alias=True, exclude=["id"])
        username_taken = db.find_one({
            "username": user_info["username"]
        })
        if not username_taken:
            hashed_password = auth_utils.get_password_hash(user_info["password"]) # noqa
            user_info["hashed_password"] = hashed_password
            del user_info["password"]
            db.insert_one(user_info)
            user = self.get_user(user_info["username"])
            return user
        raise HTTPException(status_code=404, detail="Username taken")

    def get_user(self, username):
        user = db.find_one({
            "username": username
        })
        if not user:
            raise HTTPException(
                status_code=400,
                detail="User not found",
            )
        return UserInDB(**user)

    def login_for_access_token(self, username, password):
        user = self.get_user(
            username=username,
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username",
                headers={"WWW-Authenticate": "Bearer"},
            )
        password_verified = auth_utils.verify_password(
            plain_password=password,
            hashed_password=user.hashed_password
        )
        if not password_verified:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token, fingerprint_cookie = auth_utils.create_access_token(
            data={"sub": user.username},
        )
        response_headers = {
            "Set-Cookie": fingerprint_cookie,
        }
        refresh_token = auth_utils.create_refresh_token(
            data={"sub": user.username},
        )
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content=jsonable_encoder({
                "message": "Login successful, token generated",
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "Bearer"
            }),
            headers=response_headers
        )
