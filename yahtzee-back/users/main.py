from fastapi import FastAPI
from api.routers import users_router


app = FastAPI()
app.include_router(users_router)
