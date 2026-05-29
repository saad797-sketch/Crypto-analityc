import httpx
import logging
from typing import List, Dict, Any, Optional
from fastapi import HTTPException, status
from app.core.config import logger

class CoinGeckoService:
    BASE_URL = "https://api.coingecko.com/api/v3"
    
    def __init__(self):
        self.client = httpx.AsyncClient(
            base_url=self.BASE_URL,
            timeout=10.0,
            headers={"Accept": "application/json"}
        )

    async def _handle_request(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> Any:
        try:
            response = await self.client.get(endpoint, params=params)
            
            if response.status_code == 429:
                logger.warning("CoinGecko API Rate Limit reached.")
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Rate limit exceeded. Please try again later."
                )
            
            response.raise_for_status()
            return response.json()
            
        except httpx.HTTPStatusError as e:
            logger.error(f"CoinGecko API Error: {e.response.status_code} - {e.response.text}")
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"CoinGecko API Error: {e.response.reason_phrase}"
            )
        except Exception as e:
            logger.error(f"Unexpected error calling CoinGecko: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An internal error occurred while fetching crypto data."
            )

    async def get_top_coins(self, limit: int = 10, currency: str = "usd") -> List[Dict[str, Any]]:
        """Fetch top coins by market cap and normalize data."""
        endpoint = "/coins/markets"
        params = {
            "vs_currency": currency,
            "order": "market_cap_desc",
            "per_page": limit,
            "page": 1,
            "sparkline": False,
            "price_change_percentage": "24h"
        }
        
        data = await self._handle_request(endpoint, params)
        
        # Normalization
        return [
            {
                "id": coin["id"],
                "symbol": coin["symbol"].upper(),
                "name": coin["name"],
                "image": coin["image"],
                "current_price": coin["current_price"],
                "market_cap": coin["market_cap"],
                "rank": coin["market_cap_rank"],
                "price_change_24h": coin.get("price_change_percentage_24h"),
            }
            for coin in data
        ]

    async def get_trending_coins(self) -> List[Dict[str, Any]]:
        """Fetch trending coins from CoinGecko."""
        endpoint = "/search/trending"
        data = await self._handle_request(endpoint)
        
        return [
            {
                "id": coin["item"]["id"],
                "name": coin["item"]["name"],
                "symbol": coin["item"]["symbol"],
                "rank": coin["item"]["market_cap_rank"],
                "thumb": coin["item"]["thumb"],
                "price_btc": coin["item"]["price_btc"],
            }
            for coin in data.get("coins", [])
        ]

    async def get_coin_market_data(self, coin_id: str) -> Dict[str, Any]:
        """Fetch detailed market data for a specific coin."""
        endpoint = f"/coins/{coin_id}"
        params = {
            "localization": False,
            "tickers": False,
            "market_data": True,
            "community_data": False,
            "developer_data": False,
            "sparkline": True
        }
        
        data = await self._handle_request(endpoint, params)
        market_data = data.get("market_data", {})
        
        return {
            "id": data["id"],
            "symbol": data["symbol"].upper(),
            "name": data["name"],
            "description": data.get("description", {}).get("en", ""),
            "current_price": market_data.get("current_price", {}).get("usd"),
            "market_cap": market_data.get("market_cap", {}).get("usd"),
            "high_24h": market_data.get("high_24h", {}).get("usd"),
            "low_24h": market_data.get("low_24h", {}).get("usd"),
            "price_change_24h": market_data.get("price_change_percentage_24h"),
            "sparkline": market_data.get("sparkline_7d", {}).get("price", [])
        }

    async def get_price_history(self, coin_id: str, days: int = 7) -> Dict[str, List[Dict[str, Any]]]:
        """Fetch historical price and volume data."""
        endpoint = f"/coins/{coin_id}/market_chart"
        params = {
            "vs_currency": "usd",
            "days": days,
            "interval": "daily" if days > 1 else "hourly"
        }
        
        data = await self._handle_request(endpoint, params)
        
        return {
            "prices": [{"timestamp": p[0], "price": p[1]} for p in data.get("prices", [])],
            "volumes": [{"timestamp": v[0], "volume": v[1]} for v in data.get("total_volumes", [])]
        }

# Global instance
crypto_service = CoinGeckoService()
