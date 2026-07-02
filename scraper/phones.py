from cache import get_cached, set_cached

PHONE_PRICES = {
    "iphone 16 pro max": [{"name": "iPhone 16 Pro Max 256GB", "price": "159900", "unit": "piece", "change": -1, "source": "Apple India", "category": "Smartphone", "description": "Apple iPhone 16 Pro Max 256GB Natural Titanium."}],
    "iphone 16 pro": [{"name": "iPhone 16 Pro 128GB", "price": "119900", "unit": "piece", "change": -1, "source": "Apple India", "category": "Smartphone", "description": "Apple iPhone 16 Pro 128GB."}],
    "iphone 16 plus": [{"name": "iPhone 16 Plus 128GB", "price": "89900", "unit": "piece", "change": -1, "source": "Apple India", "category": "Smartphone", "description": "Apple iPhone 16 Plus 128GB."}],
    "iphone 16": [{"name": "iPhone 16 128GB", "price": "79900", "unit": "piece", "change": -1, "source": "Apple India", "category": "Smartphone", "description": "Apple iPhone 16 128GB."}],
    "iphone 15 pro max": [{"name": "iPhone 15 Pro Max 256GB", "price": "134900", "unit": "piece", "change": -5, "source": "Flipkart", "category": "Smartphone", "description": "Apple iPhone 15 Pro Max 256GB."}],
    "iphone 15 pro": [{"name": "iPhone 15 Pro 128GB", "price": "119900", "unit": "piece", "change": -5, "source": "Flipkart", "category": "Smartphone", "description": "Apple iPhone 15 Pro 128GB."}],
    "iphone 15": [{"name": "iPhone 15 128GB", "price": "69900", "unit": "piece", "change": -8, "source": "Flipkart", "category": "Smartphone", "description": "Apple iPhone 15 128GB."}],
    "iphone 14": [{"name": "iPhone 14 128GB", "price": "54900", "unit": "piece", "change": -12, "source": "Amazon", "category": "Smartphone", "description": "Apple iPhone 14 128GB."}],
    "iphone 13": [{"name": "iPhone 13 128GB", "price": "44900", "unit": "piece", "change": -15, "source": "Flipkart", "category": "Smartphone", "description": "Apple iPhone 13 128GB."}],
    "samsung s25 ultra": [{"name": "Samsung Galaxy S25 Ultra 256GB", "price": "130999", "unit": "piece", "change": -2, "source": "Samsung India", "category": "Smartphone", "description": "Samsung Galaxy S25 Ultra Titanium Black."}],
    "samsung s25+": [{"name": "Samsung Galaxy S25+ 256GB", "price": "99999", "unit": "piece", "change": -2, "source": "Samsung India", "category": "Smartphone", "description": "Samsung Galaxy S25+."}],
    "samsung s25": [{"name": "Samsung Galaxy S25 128GB", "price": "80999", "unit": "piece", "change": -2, "source": "Samsung India", "category": "Smartphone", "description": "Samsung Galaxy S25."}],
    "samsung s24 ultra": [{"name": "Samsung Galaxy S24 Ultra 256GB", "price": "109999", "unit": "piece", "change": -8, "source": "Flipkart", "category": "Smartphone", "description": "Samsung Galaxy S24 Ultra."}],
    "samsung s24": [{"name": "Samsung Galaxy S24 128GB", "price": "69999", "unit": "piece", "change": -8, "source": "Flipkart", "category": "Smartphone", "description": "Samsung Galaxy S24."}],
    "samsung a55": [{"name": "Samsung Galaxy A55 5G 128GB", "price": "34999", "unit": "piece", "change": -5, "source": "Amazon", "category": "Smartphone", "description": "Samsung Galaxy A55 5G."}],
    "samsung a35": [{"name": "Samsung Galaxy A35 5G 128GB", "price": "26999", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Smartphone", "description": "Samsung Galaxy A35 5G."}],
    "samsung m34": [{"name": "Samsung Galaxy M34 5G 128GB", "price": "16999", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Smartphone", "description": "Samsung Galaxy M34 5G."}],
    "samsung m14": [{"name": "Samsung Galaxy M14 5G 128GB", "price": "12999", "unit": "piece", "change": -2, "source": "Amazon", "category": "Smartphone", "description": "Samsung Galaxy M14 5G."}],
    "oneplus 13": [{"name": "OnePlus 13 256GB", "price": "69999", "unit": "piece", "change": -2, "source": "OnePlus India", "category": "Smartphone", "description": "OnePlus 13 Snapdragon 8 Elite."}],
    "oneplus 12": [{"name": "OnePlus 12 256GB", "price": "59999", "unit": "piece", "change": -8, "source": "Amazon", "category": "Smartphone", "description": "OnePlus 12 Snapdragon 8 Gen 3."}],
    "oneplus nord 4": [{"name": "OnePlus Nord 4 256GB", "price": "29999", "unit": "piece", "change": -3, "source": "OnePlus India", "category": "Smartphone", "description": "OnePlus Nord 4 5G."}],
    "oneplus nord ce4": [{"name": "OnePlus Nord CE4 128GB", "price": "22999", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Smartphone", "description": "OnePlus Nord CE4."}],
    "oneplus nord ce3": [{"name": "OnePlus Nord CE3 Lite 128GB", "price": "16999", "unit": "piece", "change": -5, "source": "Amazon", "category": "Smartphone", "description": "OnePlus Nord CE3 Lite 5G."}],
    "redmi note 14 pro": [{"name": "Redmi Note 14 Pro 5G 128GB", "price": "24999", "unit": "piece", "change": -1, "source": "Flipkart", "category": "Smartphone", "description": "Redmi Note 14 Pro 5G."}],
    "redmi note 14": [{"name": "Redmi Note 14 5G 128GB", "price": "19999", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Smartphone", "description": "Redmi Note 14 5G."}],
    "redmi note 13 pro": [{"name": "Redmi Note 13 Pro 5G 128GB", "price": "22999", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Smartphone", "description": "Redmi Note 13 Pro 5G."}],
    "redmi note 13": [{"name": "Redmi Note 13 5G 128GB", "price": "16999", "unit": "piece", "change": -5, "source": "Flipkart", "category": "Smartphone", "description": "Redmi Note 13 5G."}],
    "redmi 13c": [{"name": "Redmi 13C 128GB", "price": "8999", "unit": "piece", "change": -2, "source": "Amazon", "category": "Smartphone", "description": "Redmi 13C budget phone."}],
    "redmi a3": [{"name": "Redmi A3 64GB", "price": "6999", "unit": "piece", "change": -1, "source": "Flipkart", "category": "Smartphone", "description": "Redmi A3 entry level."}],
    "realme 13 pro": [{"name": "Realme 13 Pro+ 5G 256GB", "price": "29999", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Smartphone", "description": "Realme 13 Pro+ 5G."}],
    "realme 12 pro": [{"name": "Realme 12 Pro+ 5G 256GB", "price": "24999", "unit": "piece", "change": -6, "source": "Flipkart", "category": "Smartphone", "description": "Realme 12 Pro+ 5G."}],
    "realme narzo 70": [{"name": "Realme Narzo 70 5G 128GB", "price": "13999", "unit": "piece", "change": -3, "source": "Amazon", "category": "Smartphone", "description": "Realme Narzo 70 5G."}],
    "realme c65": [{"name": "Realme C65 5G 128GB", "price": "8999", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Smartphone", "description": "Realme C65 5G budget phone."}],
    "vivo v40": [{"name": "Vivo V40 5G 256GB", "price": "34999", "unit": "piece", "change": -2, "source": "Vivo India", "category": "Smartphone", "description": "Vivo V40 5G."}],
    "vivo y200": [{"name": "Vivo Y200 5G 128GB", "price": "19999", "unit": "piece", "change": -1, "source": "Flipkart", "category": "Smartphone", "description": "Vivo Y200 5G."}],
    "vivo t3x": [{"name": "Vivo T3x 5G 128GB", "price": "12999", "unit": "piece", "change": -2, "source": "Amazon", "category": "Smartphone", "description": "Vivo T3x 5G."}],
    "oppo reno 12": [{"name": "OPPO Reno 12 Pro 5G 256GB", "price": "36999", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Smartphone", "description": "OPPO Reno 12 Pro 5G."}],
    "poco x6 pro": [{"name": "POCO X6 Pro 5G 256GB", "price": "26999", "unit": "piece", "change": -4, "source": "Flipkart", "category": "Smartphone", "description": "POCO X6 Pro 5G."}],
    "poco m6 pro": [{"name": "POCO M6 Pro 5G 128GB", "price": "13999", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Smartphone", "description": "POCO M6 Pro 5G."}],
    "motorola edge 50": [{"name": "Motorola Edge 50 Fusion 256GB", "price": "22999", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Smartphone", "description": "Motorola Edge 50 Fusion."}],
    "nothing phone 2a": [{"name": "Nothing Phone (2a) 128GB", "price": "19999", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Smartphone", "description": "Nothing Phone 2a."}],
    "nothing phone 2": [{"name": "Nothing Phone (2) 256GB", "price": "44999", "unit": "piece", "change": -5, "source": "Flipkart", "category": "Smartphone", "description": "Nothing Phone 2."}],
    "google pixel 9 pro": [{"name": "Google Pixel 9 Pro 128GB", "price": "109999", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Smartphone", "description": "Google Pixel 9 Pro."}],
    "google pixel 9": [{"name": "Google Pixel 9 128GB", "price": "79999", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Smartphone", "description": "Google Pixel 9."}],
    "macbook air m3": [{"name": "MacBook Air 13\" M3 8GB 256GB", "price": "114900", "unit": "piece", "change": -1, "source": "Apple Store", "category": "Laptop", "description": "Apple MacBook Air M3 chip."}],
    "macbook air m2": [{"name": "MacBook Air 13\" M2 8GB 256GB", "price": "99900", "unit": "piece", "change": -5, "source": "Apple Store", "category": "Laptop", "description": "Apple MacBook Air M2."}],
    "macbook pro m3": [{"name": "MacBook Pro 14\" M3 8GB 512GB", "price": "169900", "unit": "piece", "change": -1, "source": "Apple Store", "category": "Laptop", "description": "Apple MacBook Pro M3."}],
    "dell xps": [{"name": "Dell XPS 13 Intel i7 16GB", "price": "124990", "unit": "piece", "change": -3, "source": "Dell India", "category": "Laptop", "description": "Dell XPS 13 premium laptop."}],
    "hp spectre": [{"name": "HP Spectre x360 Intel i7", "price": "149990", "unit": "piece", "change": -2, "source": "HP India", "category": "Laptop", "description": "HP Spectre x360 premium."}],
    "lenovo thinkpad": [{"name": "Lenovo ThinkPad E14 AMD Ryzen 5", "price": "72990", "unit": "piece", "change": -1, "source": "Amazon", "category": "Laptop", "description": "Lenovo ThinkPad E14 business laptop."}],
    "asus rog": [{"name": "ASUS ROG Strix G16 RTX 4060", "price": "134990", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Laptop", "description": "ASUS ROG gaming laptop."}],
    "hp pavilion": [{"name": "HP Pavilion 15 Ryzen 7 16GB", "price": "56990", "unit": "piece", "change": -1, "source": "Flipkart", "category": "Laptop", "description": "HP Pavilion 15 laptop."}],
    "lenovo ideapad": [{"name": "Lenovo IdeaPad Slim 3 Ryzen 5", "price": "38990", "unit": "piece", "change": 0, "source": "Amazon", "category": "Laptop", "description": "Lenovo IdeaPad Slim 3."}],
    "acer aspire": [{"name": "Acer Aspire Lite Ryzen 3", "price": "28990", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Laptop", "description": "Acer Aspire Lite budget laptop."}],
}

def search_phone_price(query: str):
    cache_key = "phone_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower().strip()
    results = []

    # Try exact match first
    if query_lower in PHONE_PRICES:
        results = PHONE_PRICES[query_lower]
        set_cached(cache_key, results)
        return results

    # Try partial match
    for key, items in PHONE_PRICES.items():
        if key in query_lower or query_lower in key:
            results.extend(items)

    # Word match
    if not results:
        query_words = set(query_lower.split())
        for key, items in PHONE_PRICES.items():
            key_words = set(key.split())
            if len(query_words & key_words) >= 2:
                results.extend(items)

    results = results[:6]
    if results:
        set_cached(cache_key, results)
    return results

def scrape_91mobiles(query: str):
    return []