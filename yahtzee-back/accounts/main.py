from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from users_api.routers import users_router

from openapi_docs_lib.description import description
from openapi_docs_lib.tags import tags_metadata

app = FastAPI(
    title="Accounts",
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

app.include_router(users_router, tags=["users-api"])
