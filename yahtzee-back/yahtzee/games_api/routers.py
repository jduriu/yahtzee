from fastapi import APIRouter, Depends, Body
from games_api.database_utils import Mongo_Games
from games_api.schema import Game, Games, UpdateGame

games_router = APIRouter(prefix="/api")


@games_router.post("/game", response_model=Game)
def create_game(
    game: Game,
    db_utils: Mongo_Games = Depends(),
):
    """
    Create a game instance and initialize a start time
    """
    return db_utils.create_game(game)


@games_router.get("/games", response_model=Games)
def get_all_games(
    db_utils: Mongo_Games = Depends(),
    response_model_by_alias=False,
):
    """
    Obtain all game instances in the games collection.
    """
    all_games = db_utils.get_all_games()
    return Games(games=all_games)


@games_router.get("/games-by-user", response_model=Games)
def get_games_by_user(
    id: str,
    db_utils: Mongo_Games = Depends(),
    response_model_by_alias=False,
):
    """
    Obtain all game instances associated with input user id
    """
    user_games = db_utils.get_games_by_user(id)
    return Games(games=user_games)


@games_router.get("/game", response_model=Game)
def get_game(
    id: str,
    db_utils: Mongo_Games = Depends(),
):
    """
    Obtain a single game instance based on the input id
    """
    return db_utils.get_game(id)


@games_router.put("/games/{id}", response_model=Game, response_model_by_alias=False)  # noqa
def update_game(
    id: str,
    db_utils: Mongo_Games = Depends(),
    game: UpdateGame = Body(...),
):
    """
    Update optional fields on a game instance.
    Fields include player_ids, scorecard_ids, and turns_taken
    """
    return db_utils.update_game(id, game)


@games_router.delete("/games/{id}")
def delete_game(
    id: str,
    db_utils: Mongo_Games = Depends(),
):
    """
    Remove game instance from the database.
    """
    return db_utils.delete_game(id)
