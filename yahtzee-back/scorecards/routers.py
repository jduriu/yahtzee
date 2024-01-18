from fastapi import APIRouter, Depends, Response, Body
from queries import ScorecardQueries
from schema import Scorecard, Scorecards, UpdateScorecard

router = APIRouter()


@router.post(
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


@router.get(
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


@router.get(
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


@router.put(
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
