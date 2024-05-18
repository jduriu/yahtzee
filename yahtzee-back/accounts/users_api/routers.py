from fastapi import APIRouter, Depends, Request
from users_api.schema import (
    UserSignup,
    UserInDB,
    Token,
    UserLogin,
    UserToClient,
    UsersToClient
)
from users_api.database_utils import Mongo_Users
from users_api.auth import Authenticator, RefreshAuthenticator
from typing import List

users_router = APIRouter(prefix="/api")
authenticator = Authenticator()
refreshAuthenticator = RefreshAuthenticator()


################################################################
#                Signup and Login Endpoints
################################################################


@users_router.post("/signup", response_model=UserInDB,)
def signup(
    user_form: UserSignup,
    database_utils: Mongo_Users = Depends(),
    response_model_by_alias=False,
):
    """
    Create a User instance in the database by taking in user
    information from UserSignup schema
    """
    return database_utils.create_user(user_form)


@users_router.post("/authenticate", response_model=Token)
def login_for_access_token(
    user_form: UserLogin,
    database_utils: Mongo_Users = Depends(),
):
    """
    Login with user credentials and receive access tokens
    """
    return database_utils.login_for_access_token(user_form)


################################################################
#                    Refresh Token Endpoint
################################################################


@users_router.post("/authenticate/refresh", response_model=Token)
def refresh_token(
    request: Request,
    database_utils: Mongo_Users = Depends(),
):
    """
    Authenticate and refresh token if user credentials are within
    expiration timelines
    """
    token_data = refreshAuthenticator(request)
    return database_utils.refresh_token(
        token_data.username,
        token_data.refresh_token
    )

################################################################
#                    Protected Endpoints
################################################################


@users_router.get("/user", response_model=UserToClient)
def get_user_me(
    request: Request,
    database_utils: Mongo_Users = Depends(),
):
    """
    Authenticate and get user data based on received token
    """
    token_data = authenticator(request)
    return database_utils.get_user_for_client(token_data.username)


################################################################
#                    Unprotected Endpoints
################################################################


@users_router.get("/leaderboard-users", response_model=UsersToClient)
def get_leaderboard_users(
    users: List[str],
    database_utils: Mongo_Users = Depends(),
):
    """
    Get a list of user data from a list of user_ids
    """
    return database_utils.get_leaderboard_users(users)
