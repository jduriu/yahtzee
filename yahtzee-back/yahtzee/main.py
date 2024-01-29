from fastapi import FastAPI

from games_api.routers import games_router
from scorecards_api.routers import scorecards_router

app = FastAPI()
app.include_router(games_router)
app.include_router(scorecards_router)
