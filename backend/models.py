from datetime import UTC, datetime
from uuid import UUID, uuid4

from sqlalchemy import Column, DateTime
from sqlmodel import Field, Relationship, SQLModel


def now_utc() -> datetime:
    return datetime.now(UTC)


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    google_sub: str = Field(unique=True, index=True)
    email: str
    name: str
    # Foreign key to a future `images` table. Null until the user uploads one.
    image_id: UUID | None = None
    location: str | None = None
    joined_at: datetime = Field(
        default_factory=now_utc,
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )

    postings: list["Posting"] = Relationship(back_populates="posted_by")


class Posting(SQLModel, table=True):
    __tablename__ = "postings"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    posted_by_user_id: UUID = Field(foreign_key="users.id", index=True)
    title: str
    description: str = ""
    price_cents: int
    category: str = Field(index=True)
    condition: str
    brand: str | None = None
    size: str | None = None
    location: str | None = None
    status: str = Field(default="active")
    posted_at: datetime = Field(
        default_factory=now_utc,
        sa_column=Column(DateTime(timezone=True), nullable=False),
    )

    posted_by: User = Relationship(back_populates="postings")
