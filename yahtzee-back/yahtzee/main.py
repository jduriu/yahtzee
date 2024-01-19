from fastapi import FastAPI

from games.routers import games_router
from scorecards.routers import scorecards_router

app = FastAPI()
app.include_router(games_router)
app.include_router(scorecards_router)
