from sqlalchemy.orm import Session
from app.models.models import Watchlist
from app.schemas.watchlist import WatchlistItemCreate

def get_watchlist(db: Session, user_id: int):
    return db.query(Watchlist).filter(Watchlist.user_id == user_id).all()

def add_to_watchlist(db: Session, item: WatchlistItemCreate, user_id: int):
    db_item = Watchlist(user_id=user_id, coin_id=item.coin_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def remove_from_watchlist(db: Session, user_id: int, coin_id: str):
    db_item = db.query(Watchlist).filter(
        Watchlist.user_id == user_id, 
        Watchlist.coin_id == coin_id
    ).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return True
    return False
