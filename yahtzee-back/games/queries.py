from pymongo import MongoClient
from time import time
from bson.objectid import ObjectId

client = MongoClient("localhost", 27017)
db = client.yahtzee_database
games = db.games
scorecards = db.scorecards




class GameQueries:
  def create_game(self, game):
    document = game.dict()
    document['start_time'] = time()
    game_id = games.insert_one(document).inserted_id
    new_game = self.get_game(game_id)
    return new_game


  def get_game(self, game_id):
    game = games.find_one({"_id": ObjectId(game_id)})
    return game
