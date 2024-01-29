from fastapi import APIRouter, Depends, Body
from games_api.database_utils import Mongo_Games
from games_api.schema import Game, Games, UpdateGame

games_router = APIRouter()


@games_router.post("/game", response_model=Game)
def create_game(
    game: Game,
    db_utils: Mongo_Games = Depends(),
):
    return db_utils.create_game(game)


@games_router.get("/games", response_model=Games)
def get_all_games(
    db_utils: Mongo_Games = Depends(),
    response_model_by_alias=False,
):
    return Games(games=db_utils.get_all_games())


@games_router.get("/game", response_model=Game)
def get_game(
    id: str,
    db_utils: Mongo_Games = Depends(),
):
    return db_utils.get_game(id)


@games_router.put("/games/{id}", response_model=Game, response_model_by_alias=False)  # noqa
def update_game(
    id: str,
    db_utils: Mongo_Games = Depends(),
    game: UpdateGame = Body(...),
):
    return db_utils.update_game(id, game)


@games_router.delete("/games/{id}")
def delete_game(
    id: str,
    db_utils: Mongo_Games = Depends(),
):
    return db_utils.delete_game(id)
