from fastapi import APIRouter, Depends, Request, Form
from users_api.schema import UserSignup, UserInDB, Token, TokenData, UserForm
from typing import Annotated
from users_api.database_utils import Mongo_Users
from fastapi.security import OAuth2PasswordRequestForm
from users_api.auth import Authenticator

users_router = APIRouter()


################################################################
#                Signup and Login Endpoints
################################################################


@users_router.post("/signup", response_model=UserInDB,)
def signup(
    user_form: UserSignup,  # Need to verify this works with Next, may need to accept form data or a pydantic workaround
    database_utils: Mongo_Users = Depends(),
    response_model_by_alias=False,
):
    return database_utils.create_user(user_form)


@users_router.post("/authenticate", response_model=Token)
def login_for_access_token(
    username: Annotated[str, Form(...)],
    password: Annotated[str, Form(...)],
    database_utils: Mongo_Users = Depends(),
):
    return database_utils.login_for_access_token(username, password)


################################################################
#                    Protected Endpoints
################################################################


# @users_router.get("/user", response_model=UserInDB)
# async def get_user_me(
#     request: Request,
#     database_utils: Mongo_Users = Depends()
# ):
#     token_data = await Authenticator(request)
#     return database_utils.get_user(token_data.username)
