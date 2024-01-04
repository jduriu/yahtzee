from pymongo import MongoClient
from time import time
from bson.objectid import ObjectId

client = MongoClient("localhost", 27017)
db = client.yahtzee_database
games = db.games
scorecards = db.scorecards

class ScorecardQueries:
  def create_scorecard(self, scorecard):
    pass
