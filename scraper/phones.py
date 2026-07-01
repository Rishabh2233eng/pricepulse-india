import requests
from bs4 import BeautifulSoup
from cache import get_cached, set_cached

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-IN,en;q=0.9",
}

PHONE_PRICES = {
    "iphone 16 pro max": {"name": "iPhone 16 Pro Max 256GB", "price": "159900", "source": "Apple India"},
    "iphone 16 pro": {"name": "iPhone 16 Pro 128GB", "price": "119900", "source": "Apple India"},
    "iphone 16": {"name": "iPhone 16 128GB", "price": "79900", "source": "Apple India"},
    "iphone 15 pro max": {"name": "iPhone 15 Pro Max 256GB", "price": "134900", "source": "Flipkart"},
    "iphone 15 pro": {"name": "iPhone 15 Pro 128GB", "price": "119900", "source": "Flipkart"},
    "iphone 15": {"name": "iPhone 15 128GB", "price": "69900", "source": "Flipkart"},
    "iphone 14": {"name": "iPhone 14 128GB", "price": "54900", "source": "Amazon"},
    "iphone 13": {"name": "iPhone 13 128GB", "price": "44900", "source": "Flipkart"},
    "samsung s25 ultra": {"name": "Samsung Galaxy S25 Ultra 256GB", "price": "130999", "source": "Samsung India"},
    "samsung s25+": {"name": "Samsung Galaxy S25+ 256GB", "price": "99999", "source": "Samsung India"},
    "samsung s25": {"name": "Samsung Galaxy S25 128GB", "price": "80999", "source": "Samsung India"},
    "samsung s24": {"name": "Samsung Galaxy S24 128GB", "price": "69999", "source": "Flipkart"},
    "samsung a55": {"name": "Samsung Galaxy A55 5G 128GB", "price": "34999", "source": "Amazon"},
    "samsung a35": {"name": "Samsung Galaxy A35 5G 128GB", "price": "26999", "source": "Flipkart"},
    "samsung m34": {"name": "Samsung Galaxy M34 5G 128GB", "price": "16999", "source": "Flipkart"},
    "samsung m14": {"name": "Samsung Galaxy M14 5G 128GB", "price": "12999", "source": "Amazon"},
    "oneplus 13": {"name": "OnePlus 13 256GB", "price": "69999", "source": "OnePlus India"},
    "oneplus 12": {"name": "OnePlus 12 256GB", "price": "59999", "source": "Amazon"},
    "oneplus nord 4": {"name": "OnePlus Nord 4 256GB", "price": "29999", "source": "OnePlus India"},
    "oneplus nord ce4": {"name": "OnePlus Nord CE4 128GB", "price": "22999", "source": "Flipkart"},
    "oneplus nord ce3": {"name": "OnePlus Nord CE3 Lite 128GB", "price": "16999", "source": "Amazon"},
    "redmi note 14 pro": {"name": "Redmi Note 14 Pro 5G 128GB", "price": "24999", "source": "Flipkart"},
    "redmi note 14": {"name": "Redmi Note 14 5G 128GB", "price": "19999", "source": "Flipkart"},
    "redmi note 13 pro": {"name": "Redmi Note 13 Pro 5G 128GB", "price": "22999", "source": "Flipkart"},
    "redmi note 13": {"name": "Redmi Note 13 5G 128GB", "price": "16999", "source": "Flipkart"},
    "redmi 13c": {"name": "Redmi 13C 128GB", "price": "8999", "source": "Amazon"},
    "realme 13 pro": {"name": "Realme 13 Pro+ 5G 256GB", "price": "29999", "source": "Flipkart"},
    "realme narzo 70": {"name": "Realme Narzo 70 5G 128GB", "price": "13999", "source": "Amazon"},
    "vivo v40": {"name": "Vivo V40 5G 256GB", "price": "34999", "source": "Vivo India"},
    "vivo y200": {"name": "Vivo Y200 5G 128GB", "price": "19999", "source": "Flipkart"},
    "oppo reno 12": {"name": "OPPO Reno 12 Pro 5G 256GB", "price": "36999", "source": "Flipkart"},
    "poco x6 pro": {"name": "POCO X6 Pro 5G 256GB", "price": "26999", "source": "Flipkart"},
    "poco m6 pro": {"name": "POCO M6 Pro 5G 128GB", "price": "13999", "source": "Flipkart"},
    "motorola edge 50": {"name": "Motorola Edge 50 Fusion 256GB", "price": "22999", "source": "Flipkart"},
    "nothing phone 2a": {"name": "Nothing Phone (2a) 128GB", "price": "19999", "source": "Flipkart"},
    "google pixel 9": {"name": "Google Pixel 9 128GB", "price": "79999", "source": "Flipkart"},
}

def search_phone_price(query: str):
    cache_key = "phone_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower()
    results = []

    # Exact or partial match
    for key, data in PHONE_PRICES.items():
        if key in query_lower or query_lower in key or any(w in query_lower for w in key.split()):
            results.append({
                "name": data["name"],
                "price": data["price"],
                "unit": "piece",
                "change": -2,
                "source": data["source"],
                "category": "Smartphone",
                "description": f"{data['name']} - Latest price in India."
            })

    # Limit to 6
    results = results[:6]

    if results:
        set_cached(cache_key, results)

    return results


def scrape_91mobiles(query: str):
    """Scrape 91mobiles for phone prices"""
    cache_key = "91mob_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    try:
        search_url = "https://www.91mobiles.com/search/" + query.replace(" ", "+")
        res = requests.get(search_url, headers=HEADERS, timeout=8)
        soup = BeautifulSoup(res.text, "html.parser")

        results = []
        cards = soup.select(".search_mob_name")[:5]
        prices = soup.select(".search_price")[:5]

        for i, card in enumerate(cards):
            name = card.get_text(strip=True)
            price = prices[i].get_text(strip=True) if i < len(prices) else "0"
            price_clean = price.replace("₹", "").replace(",", "").strip()

            if name and price_clean and price_clean != "0":
                results.append({
                    "name": name,
                    "price": price_clean,
                    "unit": "piece",
                    "change": -2,
                    "source": "91mobiles",
                    "category": "Smartphone",
                    "description": f"{name} - Current price in India."
                })

        if results:
            set_cached(cache_key, results)
            return results
    except Exception as e:
        print(f"91mobiles scrape failed: {e}")

    return []