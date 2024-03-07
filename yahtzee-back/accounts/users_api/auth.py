from passlib.context import CryptContext
from jose import jwt, JWTError
from users_api.schema import TokenData
from fastapi import HTTPException, Depends, status, Request
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from typing import Annotated
from users_api.config import Settings
import hashlib
import os
import binascii


settings = Settings()
jwt_access_secret = settings.access_secret_key
jwt_refresh_secret = settings.refresh_secret_key
jwt_algorithm = settings.algorithm
issuer_id = settings.issuer_id
access_expire = settings.access_token_expire_minutes
refresh_expire = settings.refresh_token_expire_minutes
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

    def generate_fingerprint(self):
        # generate a random string of 50 bytes
        random_fgp = os.urandom(50)
        # convert bytestring -> hexadecimal -> utf-8 string
        fingerprint = binascii.hexlify(random_fgp).decode('utf-8')
        # Create a hardened cookie
        fingerprint_cookie = f"__Secure-Fgp={fingerprint}; SameSite=Strict; HttpOnly; Secure"
        # Compute a SHA256 hash of the fingerprint to store in the token
        fingerprint_cookie_hash = hashlib.sha256(fingerprint_cookie.encode('utf-8')).hexdigest()
        return (fingerprint_cookie, fingerprint_cookie_hash)

    def create_access_token(self, data: dict):
        token_data = data.copy()  # dictionary containing "sub": username
        fingerprint_cookie, fingerprint_hash = self.generate_fingerprint()
        now = datetime.now(timezone.utc)
        expires_delta = timedelta(access_expire)
        expire = now + expires_delta

        token_data.update({
            "exp": expire,  # expiration time
            'iat': now,  # issued at
            'iss': issuer_id,
            'nbf': now,  # not before time
            "userFingerprint": fingerprint_hash  # unique user fingerprint
        })
        header_claims = {"typ": "JWT"}
        # Encode the JWT data
        encoded_access_jwt = jwt.encode(
            token_data,
            jwt_access_secret,
            algorithm=jwt_algorithm,
            headers=header_claims
        )
        return (encoded_access_jwt, fingerprint_cookie)

    def create_refresh_token(self, data: dict) -> str:
        token_data = data.copy()  # dictionary containing "sub": username
        now = datetime.utcnow()
        expire = now + timedelta(refresh_expire)
        token_data.update({
            "exp": expire,  # expiration time
            'iat': now,  # issued at
            'iss': issuer_id,
            'nbf': now,  # not before time
        })
        encoded_refresh_jwt = jwt.encode(
            token_data,
            jwt_refresh_secret,
            algorithm=jwt_algorithm
        )
        return encoded_refresh_jwt


class Authenticator:
    def __call__(self, req: Request):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

        ### NEED TO FIGURE OUT WHY FINGERPRINT COOKIE IS NOT BEING SENT IN REQUEST FROM FRONT END
        # user_fingerprint = None
        # if req.cookies:
        #     fingerprint_cookie = req.cookies.get('__Secure-Fgp')
        #     if fingerprint_cookie:
        #         user_fingerprint = fingerprint_cookie

        # fingerprint_digest = hashlib.sha256(user_fingerprint.encode('utf-8')).hexdigest()  # noqa

        token = req.headers.get("Authorization").split(" ")[1]

        try:
            decoded_token = jwt.decode(
                token,
                jwt_access_secret,
                algorithms=[jwt_algorithm]
            )
            username: str = decoded_token.get("sub")
            if username is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        return TokenData(username=username)
