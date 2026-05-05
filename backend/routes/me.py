from typing import Annotated

from fastapi import APIRouter, Depends
from sqlmodel import Session, desc, select

from auth import CurrentUser
from db import get_session
from models import Posting
from schemas import PostingRead, UserRead

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(tags=["me"])


@router.get("/me", response_model=UserRead, response_model_by_alias=True)
def get_me(user: CurrentUser):
    return user


@router.get(
    "/me/postings",
    response_model=list[PostingRead],
    response_model_by_alias=True,
)
def list_my_postings(user: CurrentUser, session: SessionDep):
    return session.exec(
        select(Posting)
        .where(Posting.posted_by_user_id == user.id)
        .order_by(desc(Posting.posted_at))
    ).all()
