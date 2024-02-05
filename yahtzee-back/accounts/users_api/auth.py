from passlib.context import CryptContext
from jose import jwt, JWTError
from users_api.schema import TokenData
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from typing import Annotated
from users_api.config import Settings


settings = Settings()
jwt_secret = settings.secret_key
jwt_algorithm = settings.algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/authenticate",
    scheme_name="JWT"
)


class AuthenticationUtilities:
    def verify_password(self, plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password):
        return pwd_context.hash(password)

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expires_delta = timedelta(settings.access_token_expire_minutes)
        expire = datetime.now(timezone.utc) + expires_delta
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode,
            jwt_secret,
            algorithm=jwt_algorithm
        )
        return encoded_jwt

    # def create_refresh_token(self, expires_delta: int = None) -> str:
    #     if expires_delta is not None:
    #         expires_delta = datetime.utcnow() + expires_delta
    #     else:
    #         expires_delta = datetime.utcnow() + timedelta(minutes=refresh_token_expiration_min)

    #     to_encode = {"exp": expires_delta, "sub": str(subject), "role": role }
    #     encoded_jwt = jwt.encode(to_encode, jwt_refresh_secret_key, signing_algo)
    #     return encoded_jwt


class Authenticator:
    def __call__(self, token: Annotated[str, Depends(oauth2_scheme)]):
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
        return TokenData(username=username)
