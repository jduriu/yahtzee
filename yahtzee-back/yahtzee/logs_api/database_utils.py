from pymongo import MongoClient
from bson import ObjectId
from fastapi import HTTPException
from fastapi import Response
from fastapi import status
from time import time
import os

db_url = os.environ.get("DATABASE_URL")
client = MongoClient(db_url, uuidRepresentation="standard")
db = client.yahtzee.logs


class Mongo_Logs:
    def create_log_history(self, new_logs):
        new_logs_id = db.insert_one(
            new_logs.model_dump(by_alias=True, exclude=["id"])
        ).inserted_id
        if new_logs_id:
            return self.get_log_history(new_logs_id)
        else:
            raise HTTPException(
                status_code=400,
                detail="scorecard unable to be created"
            )

    def get_log_histories(self):
        log_histories = [log_history for log_history in db.find()]
        return log_histories

    def get_log_history(self, id):

        log_history = db.find_one({"_id": ObjectId(id)})
        return log_history

    def add_log(self, log_history_id, log):

        new_log = log.model_dump()
        new_log["log_time"] = time()
        db.find_one_and_update(
            {"_id": ObjectId(log_history_id)},
            {"$push": {"logs": new_log}}
        )
        updated_log_history = self.get_log_history(log_history_id)
        return updated_log_history
