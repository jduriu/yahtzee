from pymongo import MongoClient
from bson import ObjectId
from fastapi import HTTPException, Response, status
from pymongo import ReturnDocument
import os

db_url = os.environ.get("DATABASE_URL")
client = MongoClient(db_url, uuidRepresentation="standard")
db = client.yahtzee.scorecards


class Mongo_Logs:
    def create_log_history(self):
        """
        Create a scorecard instance and return the instance
        """
        new_log_history = db.insert_one(
            log_history.model_dump(by_alias=True, exclude=["id"])
        )
        if new_scorecard:
            return self.get_log_history(new_log_history.inserted_id)
        else:
            raise HTTPException(
                status_code=400,
                detail="scorecard unable to be created"
            )
