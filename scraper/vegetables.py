import requests
from bs4 import BeautifulSoup
from cache import get_cached, set_cached

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
}

VEGETABLE_PRICES = {
    "tomato": {"name": "Tomato", "price": 42, "unit": "kg", "source": "Agmarknet", "change": -12},
    "onion": {"name": "Onion", "price": 28, "unit": "kg", "source": "Agmarknet", "change": -5},
    "potato": {"name": "Potato", "price": 22, "unit": "kg", "source": "Agmarknet", "change": 3},
    "garlic": {"name": "Garlic", "price": 120, "unit": "kg", "source": "Agmarknet", "change": 5},
    "ginger": {"name": "Ginger", "price": 80, "unit": "kg", "source": "Agmarknet", "change": 2},
    "cabbage": {"name": "Cabbage", "price": 18, "unit": "kg", "source": "Agmarknet", "change": -2},
    "cauliflower": {"name": "Cauliflower", "price": 25, "unit": "kg", "source": "Agmarknet", "change": -4},
    "spinach": {"name": "Spinach", "price": 30, "unit": "kg", "source": "Agmarknet", "change": 1},
    "carrot": {"name": "Carrot", "price": 35, "unit": "kg", "source": "Agmarknet", "change": -2},
    "capsicum": {"name": "Capsicum", "price": 60, "unit": "kg", "source": "Agmarknet", "change": 4},
    "brinjal": {"name": "Brinjal", "price": 32, "unit": "kg", "source": "Agmarknet", "change": -1},
    "ladyfinger": {"name": "Lady Finger (Bhindi)", "price": 40, "unit": "kg", "source": "Agmarknet", "change": 2},
    "peas": {"name": "Green Peas", "price": 55, "unit": "kg", "source": "Agmarknet", "change": 3},
    "cucumber": {"name": "Cucumber", "price": 25, "unit": "kg", "source": "Agmarknet", "change": -3},
    "lemon": {"name": "Lemon", "price": 60, "unit": "kg", "source": "Agmarknet", "change": -3},
}

FRUIT_PRICES = {
    "mango": {"name": "Mango (Alphonso)", "price": 350, "unit": "kg", "source": "Market", "change": 5},
    "apple": {"name": "Apple (Shimla)", "price": 180, "unit": "kg", "source": "Market", "change": -2},
    "banana": {"name": "Banana", "price": 40, "unit": "dozen", "source": "Market", "change": 1},
    "grapes": {"name": "Grapes (Green)", "price": 120, "unit": "kg", "source": "Market", "change": -3},
    "orange": {"name": "Orange", "price": 80, "unit": "kg", "source": "Market", "change": -1},
    "watermelon": {"name": "Watermelon", "price": 25, "unit": "kg", "source": "Market", "change": -5},
    "papaya": {"name": "Papaya", "price": 35, "unit": "kg", "source": "Market", "change": 0},
    "guava": {"name": "Guava", "price": 60, "unit": "kg", "source": "Market", "change": 2},
    "pomegranate": {"name": "Pomegranate", "price": 200, "unit": "kg", "source": "Market", "change": 3},
    "strawberry": {"name": "Strawberry", "price": 150, "unit": "250gm", "source": "Market", "change": -8},
}

DRY_FRUIT_PRICES = {
    "cashew": {"name": "Cashew (Kaju) W240", "price": 850, "unit": "kg", "source": "Market", "change": 2},
    "almond": {"name": "Almond (Badam)", "price": 750, "unit": "kg", "source": "Market", "change": 1},
    "walnut": {"name": "Walnut (Akhrot)", "price": 650, "unit": "kg", "source": "Market", "change": -1},
    "pistachio": {"name": "Pistachio (Pista)", "price": 1200, "unit": "kg", "source": "Market", "change": 3},
    "raisin": {"name": "Raisin (Kishmish)", "price": 250, "unit": "kg", "source": "Market", "change": 0},
    "dates": {"name": "Dates (Khajoor)", "price": 300, "unit": "kg", "source": "Market", "change": 1},
    "fig": {"name": "Fig (Anjeer)", "price": 800, "unit": "kg", "source": "Market", "change": 2},
    "apricot": {"name": "Apricot (Khubani)", "price": 600, "unit": "kg", "source": "Market", "change": 1},
}

def search_agmarknet(query: str):
    cache_key = "veg_" + query.lower()
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower()

    # Check vegetables
    for key, data in VEGETABLE_PRICES.items():
        if key in query_lower or query_lower in key:
            result = [{
                "name": data["name"],
                "price": str(data["price"]),
                "unit": data["unit"],
                "change": data["change"],
                "source": data["source"],
                "category": "Vegetable",
                "description": f"Fresh {data['name']} from local mandis across India."
            }]
            set_cached(cache_key, result)
            return result

    # Check fruits
    for key, data in FRUIT_PRICES.items():
        if key in query_lower or query_lower in key:
            result = [{
                "name": data["name"],
                "price": str(data["price"]),
                "unit": data["unit"],
                "change": data["change"],
                "source": data["source"],
                "category": "Fruit",
                "description": f"Fresh {data['name']} from Indian markets."
            }]
            set_cached(cache_key, result)
            return result

    # Check dry fruits
    for key, data in DRY_FRUIT_PRICES.items():
        if key in query_lower or query_lower in key:
            result = [{
                "name": data["name"],
                "price": str(data["price"]),
                "unit": data["unit"],
                "change": data["change"],
                "source": data["source"],
                "category": "Dry Fruit",
                "description": f"Premium quality {data['name']} from Indian markets."
            }]
            set_cached(cache_key, result)
            return result

    return []