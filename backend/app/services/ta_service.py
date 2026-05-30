import numpy as np
from typing import List, Dict, Any

class TechnicalAnalysisService:
    @staticmethod
    def calculate_indicators(prices: List[float], volumes: List[float]) -> Dict[str, Any]:
        if len(prices) < 30:
            return {"error": "Not enough data"}

        prices_arr = np.array(prices)
        
        # SMA 20 (Numpy)
        sma_20 = np.mean(prices_arr[-20:])

        # RSI (Numpy logic)
        deltas = np.diff(prices_arr)
        seed = deltas[:14]
        up = seed[seed >= 0].sum() / 14
        down = -seed[seed < 0].sum() / 14
        rs = up / (down + 1e-10)
        rsi = 100 - (100 / (1 + rs))

        # MACD (Simple EMA implementation with Numpy)
        def ema(data, window):
            weights = np.exp(np.linspace(-1., 0., window))
            weights /= weights.sum()
            return np.convolve(data, weights, mode='full')[:len(data)]

        ema_12 = ema(prices_arr, 12)[-1]
        ema_26 = ema(prices_arr, 26)[-1]
        macd = ema_12 - ema_26
        
        # Trend signals
        score = 0
        signals = []
        if rsi > 70: signals.append("Overbought"); score -= 20
        elif rsi < 30: signals.append("Oversold"); score += 20
        
        if prices_arr[-1] > sma_20: score += 10
        else: score -= 10

        trend = "Neutral"
        if score > 0: trend = "Bullish"
        if score < 0: trend = "Bearish"

        return {
            "rsi": round(float(rsi), 2),
            "macd": round(float(macd), 4),
            "sma_20": round(float(sma_20), 2),
            "score": score,
            "trend": trend,
            "signals": signals
        }

ta_service = TechnicalAnalysisService()
