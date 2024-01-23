from fastapi import APIRouter, Depends
from auth.queries import AuthQueries
from auth.schema import UserSignup, UserInDB
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


users_router = APIRouter()


@users_router.post(
    "/signup",
    response_model=UserInDB,
)
def signup(
    user_form: UserSignup,
    queries: AuthQueries = Depends(),
    response_model_by_alias=False,
):
    return queries.create_user(user_form)


@users_router.post(
    "/token",
)
def login_for_access_token(
    queries: AuthQueries = Depends(),
):
    return queries.login_for_access_token()


@users_router.get("/users/me/")
def read_users_me(
    queries: AuthQueries = Depends()
):
    return queries.read_users_me()


@users_router.get("/users/me/items/")
def read_own_items(
    queries: AuthQueries = Depends()
):
    return queries.read_own_items()
