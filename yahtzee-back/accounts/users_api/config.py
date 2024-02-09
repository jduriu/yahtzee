from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    access_secret_key: str
    refresh_secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_minutes: int
    issuer_id: str

    model_config = SettingsConfigDict(env_file=".env")
