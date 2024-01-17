from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries import GameQueries
from schema import Game, Games
from uuid import UUID

router = APIRouter()


@router.post("/game", response_model=Game)
def create_game(
    game: Game,
    response: Response,
    queries: GameQueries = Depends(),
):
    response.status_code = 200
    return queries.create_game(game)


@router.get("/games", response_model=Games)
def get_all_games(
    response: Response,
    queries: GameQueries = Depends(),
    response_model_by_alias=False,
):
    response.status_code = 200
    return queries.get_all_games()


# @router.get("/game", response_model=Game)
# def get_game(
#     game_id: str,
#     response: Response,
#     queries: GameQueries = Depends(),
# ):
#     response.status_code = 200
#     return queries.get_game(game_id)


# @router.put("/games", response_model=Game)
# def update_game(
#     game: Game,
#     response: Response,
#     queries: GameQueries = Depends(),
# ):
#     response.status_code = 200
#     return queries.update_game(game)
