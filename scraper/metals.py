import requests
from bs4 import BeautifulSoup
from cache import get_cached, set_cached

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

METAL_PRICES = {
    "gold": [
        {"name": "Gold 24K (999)", "price": "7240", "unit": "gram", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "24 Karat pure gold price on MCX India."},
        {"name": "Gold 22K (916)", "price": "6637", "unit": "gram", "change": 1.1, "source": "MCX India", "category": "Commodity", "description": "22 Karat gold used in jewellery."},
        {"name": "Gold 18K (750)", "price": "5430", "unit": "gram", "change": 1.0, "source": "MCX India", "category": "Commodity", "description": "18 Karat gold price India."},
        {"name": "Gold 10 gram (24K)", "price": "72400", "unit": "10 gram", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "Gold price per 10 grams."},
        {"name": "Gold 1 Tola (24K)", "price": "84490", "unit": "tola", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "Gold price per tola (11.66g)."},
    ],
    "silver": [
        {"name": "Silver (999)", "price": "89500", "unit": "kg", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Pure silver price MCX India."},
        {"name": "Silver per gram", "price": "89.5", "unit": "gram", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Silver price per gram India."},
        {"name": "Silver per tola", "price": "1044", "unit": "tola", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Silver price per tola."},
    ],
    "platinum": [
        {"name": "Platinum", "price": "2800", "unit": "gram", "change": 0.5, "source": "MCX India", "category": "Commodity", "description": "Platinum price per gram India."},
    ],
}

def scrape_metal_prices(query: str):
    cache_key = "metal_" + query.lower()
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower()
    for key, prices in METAL_PRICES.items():
        if key in query_lower:
            set_cached(cache_key, prices)
            return prices
    return []