from pydantic import ConfigDict, BaseModel, Field
from pydantic.functional_validators import BeforeValidator
from typing import List, Optional
from typing_extensions import Annotated
from bson import ObjectId


PyObjectId = Annotated[str, BeforeValidator(str)]


class Game(BaseModel):
    """
    Document schema for a game instance in the database
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    start_time: float = Field(...)
    player_ids: List[str] = Field(...)
    scorecard_ids: List[str] = Field(...)
    turns_taken: int = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )


class Games(BaseModel):
    """
    Container to hold a list of Game instances
    """
    games: List[Game]


class UpdateGame(BaseModel):
    """
    Optional fields which can be updated on a game instance
    """
    player_ids: Optional[List[str]] = None
    scorecard_ids: Optional[List[str]] = None
    turns_taken: Optional[int] = None
    model_config = ConfigDict(
        json_encoders={ObjectId: str}
    )
