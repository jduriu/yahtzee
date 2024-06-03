from pydantic import BaseModel, ConfigDict, Field
from pydantic.functional_validators import BeforeValidator
from typing import List, Optional
from typing_extensions import Annotated
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


class Scorecard(BaseModel):
    """
    Document schema for a scorecard instance in the database.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: str = Field(...)
    player_order_id: Optional[int] = Field(default=1)
    game_id: str = Field(...)
    ones: Optional[int] = Field(default=None)
    twos: Optional[int] = Field(default=None)
    threes: Optional[int] = Field(default=None)
    fours: Optional[int] = Field(default=None)
    fives: Optional[int] = Field(default=None)
    sixes: Optional[int] = Field(default=None)
    bonus: Optional[int] = Field(default=None)
    three_of_kind: Optional[int] = Field(default=None)
    four_of_kind: Optional[int] = Field(default=None)
    full_house: Optional[int] = Field(default=None)
    sm_straight: Optional[int] = Field(default=None)
    lg_straight: Optional[int] = Field(default=None)
    yahtzee: Optional[int] = Field(default=None)
    chance: Optional[int] = Field(default=None)
    yahtzee_bonus: Optional[int] = Field(default=None)
    scored: Optional[List[str]] = Field(default=[])
    completed: bool = Field(default=False)
    completed_date: Optional[float] = Field(default=None)
    final_score: Optional[int] = Field(default=None)


class Scorecards(BaseModel):
    """
    Container to hold a list of Scorecard instances.
    """
    scorecards: List[Scorecard]


class UpdateScorecard(BaseModel):
    """
    Optional fields which can be updated on a scorecard instance.
    """
    ones: Optional[int] = None
    twos: Optional[int] = None
    threes: Optional[int] = None
    fours: Optional[int] = None
    fives: Optional[int] = None
    sixes: Optional[int] = None
    bonus: Optional[int] = None
    three_of_kind: Optional[int] = None
    four_of_kind: Optional[int] = None
    full_house: Optional[int] = None
    sm_straight: Optional[int] = None
    lg_straight: Optional[int] = None
    yahtzee: Optional[int] = None
    chance: Optional[int] = None
    yahtzee_bonus: Optional[int] = None
    scored: Optional[List[str]] = None
    completed: Optional[bool] = None
    completed_date: Optional[float] = None
    final_score: Optional[int] = Field(default=None)
    model_config = ConfigDict(
        json_encoders={ObjectId: str}
    )
