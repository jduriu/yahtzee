from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries import GameQueries

router = APIRouter()


@router.post("/games")
def create_game(
    game: GameIn,
    response: Response,
    queries: GameQueries = Depends(),
):
    response.status_code = 200
    return queries.create_game(game)
