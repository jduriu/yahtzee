from fastapi import APIRouter, Depends, Response, Body
from games.queries import GameQueries
from games.schema import Game, Games, UpdateGame

games_router = APIRouter()


@games_router.post(
    "/game",
    response_model=Game
)
def create_game(
    game: Game,
    response: Response,
    queries: GameQueries = Depends(),
):
    response.status_code = 200
    return queries.create_game(game)


@games_router.get(
    "/games",
    response_model=Games
)
def get_all_games(
    response: Response,
    queries: GameQueries = Depends(),
    response_model_by_alias=False,
):
    response.status_code = 200
    return Games(games=queries.get_all_games())


@games_router.get(
    "/game",
    response_model=Game
)
def get_game(
    id: str,
    response: Response,
    queries: GameQueries = Depends(),
):
    response.status_code = 200
    return queries.get_game(id)


@games_router.put(
    "/games/{id}",
    response_model=Game,
    response_model_by_alias=False
)
def update_game(
    id: str,
    response: Response,
    queries: GameQueries = Depends(),
    game: UpdateGame = Body(...),
):
    response.status_code = 200
    return queries.update_game(id, game)


@games_router.delete(
    "/games/{id}",
)
def delete_game(
    id: str,
    queries: GameQueries = Depends(),
):
    return queries.delete_game(id)
