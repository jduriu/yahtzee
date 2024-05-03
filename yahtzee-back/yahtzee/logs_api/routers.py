from fastapi import APIRouter, Depends, Body, HTTPException
from logs_api.database_utils import Mongo_Logs
from scorecards_api.database_utils import Mongo_Scorecards
from logs_api.schema import LogHistory, Log, LogHistories
from typing import List

logs_router = APIRouter(prefix="/api")


@logs_router.post("/log-history", response_model=LogHistory)
def create_log_history(
    scorecard_id: str,
    db_utils: Mongo_Logs = Depends(),
    validate_utils: Mongo_Scorecards = Depends()
):
    """
    Create a scorecard instance and return the instance
    """
    validate_utils.get_scorecard(scorecard_id)
    new_logs = LogHistory(scorecard_id=scorecard_id)
    return db_utils.create_log_history(new_logs)


@logs_router.put("/log", response_model=LogHistory)
def add_log(
    log_history_id: str,
    log: Log,
    db_utils: Mongo_Logs = Depends()
):
    """
    Create a log instance and add it to a history
    """
    return db_utils.add_log(log_history_id, log)


@logs_router.get("/log-history", response_model=LogHistory)
def get_logs(
    log_id: str,
    db_utils: Mongo_Logs = Depends()
):
    """
    Obtain a log history instance based on the input id
    """
    return db_utils.get_log_history(log_id)


@logs_router.get("/log-histories", response_model=LogHistories)
def get_all_logs(
    db_utils: Mongo_Logs = Depends()
):
    """
    Obtain all log history instances
    """
    log_histories = db_utils.get_log_histories()
    return LogHistories(log_histories=log_histories)
