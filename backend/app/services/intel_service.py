import numpy as np
from typing import List, Dict, Any
from app.services.ta_service import ta_service
from app.services.news_service import news_service

class MarketIntelligenceService:
    @staticmethod
    def generate_comprehensive_score(
        prices: List[float], 
        volumes: List[float], 
        sentiment_summary: str
    ) -> Dict[str, Any]:
        
        # 1. Get Technicals
        ta = ta_service.calculate_indicators(prices, volumes)
        if "error" in ta:
            return ta

        # 2. Extract Base Metrics
        rsi = ta["rsi"]
        score_base = ta["score"]
        
        # 3. Calculate Risk Score (0-100)
        # Risk increases with high RSI or extreme price volatility
        prices_arr = np.array(prices)
        volatility = np.std(prices_arr) / (np.mean(prices_arr) + 1e-10) * 100
        risk_score = min(100, int((volatility * 5) + (abs(rsi - 50) * 1.5)))
        
        # 4. Calculate Momentum Score (0-100)
        # Momentum is high if RSI is rising and MACD is positive
        momentum_score = min(100, max(0, int(50 + (score_base / 2))))

        # 5. Calculate Confidence Score (0-100)
        # Confidence is higher when technicals and sentiment align
        sentiment_map = {"bullish": 1, "bearish": -1, "neutral": 0}
        sentiment_val = sentiment_map.get(sentiment_summary, 0)
        
        # If technical score and sentiment have the same sign, confidence is high
        alignment = 1 if (score_base > 0 and sentiment_val > 0) or (score_base < 0 and sentiment_val < 0) else 0.5
        confidence_score = int(min(100, (abs(score_base) + 20) * alignment))

        # 6. Generate Human-Readable Explanations
        explanations = []
        if ta["trend"] == "Strong Bullish":
            explanations.append("The asset is in a powerful uptrend with high buying pressure.")
        elif ta["trend"] == "Strong Bearish":
            explanations.append("Heavy selling pressure detected; the downward trend is accelerating.")
        
        if risk_score > 70:
            explanations.append("Caution: High volatility detected. Price movements are currently unstable.")
        elif risk_score < 30:
            explanations.append("Low risk environment: Price action is stable and consolidating.")

        if sentiment_summary == "bullish" and "Bullish" in ta["trend"]:
            explanations.append("Technicals and social sentiment are perfectly aligned for growth.")

        return {
            "overall_score": score_base,
            "trend": ta["trend"],
            "metrics": {
                "risk": risk_score,
                "momentum": momentum_score,
                "confidence": confidence_score
            },
            "indicators": {
                "rsi": rsi,
                "macd": ta["macd"]
            },
            "summary": " ".join(explanations) if explanations else "The market is currently in a state of consolidation with balanced forces."
        }

intel_service = MarketIntelligenceService()
