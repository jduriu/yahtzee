from pymongo import MongoClient
from fastapi import HTTPException, status
from users_api.schema import Token, UserInDB
from users_api.config import Settings
from users_api.auth import AuthenticationUtilities
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

settings = Settings()
auth_utils = AuthenticationUtilities()


class Mongo_Users:
    client = MongoClient("localhost", 27017, uuidRepresentation="standard")
    db = client.yahtzee_database.users

    def create_user(self, form_data):
        user_info = form_data.model_dump(by_alias=True, exclude=["id"])
        username_taken = self.db.find_one({
            "username": user_info["username"]
        })
        if not username_taken:
            hashed_password = auth_utils.get_password_hash(user_info["password"]) # noqa
            user_info["hashed_password"] = hashed_password
            del user_info["password"]
            self.db.insert_one(user_info)
            user = self.get_user(user_info["username"])
            return user
        raise HTTPException(status_code=404, detail="Username taken")

    def get_user(self, username):
        user = self.db.find_one({
            "username": username
        })
        if not user:
            raise HTTPException(
                status_code=400,
                detail="User not found",
            )
        return UserInDB(**user)

    def login_for_access_token(self, form_data):
        user = self.get_user(
            username=form_data.username   # used when using FastAPI OAuth2 Form class attributes
            # username=form_data["username"],  # used when using react form
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username",
                headers={"WWW-Authenticate": "Bearer"},
            )
        password_verified = auth_utils.verify_password(
            # plain_password=form_data["password"],  # used when using react form
            plain_password=form_data.password,   # used when using FastAPI OAuth2 Form class attributes
            hashed_password=user.hashed_password
        )
        if not password_verified:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token = auth_utils.create_access_token(
            data={"sub": user.username},
        )
        response_headers = {
            "Authorization": f"Bearer {access_token}",
        }
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content=jsonable_encoder({"message": "Login successful, token generated"}),
            headers=response_headers
        )
