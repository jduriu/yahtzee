from fastapi import APIRouter, Depends, Request, Form
from users_api.schema import UserSignup, UserInDB, Token, TokenData, User, UserLogin
from typing import Annotated
from users_api.database_utils import Mongo_Users
from fastapi.security import OAuth2PasswordRequestForm
from users_api.auth import Authenticator, RefreshAuthenticator

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
    return database_utils.create_user(user_form)


@users_router.post("/authenticate", response_model=Token)
def login_for_access_token(
    user_form: UserLogin,
    database_utils: Mongo_Users = Depends(),
):
    return database_utils.login_for_access_token(user_form)


################################################################
#                    Refresh Token Endpoint
################################################################


@users_router.post("/authenticate/refresh", response_model=Token)
def refresh_token(
    request: Request,
    database_utils: Mongo_Users = Depends(),
):
    token_data = refreshAuthenticator(request)
    return database_utils.refresh_token(
        token_data.username,
        token_data.refresh_token
    )

################################################################
#                    Protected Endpoints
################################################################


@users_router.get("/user", response_model=User)
def get_user_me(
    request: Request,
    database_utils: Mongo_Users = Depends(),
):
    token_data = authenticator(request)
    return database_utils.get_user(token_data.username)
