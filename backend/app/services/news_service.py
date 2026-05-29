import feedparser
import re
from typing import List, Dict, Any
from app.core.config import logger

class NewsService:
    # Popular crypto news RSS feeds
    FEEDS = [
        "https://cointelegraph.com/rss",
        "https://www.coindesk.com/arc/outboundfeeds/rss/",
        "https://cryptoslate.com/feed/"
    ]

    BULLISH_KEYWORDS = ["surge", "bullish", "growth", "adoption", "partnership", "soar", "breakout", "rally", "gain", "investment"]
    BEARISH_KEYWORDS = ["crash", "bearish", "drop", "hack", "scam", "regulatory", "ban", "lawsuit", "plunge", "concern"]

    async def fetch_news(self) -> List[Dict[str, Any]]:
        all_entries = []
        for url in self.FEEDS:
            try:
                feed = feedparser.parse(url)
                for entry in feed.entries[:10]:
                    sentiment = self._analyze_sentiment(entry.title + " " + entry.get("summary", ""))
                    category = self._guess_category(entry.title)
                    
                    all_entries.append({
                        "title": entry.title,
                        "link": entry.link,
                        "published": entry.get("published", ""),
                        "summary": self._clean_html(entry.get("summary", "")[:200] + "..."),
                        "source": url.split("/")[2],
                        "sentiment": sentiment,
                        "category": category
                    })
            except Exception as e:
                logger.error(f"Error fetching RSS from {url}: {str(e)}")
        
        # Sort by published date (if possible) or just return
        return all_entries

    def _analyze_sentiment(self, text: str) -> str:
        text = text.lower()
        bull_score = sum(1 for word in self.BULLISH_KEYWORDS if word in text)
        bear_score = sum(1 for word in self.BEARISH_KEYWORDS if word in text)
        
        if bull_score > bear_score:
            return "bullish"
        elif bear_score > bull_score:
            return "bearish"
        return "neutral"

    def _guess_category(self, title: str) -> str:
        title = title.lower()
        if any(w in title for w in ["bitcoin", "btc"]): return "Bitcoin"
        if any(w in title for w in ["ethereum", "eth"]): return "Ethereum"
        if any(w in title for w in ["nft", "opensea"]): return "NFTs"
        if any(w in title for w in ["defi", "dex", "yield"]): return "DeFi"
        if any(w in title for w in ["regulation", "sec", "law"]): return "Regulation"
        return "Market"

    def _clean_html(self, raw_html: str) -> str:
        cleanr = re.compile('<.*?>')
        cleantext = re.sub(cleanr, '', raw_html)
        return cleantext

news_service = NewsService()
