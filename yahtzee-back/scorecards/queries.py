from pymongo import MongoClient
from bson import ObjectId
from fastapi import HTTPException
from pymongo import ReturnDocument

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

    def update_scorecard(self, id, scorecard):
        """
        Update optional fields on a scorecard instance.
        """
        fields = {
            k: v for k, v in scorecard.model_dump(by_alias=True).items() if v is not None  # noqa
        }

        if len(fields) >= 1:
            updated_scorecard = scorecards_collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": fields},
                return_document=ReturnDocument.AFTER,
            )
            if updated_scorecard is not None:
                return updated_scorecard
            else:
                raise HTTPException(
                    status_code=404,
                    detail=f"Scorecard {id} not found"
                )

        if scorecard == self.get_scorecard(id):
            return scorecard

        raise HTTPException(
            status_code=404,
            detail=f"Scorecard {id} not found"
        )
