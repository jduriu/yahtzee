from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from games_api.routers import games_router
from scorecards_api.routers import scorecards_router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(games_router)
app.include_router(scorecards_router)
