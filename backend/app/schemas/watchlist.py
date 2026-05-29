from pydantic import BaseModel
from datetime import datetime

class WatchlistItemBase(BaseModel):
    coin_id: str

class WatchlistItemCreate(WatchlistItemBase):
    pass

class WatchlistItem(WatchlistItemBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
