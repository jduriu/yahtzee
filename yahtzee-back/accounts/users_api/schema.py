from pydantic import ConfigDict, BaseModel, Field
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from typing import Optional


PyObjectId = Annotated[str, BeforeValidator(str)]


class Token(BaseModel):
    message: str
    access_token: str
    token_type: str


class UserForm(BaseModel):
    username: str
    password: str


class UserSignup(BaseModel):
    username: str
    email: str | None = None
    password: str
    full_name: str | None = None
    disabled: Optional[bool] = Field(default=False)


class TokenData(BaseModel):
    username: str


class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str
    email: str
    full_name: str
    disabled: bool


class UserInDB(User):
    hashed_password: str
