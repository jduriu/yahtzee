from fastapi import APIRouter, Depends, Body, HTTPException
from logs_api.database_utils import Mongo_Logs
from scorecards_api.database_utils import Mongo_Scorecards
from logs_api.schema import LogHistory, Log

logs_router = APIRouter(prefix="/api")


@logs_router.post("/log-history", response_model=LogHistory)
def create_log_history(
    scorecard_id: str,
    db_utils: Mongo_Logs = Depends(),
    validate_utils: Mongo_Scorecards = Depends()
):
    validate_utils.get_scorecard(scorecard_id)
    new_logs = LogHistory(scorecard_id=scorecard_id)
    return db_utils.create_log_history(new_logs)


# @logs_router.put("/log", response_model=LogHistory)
# def create_log(
#     log_history_id: str,
#     log: Log,
#     db_utils: Mongo_Logs = Depends()
# ):
#     return db_utils.add_log(log_history_id, log)
