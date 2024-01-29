from fastapi import APIRouter, Depends
from api.schema import UserSignup, UserInDB, Token, TokenData
from typing import Annotated
from api.database_utils import Mongo_Users
from fastapi.security import OAuth2PasswordRequestForm
from api.auth import Authenticator

users_router = APIRouter()


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
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    database_utils: Mongo_Users = Depends(),
):
    return database_utils.login_for_access_token(form_data)


################################################################
#                    Protected Endpoints
################################################################


@users_router.get("/user", response_model=UserInDB)
def get_user_me(
    token_data: Annotated[TokenData, Depends(Authenticator())],
    database_utils: Mongo_Users = Depends()
):
    return database_utils.get_user(token_data.username)
