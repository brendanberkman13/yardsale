from typing import Annotated

from fastapi import Depends, Header, HTTPException, status
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token
from sqlmodel import Session, select

from config import settings
from db import get_session
from models import User

_google_request = google_requests.Request()

SessionDep = Annotated[Session, Depends(get_session)]


def _verify_google_id_token(token: str) -> dict:
    try:
        return id_token.verify_oauth2_token(
            token,
            _google_request,
            settings.google_client_id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Google ID token: {e}",
        )


def get_current_user(
    session: SessionDep,
    authorization: Annotated[str | None, Header()] = None,
) -> User:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header",
        )
    token = authorization.split(" ", 1)[1]
    claims = _verify_google_id_token(token)

    google_sub = claims["sub"]
    user = session.exec(select(User).where(User.google_sub == google_sub)).first()
    if user is None:
        user = User(
            google_sub=google_sub,
            email=claims.get("email", ""),
            name=claims.get("name", ""),
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]
