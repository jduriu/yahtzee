from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries.games import GameQueries
from schema.games import GameIn, GameOut

router = APIRouter()


@router.post("/games", response_model=GameOut)
def create_game(
    game: GameIn,
    response: Response,
    queries: GameQueries = Depends(),
):
    response.status_code = 200
    return queries.create_game(game)
