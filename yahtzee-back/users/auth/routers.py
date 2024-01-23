from fastapi import APIRouter, Depends
from auth.queries import AuthQueries
from auth.schema import UserSignup, UserInDB, Token
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from config import Settings
from functools import lru_cache


users_router = APIRouter()


@lru_cache
def get_settings():
    return Settings()


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
    response_model=Token
)
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    settings: Annotated[Settings, Depends(get_settings)],
    queries: AuthQueries = Depends(),
):
    return queries.login_for_access_token(form_data, settings)


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
