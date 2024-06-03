from pymongo import MongoClient
from time import time
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import HTTPException, Response, status
import os

db_url = os.environ.get("DATABASE_URL")
client = MongoClient(db_url, uuidRepresentation="standard")
db = client.yahtzee.games


class Mongo_Games:
    def create_game(self, game):
        document = game.model_dump(by_alias=True, exclude=["id"])
        document["start_time"] = time()
        created_game = db.insert_one(document)
        if created_game:
            new_game = self.get_game(created_game.inserted_id)
            return new_game
        raise HTTPException(
            status_code=400,
            detail="Game not created"
        )

    def get_all_games(self):
        all_games = [game for game in db.find()]
        return all_games

    def get_games_by_user(self, id):
        users_games = db.find({
            "player_ids": id
        })
        return users_games

    def get_game(self, id):
        game = db.find_one({"_id": ObjectId(id)})
        return game

    def update_game(self, id, game):
        fields = {
            k: v for k, v in game.model_dump(by_alias=True).items() if v is not None  # noqa
        }

        scored = fields.get("scored")
        if scored and len(scored) == 13:
            fields["completed"] = True

        if len(fields) >= 1:
            updated_game = db.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": fields},
                return_document=ReturnDocument.AFTER,
            )
            if updated_game is not None:
                return updated_game
            else:
                raise HTTPException(status_code=404, detail=f"Game {id} not found")  # noqa

        if game == self.get_game(id):
            return game

        raise HTTPException(status_code=404, detail=f"Game {id} not found")

    def delete_game(self, id):
        mongo_response = db.delete_one({"_id": ObjectId(id)})
        if mongo_response.deleted_count == 1:
            return Response(status_code=status.HTTP_204_NO_CONTENT)

        raise HTTPException(status_code=404, detail=f"Game {id} not found")
