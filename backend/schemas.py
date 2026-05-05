from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class Category(StrEnum):
    skis = "skis"
    snowboards = "snowboards"
    boots = "boots"
    outerwear = "outerwear"
    accessories = "accessories"


class Condition(StrEnum):
    new = "new"
    like_new = "like-new"
    good = "good"
    fair = "fair"


class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


class PostingCreate(CamelModel):
    title: str
    description: str = ""
    price_cents: int
    category: Category
    condition: Condition
    brand: str | None = None
    size: str | None = None
    location: str | None = None


class PostingRead(CamelModel):
    id: UUID
    posted_by_user_id: UUID
    posted_at: datetime
    title: str
    description: str
    price_cents: int
    images: list[str] = []
    category: str
    condition: str
    brand: str | None = None
    size: str | None = None
    location: str | None = None
    status: str


class UserRead(CamelModel):
    id: UUID
    name: str
    email: str
    image_id: UUID | None = None
    joined_at: datetime
    location: str | None = None
