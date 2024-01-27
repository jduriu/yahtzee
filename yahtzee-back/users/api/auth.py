from passlib.context import CryptContext
from jose import jwt, JWTError
# from auth.schema import User, UserInDB, TokenData, Token
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from typing import Annotated
from api.config import Settings


settings = Settings()
jwt_secret = settings.secret_key
jwt_algorithm = settings.algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class AuthenticationUtilities:
    def verify_password(
        self,
        plain_password,
        hashed_password
    ):
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(
        self,
        password
    ):
        return pwd_context.hash(password)

    def create_access_token(
        self,
        data: dict,
    ):
        to_encode = data.copy()
        expires_delta = settings.access_token_expire_minutes
        expire = datetime.now(timezone.utc) + expires_delta
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode,
            jwt_secret,
            algorithm=jwt_algorithm
        )
        return encoded_jwt


class Authenticator:
    def __call__(self, token=Annotated[str, Depends(oauth2_scheme)]):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(
                token,
                jwt_secret,
                algorithms=[jwt_algorithm]
            )
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        return True
