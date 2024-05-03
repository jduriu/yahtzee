from pymongo import MongoClient
from bson import ObjectId
from fastapi import HTTPException, Response, status
from pymongo import ReturnDocument
import os

db_url = os.environ.get("DATABASE_URL")
client = MongoClient(db_url, uuidRepresentation="standard")
db = client.yahtzee.scorecards


class Mongo_Scorecards:
    def create_scorecard(self, scorecard):
        new_scorecard = db.insert_one(
            scorecard.model_dump(by_alias=True, exclude=["id"])
        )
        if new_scorecard:
            return self.get_scorecard(new_scorecard.inserted_id)
        else:
            raise HTTPException(
                status_code=400,
                detail="scorecard unable to be created"
            )

    def get_scorecards(self):

        all_scorecards = [scorecard for scorecard in db.find()]  # noqa
        return all_scorecards

    def get_scorecard(self, id):
        scorecard = db.find_one({"_id": ObjectId(id)})
        if scorecard:
            return scorecard
        else:
            raise HTTPException(
                status_code=400,
                detail="scorecard not found"
            )

    def get_scorecard_by_user_and_game(self, user_id, game_id):
        scorecard = db.find_one({
            "user_id": user_id,
            "game_id": game_id
        })
        return scorecard

    def update_scorecard(self, id, scorecard):
        fields = {
            k: v for k, v in scorecard.model_dump(by_alias=True).items() if v is not None  # noqa
        }

        if len(fields) >= 1:
            updated_scorecard = db.find_one_and_update(
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

    def delete_scorecard(self, id):
        mongo_response = db.delete_one(
            {"_id": ObjectId(id)}
        )
        if mongo_response.deleted_count == 1:
            return Response(status_code=status.HTTP_204_NO_CONTENT)

        raise HTTPException(status_code=404, detail=f"Game {id} not found")
