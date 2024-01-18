from pymongo import MongoClient
from time import time
from bson import ObjectId
from pymongo import ReturnDocument
from fastapi import HTTPException

client = MongoClient("localhost", 27017, uuidRepresentation="standard")
db = client.yahtzee_database


class GameQueries:
    def create_game(self, game):
        """
        Create a game instance and initialize a start time
        """
        document = game.model_dump(by_alias=True, exclude=["id"])
        document["start_time"] = time()
        created_game = db.games.insert_one(document)
        new_game = self.get_game(created_game.inserted_id)
        return new_game

    def get_all_games(self):
        """
        Obtain all game instances in the games collection.
        """
        all_games = [game for game in db.games.find()]
        return all_games

    def get_game(self, id):
        """
        Obtain a single game instance based on the input id
        """
        game = db.games.find_one({"_id": ObjectId(id)})
        return game

    def update_game(self, id, game):
        game = {
            k: v for k, v in game.model_dump(by_alias=True).items() if v is not None  # noqa
        }

        if len(game) >= 1:
            updated_game = db.games.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": game},
                return_document=ReturnDocument.AFTER,
            )
            if updated_game is not None:
                return updated_game
            else:
                raise HTTPException(status_code=404, detail=f"Game {id} not found")

        if game == db.games.find_one({"_id": id}):
            return game

        raise HTTPException(status_code=404, detail=f"Game {id} not found")
