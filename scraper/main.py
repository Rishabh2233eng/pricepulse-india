from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.append(os.path.dirname(__file__))

from vehicles import search_vehicle_price
from phones import search_phone_price
from vegetables import search_agmarknet
from fuel import scrape_fuel_prices
from metals import scrape_metal_prices
from models.predictor import predict_price, detect_anomaly
from data.prices import PRICE_HISTORY
from pydantic import BaseModel

app = FastAPI(title="PricePulse Scraper + ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    product: str
    days_ahead: int = 7

def classify_query(query: str) -> str:
    q = query.lower()

    fuel_words = ["petrol", "diesel", "cng", "lpg", "fuel", "gas cylinder"]
    metal_words = ["gold", "silver", "platinum", "sona", "chandi", "bullion", "diamond"]
    dry_fruit_words = ["cashew", "kaju", "almond", "badam", "walnut", "akhrot",
                       "pistachio", "pista", "raisin", "kishmish", "dates",
                       "khajoor", "fig", "anjeer", "apricot", "dry fruit",
                       "dryfruit", "nuts", "mewa", "pine nuts", "chilgoza"]
    fruit_words = ["mango", "apple", "banana", "grapes", "orange", "watermelon",
                   "papaya", "guava", "pomegranate", "strawberry", "kiwi",
                   "pineapple", "coconut", "litchi", "aam", "seb", "fruit"]
    veg_words = ["tomato", "onion", "potato", "garlic", "ginger", "cabbage",
                 "cauliflower", "spinach", "carrot", "capsicum", "brinjal",
                 "bhindi", "ladyfinger", "peas", "cucumber", "lemon", "pumpkin",
                 "bitter gourd", "bottle gourd", "coriander", "green chilli",
                 "tamatar", "aloo", "pyaz", "sabzi", "vegetable"]
    bike_words = ["royal enfield", "bajaj", "tvs apache", "tvs ntorq", "tvs jupiter",
                  "tvs raider", "yamaha", "ktm", "hero splendor", "hero glamour",
                  "hero xpulse", "suzuki", "bmw bike", "triumph", "harley",
                  "activa", "pulsar", "apache", "splendor", "duke", "bullet",
                  "meteor", "himalayan", "hunter", "gixxer", "r15", "fz",
                  "dominar", "avenger", "scooter", "motorcycle", "bike"]
    car_words = ["maruti", "tata nexon", "tata punch", "tata tiago", "tata harrier",
                 "tata safari", "hyundai", "honda city", "honda amaze", "honda elevate",
                 "kia", "mg hector", "toyota", "volkswagen", "skoda", "renault",
                 "mahindra thar", "mahindra scorpio", "mahindra xuv", "car", "sedan",
                 "suv", "hatchback", "alto", "swift", "nexon", "creta", "brezza",
                 "innova", "fortuner", "venue", "sonet", "seltos", "dzire", "ertiga"]
    laptop_words = ["laptop", "macbook", "notebook", "chromebook",
                    "dell xps", "hp spectre", "hp pavilion", "lenovo thinkpad",
                    "lenovo ideapad", "asus rog", "asus vivobook", "acer aspire"]
    phone_words = ["iphone", "samsung galaxy", "oneplus", "redmi", "realme", "vivo",
                   "oppo", "poco", "motorola", "nothing phone", "pixel",
                   "mobile", "phone", "smartphone"]
    tv_words = ["tv", "television", "smart tv", "oled", "qled", "led tv", "samsung tv",
                "lg tv", "sony tv", "mi tv"]
    ac_words = ["ac", "air conditioner", "split ac", "window ac", "inverter ac",
                "voltas", "daikin", "blue star"]
    fridge_words = ["fridge", "refrigerator", "freezer"]
    washing_words = ["washing machine", "washer"]
    medicine_words = ["medicine", "tablet", "capsule", "syrup", "paracetamol",
                      "dolo", "crocin", "vitamin", "supplement", "azithromycin",
                      "omeprazole", "cetirizine"]
    grocery_words = ["rice", "wheat", "dal", "sugar", "oil", "atta", "flour",
                     "milk", "eggs", "chicken", "fish", "grocery",
                     "chawal", "gehun", "cheeni", "namak", "salt"]

    for w in fuel_words:
        if w in q: return "fuel"
    for w in metal_words:
        if w in q: return "metal"
    for w in dry_fruit_words:
        if w in q: return "vegetable"
    for w in fruit_words:
        if w in q: return "vegetable"
    for w in veg_words:
        if w in q: return "vegetable"
    for w in bike_words:
        if w in q: return "bike"
    for w in car_words:
        if w in q: return "car"
    for w in laptop_words:
        if w in q: return "phone"
    for w in phone_words:
        if w in q: return "phone"
    for w in tv_words:
        if w in q: return "electronics"
    for w in ac_words:
        if w in q: return "electronics"
    for w in fridge_words:
        if w in q: return "electronics"
    for w in washing_words:
        if w in q: return "electronics"
    for w in medicine_words:
        if w in q: return "medicine"
    for w in grocery_words:
        if w in q: return "grocery"
    return "unknown"

def get_electronics_price(query: str):
    q = query.lower()
    electronics = {
        "samsung tv": [
            {"name": "Samsung 43\" 4K Crystal UHD TV", "price": "32990", "unit": "piece", "change": -5, "source": "Flipkart", "category": "Electronics", "description": "Samsung 43 inch 4K Smart TV."},
            {"name": "Samsung 55\" QLED 4K TV", "price": "64990", "unit": "piece", "change": -3, "source": "Amazon", "category": "Electronics", "description": "Samsung 55 inch QLED 4K TV."},
            {"name": "Samsung 65\" Neo QLED TV", "price": "134990", "unit": "piece", "change": -2, "source": "Samsung India", "category": "Electronics", "description": "Samsung 65 inch Neo QLED 8K TV."},
        ],
        "lg tv": [
            {"name": "LG 43\" 4K UHD Smart TV", "price": "34990", "unit": "piece", "change": -4, "source": "Flipkart", "category": "Electronics", "description": "LG 43 inch 4K UHD Smart TV."},
            {"name": "LG 55\" OLED evo C3 TV", "price": "119990", "unit": "piece", "change": -2, "source": "Amazon", "category": "Electronics", "description": "LG 55 inch OLED evo C3 4K TV."},
        ],
        "sony tv": [
            {"name": "Sony Bravia 43\" 4K TV", "price": "42990", "unit": "piece", "change": -3, "source": "Sony India", "category": "Electronics", "description": "Sony Bravia 43 inch 4K TV."},
            {"name": "Sony Bravia 55\" OLED TV", "price": "139990", "unit": "piece", "change": -2, "source": "Sony India", "category": "Electronics", "description": "Sony Bravia 55 inch OLED TV."},
        ],
        "mi tv": [
            {"name": "Mi 40\" Full HD Android TV", "price": "19990", "unit": "piece", "change": -8, "source": "Flipkart", "category": "Electronics", "description": "Mi 40 inch Full HD Android TV."},
            {"name": "Mi 43\" 4K UHD Smart TV", "price": "24990", "unit": "piece", "change": -6, "source": "Flipkart", "category": "Electronics", "description": "Mi 43 inch 4K Smart TV."},
        ],
        "ac": [
            {"name": "Voltas 1.5T 3★ Inverter AC", "price": "32990", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Appliance", "description": "Voltas 1.5 ton 3 star inverter split AC."},
            {"name": "Daikin 1.5T 5★ Inverter AC", "price": "45990", "unit": "piece", "change": -1, "source": "Amazon", "category": "Appliance", "description": "Daikin 1.5 ton 5 star inverter AC."},
            {"name": "LG 1.5T 4★ Dual Inverter AC", "price": "38990", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Appliance", "description": "LG 1.5 ton 4 star dual inverter AC."},
            {"name": "Samsung 1.5T 3★ WindFree AC", "price": "34990", "unit": "piece", "change": -2, "source": "Amazon", "category": "Appliance", "description": "Samsung 1.5 ton WindFree AC."},
            {"name": "Blue Star 1T 3★ Inverter AC", "price": "28990", "unit": "piece", "change": -1, "source": "Flipkart", "category": "Appliance", "description": "Blue Star 1 ton 3 star inverter AC."},
            {"name": "Carrier 2T 3★ Inverter AC", "price": "42990", "unit": "piece", "change": -1, "source": "Amazon", "category": "Appliance", "description": "Carrier 2 ton 3 star inverter AC."},
        ],
        "fridge": [
            {"name": "LG 260L Double Door Frost Free", "price": "28990", "unit": "piece", "change": -3, "source": "Flipkart", "category": "Appliance", "description": "LG 260 litre double door frost free fridge."},
            {"name": "Samsung 253L Double Door", "price": "26990", "unit": "piece", "change": -2, "source": "Amazon", "category": "Appliance", "description": "Samsung 253 litre double door fridge."},
            {"name": "Whirlpool 184L Single Door", "price": "15990", "unit": "piece", "change": -1, "source": "Flipkart", "category": "Appliance", "description": "Whirlpool 184 litre single door fridge."},
            {"name": "Haier 320L Double Door", "price": "32990", "unit": "piece", "change": -2, "source": "Amazon", "category": "Appliance", "description": "Haier 320 litre double door fridge."},
        ],
        "washing machine": [
            {"name": "Samsung 7kg Front Load", "price": "34990", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Appliance", "description": "Samsung 7kg front load washing machine."},
            {"name": "LG 8kg Top Load", "price": "21990", "unit": "piece", "change": -1, "source": "Amazon", "category": "Appliance", "description": "LG 8kg top load washing machine."},
            {"name": "Whirlpool 6.5kg Top Load", "price": "16990", "unit": "piece", "change": -2, "source": "Flipkart", "category": "Appliance", "description": "Whirlpool 6.5kg top load."},
            {"name": "IFB 8kg Front Load", "price": "44990", "unit": "piece", "change": -1, "source": "Amazon", "category": "Appliance", "description": "IFB 8kg front load washing machine."},
        ],
    }

    for key, items in electronics.items():
        if key in q or any(w in q for w in key.split()):
            return items

    if "tv" in q or "television" in q:
        return electronics["samsung tv"] + electronics["lg tv"][:1]
    if "ac" in q or "air condition" in q:
        return electronics["ac"]
    if "fridge" in q or "refrigerator" in q:
        return electronics["fridge"]
    if "washing" in q:
        return electronics["washing machine"]
    return []

def get_medicine_price(query: str):
    q = query.lower()
    medicines = {
        "paracetamol": [
            {"name": "Paracetamol 500mg Strip (15 tabs)", "price": "15", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Generic paracetamol 500mg."},
        ],
        "dolo": [{"name": "Dolo 650mg (15 tabs)", "price": "30", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Dolo 650mg paracetamol."}],
        "crocin": [{"name": "Crocin 650mg (15 tabs)", "price": "32", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Crocin 650mg paracetamol."}],
        "vitamin d": [
            {"name": "Vitamin D3 60K IU (4 caps)", "price": "85", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Vitamin D3 60K supplement."},
            {"name": "D3 Must Tablet (60 tabs)", "price": "450", "unit": "bottle", "change": 1, "source": "MRP", "category": "Medicine", "description": "Daily vitamin D3 supplement."},
        ],
        "vitamin c": [
            {"name": "Vitamin C 500mg (10 tabs)", "price": "45", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Vitamin C supplement."},
            {"name": "Limcee 500mg Chewable (15 tabs)", "price": "28", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Limcee chewable vitamin C."},
        ],
        "multivitamin": [
            {"name": "Revital H (30 caps)", "price": "299", "unit": "bottle", "change": 1, "source": "MRP", "category": "Medicine", "description": "Revital H daily multivitamin."},
            {"name": "Supradyn Daily (30 tabs)", "price": "199", "unit": "bottle", "change": 0, "source": "MRP", "category": "Medicine", "description": "Supradyn daily multivitamin."},
        ],
        "azithromycin": [{"name": "Azithromycin 500mg (5 tabs)", "price": "85", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Azithromycin antibiotic."}],
        "omeprazole": [{"name": "Omeprazole 20mg (10 caps)", "price": "35", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Omeprazole acid reflux capsule."}],
        "cetirizine": [{"name": "Cetirizine 10mg (10 tabs)", "price": "20", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Cetirizine antiallergic."}],
        "vitamin": [
            {"name": "Vitamin D3 60K IU (4 caps)", "price": "85", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Vitamin D3 supplement."},
            {"name": "Vitamin C 500mg (10 tabs)", "price": "45", "unit": "strip", "change": 0, "source": "MRP", "category": "Medicine", "description": "Vitamin C supplement."},
            {"name": "Revital H (30 caps)", "price": "299", "unit": "bottle", "change": 1, "source": "MRP", "category": "Medicine", "description": "Revital H multivitamin."},
        ],
    }

    for key, items in medicines.items():
        if key in q:
            return items
    return []

def get_grocery_price(query: str):
    q = query.lower()
    groceries = {
        "rice": [
            {"name": "Basmati Rice India Gate (5kg)", "price": "425", "unit": "pack", "change": 1, "source": "Market", "category": "Grocery", "description": "India Gate Classic Basmati Rice 5kg."},
            {"name": "Sona Masoori Rice (5kg)", "price": "275", "unit": "pack", "change": 0, "source": "Agmarknet", "category": "Grocery", "description": "Sona Masoori rice 5kg."},
            {"name": "Kolam Rice (5kg)", "price": "220", "unit": "pack", "change": 0, "source": "Agmarknet", "category": "Grocery", "description": "Kolam rice 5kg."},
        ],
        "dal": [
            {"name": "Toor Dal (1kg)", "price": "130", "unit": "kg", "change": 5, "source": "Agmarknet", "category": "Grocery", "description": "Toor/Arhar dal 1kg."},
            {"name": "Moong Dal (1kg)", "price": "110", "unit": "kg", "change": 3, "source": "Agmarknet", "category": "Grocery", "description": "Moong dal 1kg."},
            {"name": "Chana Dal (1kg)", "price": "90", "unit": "kg", "change": 2, "source": "Agmarknet", "category": "Grocery", "description": "Chana dal 1kg."},
            {"name": "Masoor Dal (1kg)", "price": "95", "unit": "kg", "change": 2, "source": "Agmarknet", "category": "Grocery", "description": "Masoor dal 1kg."},
            {"name": "Urad Dal (1kg)", "price": "120", "unit": "kg", "change": 1, "source": "Agmarknet", "category": "Grocery", "description": "Urad/Black dal 1kg."},
        ],
        "sugar": [
            {"name": "Sugar (1kg)", "price": "42", "unit": "kg", "change": 1, "source": "Agmarknet", "category": "Grocery", "description": "Refined white sugar."},
            {"name": "Sugar (5kg pack)", "price": "205", "unit": "pack", "change": 1, "source": "Market", "category": "Grocery", "description": "Refined sugar 5kg pack."},
        ],
        "oil": [
            {"name": "Dhara Mustard Oil (1L)", "price": "180", "unit": "litre", "change": 2, "source": "Market", "category": "Grocery", "description": "Dhara mustard oil 1 litre."},
            {"name": "Fortune Sunflower Oil (1L)", "price": "140", "unit": "litre", "change": -1, "source": "Market", "category": "Grocery", "description": "Fortune refined sunflower oil."},
            {"name": "Saffola Gold Oil (1L)", "price": "175", "unit": "litre", "change": 0, "source": "Market", "category": "Grocery", "description": "Saffola Gold blended oil."},
            {"name": "Patanjali Groundnut Oil (1L)", "price": "190", "unit": "litre", "change": 1, "source": "Market", "category": "Grocery", "description": "Patanjali groundnut oil."},
        ],
        "atta": [
            {"name": "Aashirvaad Atta (5kg)", "price": "215", "unit": "pack", "change": 0, "source": "Market", "category": "Grocery", "description": "Aashirvaad whole wheat atta 5kg."},
            {"name": "Pilsbury Chakki Fresh Atta (5kg)", "price": "199", "unit": "pack", "change": 0, "source": "Market", "category": "Grocery", "description": "Pilsbury chakki fresh atta 5kg."},
            {"name": "Patanjali Atta (5kg)", "price": "185", "unit": "pack", "change": 0, "source": "Market", "category": "Grocery", "description": "Patanjali wheat atta 5kg."},
        ],
        "milk": [
            {"name": "Amul Gold Full Cream Milk (1L)", "price": "68", "unit": "litre", "change": 0, "source": "Amul", "category": "Grocery", "description": "Amul Gold full cream milk."},
            {"name": "Amul Toned Milk (1L)", "price": "58", "unit": "litre", "change": 0, "source": "Amul", "category": "Grocery", "description": "Amul toned milk 1 litre."},
            {"name": "Mother Dairy Full Cream (1L)", "price": "65", "unit": "litre", "change": 0, "source": "Mother Dairy", "category": "Grocery", "description": "Mother Dairy full cream milk."},
        ],
        "eggs": [
            {"name": "Farm Eggs (12 pcs)", "price": "84", "unit": "dozen", "change": 1, "source": "NECC", "category": "Grocery", "description": "Farm fresh eggs dozen."},
            {"name": "Brown Eggs (6 pcs)", "price": "54", "unit": "pack", "change": 1, "source": "Market", "category": "Grocery", "description": "Brown eggs 6 pack."},
        ],
        "chicken": [
            {"name": "Chicken Broiler (whole)", "price": "180", "unit": "kg", "change": -3, "source": "Market", "category": "Grocery", "description": "Fresh broiler chicken."},
            {"name": "Chicken Breast Boneless", "price": "280", "unit": "kg", "change": -2, "source": "Market", "category": "Grocery", "description": "Boneless chicken breast."},
            {"name": "Chicken Curry Cut", "price": "220", "unit": "kg", "change": -2, "source": "Market", "category": "Grocery", "description": "Chicken curry cut pieces."},
        ],
        "salt": [
            {"name": "Tata Salt (1kg)", "price": "22", "unit": "pack", "change": 0, "source": "Market", "category": "Grocery", "description": "Tata iodized salt 1kg."},
            {"name": "Catch Salt (1kg)", "price": "20", "unit": "pack", "change": 0, "source": "Market", "category": "Grocery", "description": "Catch iodized salt."},
        ],
        "wheat": [
            {"name": "Wheat Grain (1kg)", "price": "32", "unit": "kg", "change": 0, "source": "Agmarknet", "category": "Grocery", "description": "Wheat grain from MP mandis."},
        ],
    }

    for key, items in groceries.items():
        if key in q or q in key:
            return items
    return []

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
    elif category in ["car", "bike"]:
        prices = search_vehicle_price(query)
    elif category == "electronics":
        prices = get_electronics_price(query)
    elif category == "medicine":
        prices = get_medicine_price(query)
    elif category == "grocery":
        prices = get_grocery_price(query)
    else:
        prices = search_agmarknet(query)
        if not prices:
            prices = search_phone_price(query)
        if not prices:
            prices = search_vehicle_price(query)
        if not prices:
            prices = scrape_fuel_prices(query)
        if not prices:
            prices = scrape_metal_prices(query)
        if not prices:
            prices = get_electronics_price(query)
        if not prices:
            prices = get_grocery_price(query)

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