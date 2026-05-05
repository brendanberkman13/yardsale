from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from db import get_session
from models import User
from schemas import UserRead

SessionDep = Annotated[Session, Depends(get_session)]

router = APIRouter(prefix="/users", tags=["users"])


@router.get(
    "/{user_id}",
    response_model=UserRead,
    response_model_by_alias=True,
)
def get_user(user_id: UUID, session: SessionDep):
    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
