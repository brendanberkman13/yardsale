from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, desc, select

from auth import CurrentUser
from db import get_session
from models import Posting
from schemas import Category, PostingCreate, PostingRead

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(prefix="/postings", tags=["postings"])


@router.get("", response_model=list[PostingRead], response_model_by_alias=True)
def list_postings(
    session: SessionDep,
    category: Category | None = Query(None),
    posted_by: UUID | None = Query(None, alias="postedBy"),
):
    statement = select(Posting).order_by(desc(Posting.posted_at))
    if category is not None:
        statement = statement.where(Posting.category == category.value)
    if posted_by is not None:
        statement = statement.where(Posting.posted_by_user_id == posted_by)
    return session.exec(statement).all()


@router.get(
    "/{posting_id}",
    response_model=PostingRead,
    response_model_by_alias=True,
)
def get_posting(posting_id: UUID, session: SessionDep):
    posting = session.get(Posting, posting_id)
    if posting is None:
        raise HTTPException(status_code=404, detail="Posting not found")
    return posting


@router.post(
    "",
    response_model=PostingRead,
    response_model_by_alias=True,
    status_code=201,
)
def create_posting(
    payload: PostingCreate,
    user: CurrentUser,
    session: SessionDep,
):
    posting = Posting(
        posted_by_user_id=user.id,
        title=payload.title,
        description=payload.description,
        price_cents=payload.price_cents,
        category=payload.category.value,
        condition=payload.condition.value,
        brand=payload.brand,
        size=payload.size,
        location=payload.location,
    )
    session.add(posting)
    session.commit()
    session.refresh(posting)
    return posting
