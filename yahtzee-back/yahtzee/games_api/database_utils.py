from pymongo import MongoClient
from time import time
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import HTTPException, Response, status

client = MongoClient("localhost", 27017, uuidRepresentation="standard")
db = client.yahtzee_database.games


class Mongo_Games:
    def create_game(self, game):
        """
        Create a game instance and initialize a start time
        """
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
        """
        Obtain all game instances in the games collection.
        """
        all_games = [game for game in db.find()]
        return all_games

    def get_game(self, id):
        """
        Obtain a single game instance based on the input id
        """
        game = db.find_one({"_id": ObjectId(id)})
        return game

    def update_game(self, id, game):
        """
        Update optional fields on a game instance.
        Fields include player_ids, scorecard_ids, and turns_taken
        """
        fields = {
            k: v for k, v in game.model_dump(by_alias=True).items() if v is not None  # noqa
        }

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
        """
        Remove game instance from the database.
        """
        mongo_response = db.delete_one({"_id": ObjectId(id)})
        if mongo_response.deleted_count == 1:
            return Response(status_code=status.HTTP_204_NO_CONTENT)

        raise HTTPException(status_code=404, detail=f"Game {id} not found")
