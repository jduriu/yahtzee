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
    game_id: str = Field(...)
    player_order_id: Optional[int] = Field(default=1)
    ones: Optional[int] = Field(default=0)
    twos: Optional[int] = Field(default=0)
    threes: Optional[int] = Field(default=0)
    fours: Optional[int] = Field(default=0)
    fives: Optional[int] = Field(default=0)
    sixes: Optional[int] = Field(default=0)
    bonus: Optional[int] = Field(default=0)
    three_of_kind: Optional[int] = Field(default=0)
    four_of_kind: Optional[int] = Field(default=0)
    full_house: Optional[int] = Field(default=0)
    sm_straight: Optional[int] = Field(default=0)
    lg_straight: Optional[int] = Field(default=0)
    yahtzee: Optional[int] = Field(default=0)
    chance: Optional[int] = Field(default=0)
    yahtzee_bonus: Optional[int] = Field(default=0)
    scored: Optional[List[str]] = Field(default=[])


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
    model_config = ConfigDict(
        json_encoders={ObjectId: str}
    )
