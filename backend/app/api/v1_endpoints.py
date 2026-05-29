from fastapi import APIRouter, Query, Path, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.services.crypto_service import crypto_service
from app.services.news_service import news_service
from app.services.ta_service import ta_service
from app.core.database import get_db
from app.crud import watchlist as crud_watchlist
from app.schemas.watchlist import WatchlistItem, WatchlistItemCreate

router = APIRouter()

DUMMY_USER_ID = 1

from app.services.sentiment_service import sentiment_service

@router.get("/market/sentiment")
async def get_market_sentiment():
    """Get the Fear and Greed Index for market sentiment."""
    return await sentiment_service.get_fear_and_greed_index()

@router.get("/coins/top")
async def get_top_coins(limit: int = 10, currency: str = "usd"):
    return await crypto_service.get_top_coins(limit, currency)

@router.get("/news")
async def get_latest_news():
    return await news_service.fetch_news()

from app.services.intel_service import intel_service

@router.get("/coins/{coin_id}/intelligence")
async def get_market_intelligence(
    coin_id: str = Path(..., description="The ID of the coin")
):
    """Get AI-driven market intelligence and comprehensive scoring."""
    history = await crypto_service.get_price_history(coin_id, days=30)
    prices = [p["price"] for p in history["prices"]]
    volumes = [v["volume"] for v in history["volumes"]]
    
    # Simple sentiment extraction from latest news (could be more complex)
    news = await news_service.fetch_news()
    relevant_news = [n for n in news if coin_id.lower() in n["title"].lower() or n["category"].lower() == coin_id.lower()]
    
    bullish_count = sum(1 for n in relevant_news if n["sentiment"] == "bullish")
    bearish_count = sum(1 for n in relevant_news if n["sentiment"] == "bearish")
    
    summary_sentiment = "neutral"
    if bullish_count > bearish_count: summary_sentiment = "bullish"
    elif bearish_count > bullish_count: summary_sentiment = "bearish"
    
    return intel_service.generate_comprehensive_score(prices, volumes, summary_sentiment)

@router.get("/watchlist", response_model=List[WatchlistItem])
def get_user_watchlist(db: Session = Depends(get_db)):
    return crud_watchlist.get_watchlist(db, user_id=DUMMY_USER_ID)

@router.post("/watchlist", response_model=WatchlistItem)
def add_to_user_watchlist(item: WatchlistItemCreate, db: Session = Depends(get_db)):
    try:
        return crud_watchlist.add_to_watchlist(db, item, user_id=DUMMY_USER_ID)
    except Exception:
        raise HTTPException(status_code=400, detail="Error adding to watchlist")

@router.delete("/watchlist/{coin_id}")
def remove_from_user_watchlist(coin_id: str, db: Session = Depends(get_db)):
    crud_watchlist.remove_from_watchlist(db, user_id=DUMMY_USER_ID, coin_id=coin_id)
    return {"message": "Removed"}

@router.get("/coins/{coin_id}")
async def get_coin_details(coin_id: str):
    return await crypto_service.get_coin_market_data(coin_id)

@router.get("/coins/{coin_id}/history")
async def get_coin_history(coin_id: str, days: int = 7):
    return await crypto_service.get_price_history(coin_id, days)
