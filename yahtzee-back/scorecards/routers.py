from fastapi import APIRouter, Depends, Response
from queries import ScorecardQueries
from schema import Scorecard, Scorecards

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
