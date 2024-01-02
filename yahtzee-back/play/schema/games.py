from pydantic import BaseModel
from typing import List


class GameIn:
  player_ids: List[str]
  scorecard_ids: List[str]
  turns_taken: int

class GameOut:
  game_id: str
  player_ids: List[str]
  scorecard_ids: List[str]
  turns_taken: int

class ScorecardIn:
  user_id: str
  player_order_id: int
  ones: int
  twos: int
  threes: int
  fours: int
  fives: int
  sixes: int
  bonus: int
  threeOfKind: int
  fourOfKind: int
  fullHouse: int
  smStraight: int
  lgStraight: int
  yahtzee: int
  chance: int
  yahtzeeBonus: int
  ones_taken: bool
  twos_taken: bool
  threes_taken: bool
  fours_taken: bool
  fives_taken: bool
  sixes_taken: bool
  threeOfKind_taken: bool
  fourOfKind_taken: bool
  fullHouse_taken: bool
  smStraight_taken: bool
  lgStraight_taken: bool
  yahtzee_taken: bool
  chance_taken: bool
