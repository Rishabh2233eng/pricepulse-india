from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

sys.path.append(os.path.dirname(__file__))

from vehicles import search_vehicle_price
from phones import search_phone_price, scrape_91mobiles
from vegetables import search_agmarknet
from fuel import scrape_fuel_prices
from metals import scrape_metal_prices
from models.predictor import predict_price, detect_anomaly
from data.prices import PRICE_HISTORY

app = FastAPI(title="PricePulse Scraper + ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://pricepulse.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    product: str
    days_ahead: int = 7

def classify_query(query: str) -> str:
    q = query.lower()
    fuel_words = ["petrol", "diesel", "cng", "lpg", "fuel"]
    metal_words = ["gold", "silver", "platinum", "sona", "chandi"]
    veg_words = ["tomato", "onion", "potato", "garlic", "ginger", "cabbage",
                 "cauliflower", "spinach", "carrot", "capsicum", "brinjal",
                 "mango", "apple", "banana", "grapes", "orange", "watermelon",
                 "papaya", "guava", "pomegranate", "strawberry", "cashew",
                 "almond", "walnut", "pistachio", "raisin", "dates", "fig",
                 "sabzi", "fruit", "dry fruit", "vegetable"]
    phone_words = ["iphone", "samsung", "oneplus", "redmi", "realme", "vivo",
                   "oppo", "poco", "motorola", "nothing", "pixel", "mobile",
                   "phone", "smartphone"]
    car_words = ["maruti", "tata", "hyundai", "honda", "kia", "mg", "toyota",
                 "volkswagen", "skoda", "renault", "car", "sedan", "suv", "hatchback"]
    bike_words = ["royal enfield", "bajaj", "tvs", "yamaha", "ktm", "hero",
                  "suzuki", "bmw", "bike", "scooter", "activa", "pulsar",
                  "apache", "splendor", "duke"]

    for w in fuel_words:
        if w in q: return "fuel"
    for w in metal_words:
        if w in q: return "metal"
    for w in veg_words:
        if w in q: return "vegetable"
    for w in bike_words:
        if w in q: return "bike"
    for w in car_words:
        if w in q: return "car"
    for w in phone_words:
        if w in q: return "phone"
    return "unknown"

@app.get("/")
def root():
    return {"message": "PricePulse Scraper Service Running!", "status": "ok"}

@app.get("/search")
def search_price(q: str):
    query = q.strip()
    if not query:
        return {"error": "Query required", "prices": []}

    category = classify_query(query)
    prices = []

    if category == "fuel":
        prices = scrape_fuel_prices(query)
    elif category == "metal":
        prices = scrape_metal_prices(query)
    elif category == "vegetable":
        prices = search_agmarknet(query)
    elif category == "phone":
        prices = search_phone_price(query)
        if not prices:
            prices = scrape_91mobiles(query)
    elif category in ["car", "bike"]:
        prices = search_vehicle_price(query)
    else:
        # Try all
        prices = search_agmarknet(query)
        if not prices:
            prices = search_phone_price(query)
        if not prices:
            prices = search_vehicle_price(query)
        if not prices:
            prices = scrape_fuel_prices(query)

    return {
        "query": query,
        "category": category,
        "prices": prices,
        "count": len(prices),
        "source": "scraper"
    }

@app.post("/predict")
def predict(req: PredictRequest):
    product = req.product.lower()
    key = next((k for k in PRICE_HISTORY if product in k or k in product), None)
    if not key:
        return {"product": product, "error": "No historical data", "trend": "unknown"}
    history = PRICE_HISTORY[key]
    result = predict_price(history, req.days_ahead)
    return {
        "product": product,
        "history": history,
        "prediction": result,
        "is_price_spike": detect_anomaly(history),
    }

@app.get("/predict/{product}")
def predict_get(product: str, days: int = 7):
    key = next((k for k in PRICE_HISTORY if product in k or k in product), None)
    if not key:
        return {"product": product, "error": "No data", "trend": "unknown"}
    history = PRICE_HISTORY[key]
    result = predict_price(history, days)
    return {
        "product": product,
        "history": history,
        "prediction": result,
        "is_price_spike": detect_anomaly(history),
    }