import pandas as pd
import numpy as np
from typing import List, Dict, Any

class TechnicalAnalysisService:
    @staticmethod
    def calculate_indicators(prices: List[float], volumes: List[float]) -> Dict[str, Any]:
        if len(prices) < 30:
            return {"error": "Not enough data for technical analysis"}

        df = pd.DataFrame({"price": prices, "volume": volumes})
        
        # SMA & EMA
        df['sma_20'] = df['price'].rolling(window=20).mean()
        df['ema_12'] = df['price'].ewm(span=12, adjust=False).mean()
        df['ema_26'] = df['price'].ewm(span=26, adjust=False).mean()

        # RSI
        delta = df['price'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        df['rsi'] = 100 - (100 / (1 + rs))

        # MACD
        df['macd'] = df['ema_12'] - df['ema_26']
        df['signal_line'] = df['macd'].ewm(span=9, adjust=False).mean()

        # Trend Scoring & Signals
        last_price = df['price'].iloc[-1]
        last_rsi = df['rsi'].iloc[-1]
        last_macd = df['macd'].iloc[-1]
        last_signal = df['signal_line'].iloc[-1]
        
        signals = []
        score = 0 # -100 to 100

        # RSI Logic
        if last_rsi > 70:
            signals.append("Overbought (RSI)")
            score -= 20
        elif last_rsi < 30:
            signals.append("Oversold (RSI)")
            score += 20
        
        # MACD Logic
        if last_macd > last_signal:
            signals.append("MACD Bullish Crossover")
            score += 30
        else:
            signals.append("MACD Bearish Crossover")
            score -= 30

        # Price vs SMA
        if last_price > df['sma_20'].iloc[-1]:
            score += 10
        else:
            score -= 10

        trend = "Neutral"
        if score > 20: trend = "Bullish"
        if score > 50: trend = "Strong Bullish"
        if score < -20: trend = "Bearish"
        if score < -50: trend = "Strong Bearish"

        return {
            "rsi": round(float(last_rsi), 2),
            "macd": round(float(last_macd), 4),
            "signal_line": round(float(last_signal), 4),
            "sma_20": round(float(df['sma_20'].iloc[-1]), 2),
            "score": score,
            "trend": trend,
            "signals": signals,
            "volume_24h_avg": round(float(df['volume'].tail(24).mean()), 2) if len(df) >= 24 else 0
        }

ta_service = TechnicalAnalysisService()
