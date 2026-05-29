import httpx
from typing import Dict, Any, List
from app.core.config import logger

class SentimentService:
    BASE_URL = "https://api.alternative.me/fng/"

    async def get_fear_and_greed_index(self, limit: int = 7) -> Dict[str, Any]:
        """Fetch current and historical Fear and Greed Index data."""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.BASE_URL, params={"limit": limit})
                response.raise_for_status()
                data = response.json()
                
                raw_data = data.get("data", [])
                if not raw_data:
                    return {"error": "No data available"}

                # Current value
                current = raw_data[0]
                
                # Historical values for trend
                history = [
                    {
                        "value": int(item["value"]),
                        "status": item["value_classification"],
                        "timestamp": int(item["timestamp"])
                    }
                    for item in raw_data
                ]

                return {
                    "current": {
                        "value": int(current["value"]),
                        "status": current["value_classification"],
                        "timestamp": int(current["timestamp"])
                    },
                    "history": history
                }
        except Exception as e:
            logger.error(f"Error fetching Fear and Greed Index: {str(e)}")
            return {"error": "Failed to fetch sentiment data"}

sentiment_service = SentimentService()
