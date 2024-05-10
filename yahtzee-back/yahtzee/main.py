from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from games_api.routers import games_router
from scorecards_api.routers import scorecards_router
from logs_api.routers import logs_router

from openapi_docs_lib.description import description
from openapi_docs_lib.tags import tags_metadata


app = FastAPI(
    title="Yahtzee",
    openapi_tags=tags_metadata,
    description=description
)

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

app.include_router(games_router, tags=["games-api"])
app.include_router(scorecards_router, tags=["scorecards-api"])
app.include_router(logs_router, tags=["logs-api"])
