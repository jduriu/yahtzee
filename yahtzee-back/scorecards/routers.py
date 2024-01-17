from fastapi import APIRouter, Depends, Response, HTTPException, status
from queries import ScorecardQueries
# from schema import ScorecardIn, ScorecardOut

router = APIRouter()

# EXAMPLE
# @router.post("/scorecards", response_model=ScorecardOut)
# def create_scorecard(
#     scorecard: ScorecardIn,
#     response: Response,
#     queries: ScorecardQueries = Depends(),
# ):
#     response.status_code = 200
#     pass
