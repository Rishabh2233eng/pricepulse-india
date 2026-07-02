from cache import get_cached, set_cached

FUEL_PRICES = {
    "petrol": [
        {"name": "Petrol - Delhi", "price": "94.77", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Delhi."},
        {"name": "Petrol - Mumbai", "price": "103.44", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Mumbai."},
        {"name": "Petrol - Bangalore", "price": "102.86", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Bangalore."},
        {"name": "Petrol - Chennai", "price": "100.75", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Chennai."},
        {"name": "Petrol - Hyderabad", "price": "107.41", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Hyderabad."},
        {"name": "Petrol - Kolkata", "price": "103.94", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Kolkata."},
        {"name": "Petrol - Pune", "price": "104.14", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Pune."},
        {"name": "Petrol - Ahmedabad", "price": "96.63", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL petrol price Ahmedabad."},
    ],
    "diesel": [
        {"name": "Diesel - Delhi", "price": "87.67", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Delhi."},
        {"name": "Diesel - Mumbai", "price": "89.97", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Mumbai."},
        {"name": "Diesel - Bangalore", "price": "90.94", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Bangalore."},
        {"name": "Diesel - Chennai", "price": "92.44", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Chennai."},
        {"name": "Diesel - Hyderabad", "price": "95.65", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Hyderabad."},
        {"name": "Diesel - Kolkata", "price": "92.76", "unit": "litre", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Official IOCL diesel price Kolkata."},
    ],
    "cng": [
        {"name": "CNG - Delhi", "price": "74.09", "unit": "kg", "change": -2, "source": "IGL", "category": "Fuel", "description": "IGL CNG price Delhi."},
        {"name": "CNG - Mumbai", "price": "66.00", "unit": "kg", "change": -1, "source": "MGL", "category": "Fuel", "description": "MGL CNG price Mumbai."},
        {"name": "CNG - Pune", "price": "75.00", "unit": "kg", "change": -1, "source": "MGL", "category": "Fuel", "description": "CNG price Pune."},
        {"name": "CNG - Ahmedabad", "price": "72.00", "unit": "kg", "change": 0, "source": "GSPC", "category": "Fuel", "description": "CNG price Ahmedabad."},
        {"name": "CNG - Noida", "price": "74.17", "unit": "kg", "change": -1, "source": "IGL", "category": "Fuel", "description": "IGL CNG price Noida."},
        {"name": "CNG - Gurgaon", "price": "78.61", "unit": "kg", "change": -1, "source": "HGL", "category": "Fuel", "description": "CNG price Gurgaon."},
    ],
    "lpg": [
        {"name": "LPG Cylinder 14.2kg (Domestic)", "price": "803", "unit": "cylinder", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Domestic LPG cylinder 14.2kg."},
        {"name": "LPG Cylinder 5kg", "price": "471", "unit": "cylinder", "change": 0, "source": "IOCL", "category": "Fuel", "description": "Small LPG cylinder 5kg."},
        {"name": "LPG Commercial 19kg", "price": "1646", "unit": "cylinder", "change": 2, "source": "IOCL", "category": "Fuel", "description": "Commercial LPG cylinder 19kg."},
    ],
}

def scrape_fuel_prices(query: str):
    cache_key = "fuel_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower()
    for key, prices in FUEL_PRICES.items():
        if key in query_lower:
            set_cached(cache_key, prices)
            return prices
    return []