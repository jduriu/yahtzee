from fastapi import APIRouter, Depends, Body
from scorecards_api.database_utils import Mongo_Scorecards
from scorecards_api.schema import Scorecard, Scorecards, UpdateScorecard

scorecards_router = APIRouter()


@scorecards_router.post("/api/scorecard", response_model=Scorecard)
def create_scorecard(
    scorecard: Scorecard,
    db_utils: Mongo_Scorecards = Depends()
):
    return db_utils.create_scorecard(scorecard)


@scorecards_router.get("/api/scorecards", response_model=Scorecards)
def get_scorecards(
    db_utils: Mongo_Scorecards = Depends()
):
    all_scorecards = db_utils.get_scorecards()
    return Scorecards(scorecards=all_scorecards)


@scorecards_router.get("/api/scorecard", response_model=Scorecard)
def get_scorecard(
    id: str,
    db_utils: Mongo_Scorecards = Depends()
):
    return db_utils.get_scorecard(id)


@scorecards_router.put("/api/scorecards/{id}", response_model=Scorecard)
def update_scorecard(
    id: str,
    db_utils: Mongo_Scorecards = Depends(),
    scorecard: UpdateScorecard = Body(...),
):
    return db_utils.update_scorecard(id, scorecard)


@scorecards_router.delete("/api/scorecards/{id}")
def delete_scorecard(
    id: str,
    db_utils: Mongo_Scorecards = Depends(),
):
    return db_utils.delete_scorecard(id)
