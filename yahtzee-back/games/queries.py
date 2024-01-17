from pymongo import MongoClient
from time import time
from schema import Games

client = MongoClient("localhost", 27017, uuidRepresentation="standard")
db = client.yahtzee_database


class GameQueries:
    def create_game(self, game):
        document = game.model_dump(by_alias=True, exclude=["id"])
        document["start_time"] = time()
        id = db.games.insert_one(document).inserted_id
        new_game = self.get_game(id)
        return new_game

    def get_all_games(self):
        """
        Obtain all game instances in the games collection.
        """
        all_games = []
        for game in db.games.find():
            all_games.append(game)

        return Games(games=all_games)

    def get_game(self, game_id):
        game = db.games.find_one({"_id": game_id})
        return game

    def update_game(self, game):
        db.games.update_one(
            {"id": game.id},
            {
                "$set": {
                    "player_ids": game.player_ids,
                    "scorecard_ids": game.scorecard_ids,
                    "turns_taken": game.turns_taken,
                }
            },
        )
        updated_game = db.games.find_one({"id": game.id})
        return updated_game
