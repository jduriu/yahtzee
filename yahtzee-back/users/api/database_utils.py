from pymongo import MongoClient
from fastapi import HTTPException, status
from datetime import timedelta
from api.schema import Token
from api.config import Settings
from api.auth import AuthenticationUtilities

settings = Settings()
auth_utils = AuthenticationUtilities()


class MongoDB:
    client = MongoClient("localhost", 27017, uuidRepresentation="standard")
    db = client.yahtzee_database.users

    def create_user(self, form_data):
        user_info = form_data.model_dump(by_alias=True, exclude=["id"])
        username_taken = self.db.find_one({
            "username": user_info["username"]
        })
        if not username_taken:
            hashed_password = auth_utils.get_password_hash(user_info["password"])
            user_info["hashed_password"] = hashed_password
            del user_info["password"]
            self.db.insert_one(user_info)
            user = self.get_user(user_info["username"])
            return user
        raise HTTPException(status_code=404, detail="Username taken")

    def login_for_access_token(self, form_data):
        user = self.get_user(
            username=form_data.username,
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username",
                headers={"WWW-Authenticate": "Bearer"},
            )
        password_verified = auth_utils.verify_password(
            plain_password=form_data.password,
            hashed_password=user.hashed_password
        )
        if not password_verified:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(
            minutes=settings.access_token_expire_minutes
        )
        access_token = auth_utils.create_access_token(
            data={"sub": user.username},
            expires_delta=access_token_expires,
        )
        return Token(access_token=access_token, token_type="bearer")
