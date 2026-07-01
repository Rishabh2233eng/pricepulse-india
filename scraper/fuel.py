import requests
from bs4 import BeautifulSoup
from cache import get_cached, set_cached

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
}

FUEL_PRICES = {
    "petrol": [
        {"name": "Petrol - Delhi", "price": "94.77", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Delhi."},
        {"name": "Petrol - Mumbai", "price": "103.44", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Mumbai."},
        {"name": "Petrol - Bangalore", "price": "102.86", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Bangalore."},
        {"name": "Petrol - Chennai", "price": "100.75", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Chennai."},
        {"name": "Petrol - Hyderabad", "price": "107.41", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Hyderabad."},
        {"name": "Petrol - Kolkata", "price": "103.94", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Kolkata."},
    ],
    "diesel": [
        {"name": "Diesel - Delhi", "price": "87.67", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Delhi."},
        {"name": "Diesel - Mumbai", "price": "89.97", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Mumbai."},
        {"name": "Diesel - Bangalore", "price": "90.94", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Bangalore."},
        {"name": "Diesel - Chennai", "price": "92.44", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Chennai."},
    ],
    "cng": [
        {"name": "CNG - Delhi", "price": "74.09", "unit": "kg", "change": -2, "source": "IGL", "category": "Fuel", "description": "IGL CNG price Delhi."},
        {"name": "CNG - Mumbai", "price": "66.00", "unit": "kg", "change": -1, "source": "MGL", "category": "Fuel", "description": "MGL CNG price Mumbai."},
        {"name": "CNG - Pune", "price": "75.00", "unit": "kg", "change": -1, "source": "MGL", "category": "Fuel", "description": "CNG price Pune."},
        {"name": "CNG - Ahmedabad", "price": "72.00", "unit": "kg", "change": 0, "source": "GSPC", "category": "Fuel", "description": "CNG price Ahmedabad."},
    ],
    "lpg": [
        {"name": "LPG Cylinder (14.2kg)", "price": "803", "unit": "cylinder", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Domestic LPG cylinder 14.2kg."},
        {"name": "LPG Cylinder (5kg)", "price": "471", "unit": "cylinder", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Small LPG cylinder 5kg."},
    ],
}

def scrape_fuel_prices(query: str):
    cache_key = "fuel_" + query.lower()
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower()
    for key, prices in FUEL_PRICES.items():
        if key in query_lower:
            set_cached(cache_key, prices)
            return prices
    return []