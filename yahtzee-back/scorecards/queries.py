from pymongo import MongoClient
from bson.objectid import ObjectId
from fastapi import HTTPException

client = MongoClient("localhost", 27017)
db = client.yahtzee_database
scorecards_collection = db.scorecards


class ScorecardQueries:
    def create_scorecard(self, scorecard):
        new_scorecard = scorecards_collection.insert_one(
            scorecard.model_dump(by_alias=True, exclude=["id"])
        )
        if new_scorecard:
            return self.get_scorecard(new_scorecard.inserted_id)
        else:
            raise HTTPException(
                status_code=400,
                detail="scorecard unable to be created"
            )

    def get_scorecard(self, id):
        """
        Obtain a single scorecard instance based on the input id
        """
        scorecard = scorecards_collection.find_one({"_id": ObjectId(id)})
        return scorecard

    def get_scorecards(self):
        """
        Obtain all scorecard instances in the database.
        """
        all_scorecards = [scorecard for scorecard in scorecards_collection.find()]  # noqa
        return all_scorecards
