from pydantic import BaseModel, Field
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from typing import Optional


PyObjectId = Annotated[str, BeforeValidator(str)]


class Token(BaseModel):
    message: str
    access_token: str
    refresh_token: str
    token_type: str


class TokenData(BaseModel):
    username: str


class RefreshTokenData(TokenData):
    refresh_token: str


class UserSignup(BaseModel):
    username: str
    email: Optional[str] = None
    password: str
    disabled: Optional[bool] = Field(default=False)


class UserLogin(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: str
    username: str
    email: str
    disabled: bool


class UserInDB(User):
    hashed_password: str
