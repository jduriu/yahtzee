from fastapi import APIRouter, Depends
from auth.queries import AuthQueries
from auth.schema import User


users_router = APIRouter()


@users_router.post(
    "/signup"
)
def signup(
    queries: AuthQueries = Depends(),
):
    return queries.create_user()


@users_router.post(
    "/token",
)
def login_for_access_token(
    queries: AuthQueries = Depends(),
):
    return queries.login_for_access_token()


@users_router.get("/users/me/", response_model=User)
def read_users_me(
    queries: AuthQueries = Depends()
):
    return queries.read_users_me()


@users_router.get("/users/me/items/")
def read_own_items(
    queries: AuthQueries = Depends()
):
    return queries.read_own_items()
