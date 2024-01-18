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
