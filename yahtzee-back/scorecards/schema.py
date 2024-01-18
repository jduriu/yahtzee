from pydantic import BaseModel, ConfigDict, Field
from pydantic.functional_validators import BeforeValidator
from typing import List, Optional
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]


class Scorecard(BaseModel):
    """
    Document schema for a scorecard instance in the database
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: str = Field(...)
    player_order_id: int = Field(...)
    ones: int = Field(default=None)
    twos: int = Field(default=None)
    threes: int = Field(default=None)
    fours: int = Field(default=None)
    fives: int = Field(default=None)
    sixes: int = Field(default=None)
    bonus: int = Field(default=None)
    three_of_kind: int = Field(default=None)
    four_of_kind: int = Field(default=None)
    full_house: int = Field(default=None)
    sm_straight: int = Field(default=None)
    lg_straight: int = Field(default=None)
    yahtzee: int = Field(default=None)
    chance: int = Field(default=None)
    yahtzee_bonus: int = Field(default=None)


class Scorecards(BaseModel):
    """
    Container to hold a list of Scorecard instances
    """
    scorecards: List[Scorecard]
