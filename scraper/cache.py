import json
import time
import os

CACHE_FILE = "cache_data.json"
CACHE_DURATION = 6 * 60 * 60  # 6 hours

def load_cache():
    if not os.path.exists(CACHE_FILE):
        return {}
    try:
        with open(CACHE_FILE, "r") as f:
            return json.load(f)
    except:
        return {}

def save_cache(data):
    with open(CACHE_FILE, "w") as f:
        json.dump(data, f, indent=2)

def get_cached(key):
    cache = load_cache()
    if key in cache:
        item = cache[key]
        if time.time() - item["timestamp"] < CACHE_DURATION:
            print(f"Cache HIT: {key}")
            return item["data"]
    return None

def set_cached(key, data):
    cache = load_cache()
    cache[key] = {"timestamp": time.time(), "data": data}
    save_cache(cache)
    print(f"Cache SET: {key}")