from cache import get_cached, set_cached

METAL_PRICES = {
    "gold": [
        {"name": "Gold 24K (999 Pure)", "price": "7240", "unit": "gram", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "24 Karat pure gold MCX India today."},
        {"name": "Gold 22K (916 Hallmark)", "price": "6637", "unit": "gram", "change": 1.1, "source": "MCX India", "category": "Commodity", "description": "22 Karat hallmark gold for jewellery."},
        {"name": "Gold 18K (750)", "price": "5430", "unit": "gram", "change": 1.0, "source": "MCX India", "category": "Commodity", "description": "18 Karat gold price India."},
        {"name": "Gold 10 gram (24K)", "price": "72400", "unit": "10 gram", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "Gold price per 10 grams."},
        {"name": "Gold 1 Tola (11.66g)", "price": "84490", "unit": "tola", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "Gold price per tola."},
        {"name": "Gold 1 Ounce (31.1g)", "price": "225272", "unit": "ounce", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "Gold price per ounce India."},
    ],
    "sona": [
        {"name": "Sona 24K (999 Shudh)", "price": "7240", "unit": "gram", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "24 Karat shudh sona aaj ka bhav."},
        {"name": "Sona 22K (916)", "price": "6637", "unit": "gram", "change": 1.1, "source": "MCX India", "category": "Commodity", "description": "22 Karat sona zeverat ke liye."},
        {"name": "Sona 10 gram", "price": "72400", "unit": "10 gram", "change": 1.2, "source": "MCX India", "category": "Commodity", "description": "10 gram sona ka bhav."},
    ],
    "silver": [
        {"name": "Silver (999 Pure)", "price": "89500", "unit": "kg", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Pure silver price MCX India."},
        {"name": "Silver per gram", "price": "89.5", "unit": "gram", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Silver price per gram India."},
        {"name": "Silver per tola", "price": "1044", "unit": "tola", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Silver price per tola."},
        {"name": "Silver 100 gram", "price": "8950", "unit": "100 gram", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Silver price per 100 grams."},
    ],
    "chandi": [
        {"name": "Chandi (999 Shudh)", "price": "89500", "unit": "kg", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Shudh chandi ka aaj ka bhav."},
        {"name": "Chandi per gram", "price": "89.5", "unit": "gram", "change": 2.1, "source": "MCX India", "category": "Commodity", "description": "Chandi per gram."},
    ],
    "platinum": [
        {"name": "Platinum (950)", "price": "2800", "unit": "gram", "change": 0.5, "source": "MCX India", "category": "Commodity", "description": "Platinum price per gram India."},
    ],
    "diamond": [
        {"name": "Diamond 0.5 Carat (SI1)", "price": "175000", "unit": "carat", "change": 0.3, "source": "GIA", "category": "Commodity", "description": "0.5 carat SI1 diamond average price."},
        {"name": "Diamond 1 Carat (SI1)", "price": "350000", "unit": "carat", "change": 0.5, "source": "GIA", "category": "Commodity", "description": "1 carat SI1 diamond price India."},
        {"name": "Diamond 1 Carat (VS1)", "price": "500000", "unit": "carat", "change": 0.4, "source": "GIA", "category": "Commodity", "description": "1 carat VS1 premium diamond."},
    ],
}

def scrape_metal_prices(query: str):
    cache_key = "metal_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower()
    for key, prices in METAL_PRICES.items():
        if key in query_lower:
            set_cached(cache_key, prices)
            return prices
    return []