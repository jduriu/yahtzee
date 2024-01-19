from fastapi import APIRouter, Depends, Response, Body
from scorecards.queries import ScorecardQueries
from scorecards.schema import Scorecard, Scorecards, UpdateScorecard

scorecards_router = APIRouter()


@scorecards_router.post(
    "/scorecard",
    response_model=Scorecard
)
def create_scorecard(
    scorecard: Scorecard,
    response: Response,
    queries: ScorecardQueries = Depends()
):
    response.status_code = 200
    return queries.create_scorecard(scorecard)


@scorecards_router.get(
    "/scorecards",
    response_model=Scorecards
)
def get_scorecards(
    response: Response,
    queries: ScorecardQueries = Depends()
):
    response.status_code = 200
    all_scorecards = queries.get_scorecards()
    return Scorecards(scorecards=all_scorecards)


@scorecards_router.get(
    "/scorecard",
    response_model=Scorecard
)
def get_scorecard(
    id: str,
    response: Response,
    queries: ScorecardQueries = Depends()
):
    response.status_code = 200
    return queries.get_scorecard(id)


@scorecards_router.put(
    "/scorecards/{id}",
    response_model=Scorecard
)
def update_scorecard(
    id: str,
    response: Response,
    queries: ScorecardQueries = Depends(),
    scorecard: UpdateScorecard = Body(...),
):
    response.status_code = 200
    return queries.update_scorecard(id, scorecard)


@scorecards_router.delete(
    "/scorecards/{id}",
)
def delete_scorecard(
    id: str,
    queries: ScorecardQueries = Depends(),
):
    return queries.delete_scorecard(id)
