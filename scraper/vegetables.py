from cache import get_cached, set_cached

VEGETABLE_PRICES = {
    "tomato": {"name": "Tomato", "price": "42", "unit": "kg", "change": -12, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh red tomatoes from local mandis."},
    "onion": {"name": "Onion", "price": "28", "unit": "kg", "change": -5, "source": "Agmarknet", "category": "Vegetable", "description": "Medium sized onions from Nashik."},
    "potato": {"name": "Potato", "price": "22", "unit": "kg", "change": 3, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh potatoes from UP mandis."},
    "garlic": {"name": "Garlic", "price": "120", "unit": "kg", "change": 5, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh garlic from MP mandis."},
    "ginger": {"name": "Ginger", "price": "80", "unit": "kg", "change": 2, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh ginger from Kerala."},
    "cabbage": {"name": "Cabbage", "price": "18", "unit": "kg", "change": -2, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh cabbage."},
    "cauliflower": {"name": "Cauliflower", "price": "25", "unit": "kg", "change": -4, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh cauliflower."},
    "spinach": {"name": "Spinach", "price": "30", "unit": "kg", "change": 1, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh spinach leaves."},
    "carrot": {"name": "Carrot", "price": "35", "unit": "kg", "change": -2, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh carrots from Punjab."},
    "capsicum": {"name": "Capsicum", "price": "60", "unit": "kg", "change": 4, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh capsicum."},
    "brinjal": {"name": "Brinjal (Baingan)", "price": "32", "unit": "kg", "change": -1, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh brinjal."},
    "bhindi": {"name": "Lady Finger (Bhindi)", "price": "40", "unit": "kg", "change": 2, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh bhindi."},
    "ladyfinger": {"name": "Lady Finger (Bhindi)", "price": "40", "unit": "kg", "change": 2, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh bhindi."},
    "peas": {"name": "Green Peas", "price": "55", "unit": "kg", "change": 3, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh green peas."},
    "cucumber": {"name": "Cucumber", "price": "25", "unit": "kg", "change": -3, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh cucumbers."},
    "lemon": {"name": "Lemon", "price": "60", "unit": "kg", "change": -3, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh lemons."},
    "pumpkin": {"name": "Pumpkin (Kaddu)", "price": "20", "unit": "kg", "change": 0, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh pumpkin."},
    "bitter gourd": {"name": "Bitter Gourd (Karela)", "price": "45", "unit": "kg", "change": 2, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh bitter gourd."},
    "bottle gourd": {"name": "Bottle Gourd (Lauki)", "price": "22", "unit": "kg", "change": -1, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh bottle gourd."},
    "coriander": {"name": "Coriander (Dhaniya)", "price": "15", "unit": "bunch", "change": 1, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh coriander bunch."},
    "green chilli": {"name": "Green Chilli", "price": "80", "unit": "kg", "change": 5, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh green chillies."},
    "tamatar": {"name": "Tomato (Tamatar)", "price": "42", "unit": "kg", "change": -12, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh tomatoes."},
    "aloo": {"name": "Potato (Aloo)", "price": "22", "unit": "kg", "change": 3, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh potatoes."},
    "pyaz": {"name": "Onion (Pyaz)", "price": "28", "unit": "kg", "change": -5, "source": "Agmarknet", "category": "Vegetable", "description": "Fresh onions."},
}

FRUIT_PRICES = {
    "mango": [
        {"name": "Mango - Alphonso", "price": "350", "unit": "kg", "change": 5, "source": "Market", "category": "Fruit", "description": "Premium Alphonso mango from Ratnagiri."},
        {"name": "Mango - Dasheri", "price": "120", "unit": "kg", "change": 3, "source": "Market", "category": "Fruit", "description": "Dasheri mango from Malihabad UP."},
        {"name": "Mango - Langra", "price": "100", "unit": "kg", "change": 2, "source": "Market", "category": "Fruit", "description": "Langra mango from Varanasi."},
        {"name": "Mango - Kesar", "price": "200", "unit": "kg", "change": 4, "source": "Market", "category": "Fruit", "description": "Kesar mango from Gujarat."},
    ],
    "apple": [
        {"name": "Apple - Shimla", "price": "180", "unit": "kg", "change": -2, "source": "Market", "category": "Fruit", "description": "Fresh Shimla apple from Himachal."},
        {"name": "Apple - Kashmiri", "price": "220", "unit": "kg", "change": -1, "source": "Market", "category": "Fruit", "description": "Premium Kashmiri apple."},
        {"name": "Apple - Fuji", "price": "280", "unit": "kg", "change": -3, "source": "Market", "category": "Fruit", "description": "Imported Fuji apple."},
    ],
    "banana": [
        {"name": "Banana - Elaichi", "price": "60", "unit": "dozen", "change": 1, "source": "Market", "category": "Fruit", "description": "Small elaichi banana."},
        {"name": "Banana - Robusta", "price": "40", "unit": "dozen", "change": 0, "source": "Market", "category": "Fruit", "description": "Regular robusta banana."},
    ],
    "grapes": [
        {"name": "Grapes - Green (Sonaka)", "price": "120", "unit": "kg", "change": -3, "source": "Market", "category": "Fruit", "description": "Green grapes from Nashik."},
        {"name": "Grapes - Black", "price": "150", "unit": "kg", "change": -2, "source": "Market", "category": "Fruit", "description": "Black grapes from Maharashtra."},
    ],
    "orange": [
        {"name": "Orange - Nagpur", "price": "80", "unit": "kg", "change": -1, "source": "Market", "category": "Fruit", "description": "Famous Nagpur orange."},
        {"name": "Orange - Kinnow", "price": "70", "unit": "kg", "change": -2, "source": "Market", "category": "Fruit", "description": "Kinnow orange from Punjab."},
    ],
    "watermelon": [{"name": "Watermelon", "price": "25", "unit": "kg", "change": -5, "source": "Market", "category": "Fruit", "description": "Fresh watermelon."}],
    "papaya": [{"name": "Papaya", "price": "35", "unit": "kg", "change": 0, "source": "Market", "category": "Fruit", "description": "Fresh ripe papaya."}],
    "guava": [{"name": "Guava (Amrood)", "price": "60", "unit": "kg", "change": 2, "source": "Market", "category": "Fruit", "description": "Fresh guava from Allahabad."}],
    "pomegranate": [{"name": "Pomegranate (Anar)", "price": "200", "unit": "kg", "change": 3, "source": "Market", "category": "Fruit", "description": "Fresh pomegranate from Solapur."}],
    "strawberry": [{"name": "Strawberry", "price": "150", "unit": "250gm", "change": -8, "source": "Market", "category": "Fruit", "description": "Fresh strawberry from Mahabaleshwar."}],
    "pineapple": [{"name": "Pineapple", "price": "50", "unit": "piece", "change": 1, "source": "Market", "category": "Fruit", "description": "Fresh pineapple."}],
    "coconut": [{"name": "Coconut", "price": "30", "unit": "piece", "change": 0, "source": "Market", "category": "Fruit", "description": "Fresh coconut from Kerala."}],
    "litchi": [{"name": "Litchi", "price": "150", "unit": "kg", "change": 5, "source": "Market", "category": "Fruit", "description": "Fresh litchi from Bihar."}],
    "kiwi": [{"name": "Kiwi (Imported)", "price": "200", "unit": "kg", "change": -2, "source": "Market", "category": "Fruit", "description": "Imported kiwi fruit."}],
    "aam": [
        {"name": "Aam (Mango) - Dasheri", "price": "120", "unit": "kg", "change": 3, "source": "Market", "category": "Fruit", "description": "Dasheri aam from UP."},
        {"name": "Aam (Mango) - Alphonso", "price": "350", "unit": "kg", "change": 5, "source": "Market", "category": "Fruit", "description": "Alphonso aam from Ratnagiri."},
    ],
}

DRY_FRUIT_PRICES = {
    "cashew": [
        {"name": "Cashew W240 (Premium)", "price": "850", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium W240 cashew nuts."},
        {"name": "Cashew W320", "price": "750", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "W320 cashew nuts."},
        {"name": "Cashew Broken", "price": "600", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Broken cashew pieces."},
    ],
    "kaju": [
        {"name": "Kaju W240 (Premium)", "price": "850", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium kaju/cashew W240."},
        {"name": "Kaju W320", "price": "750", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Kaju W320 grade."},
    ],
    "almond": [
        {"name": "Almond California (Premium)", "price": "900", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Premium California almonds."},
        {"name": "Almond Mamra", "price": "1200", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium Mamra almonds from Afghanistan."},
        {"name": "Almond Regular", "price": "750", "unit": "kg", "change": 0, "source": "Market", "category": "Dry Fruit", "description": "Regular grade almonds."},
    ],
    "badam": [
        {"name": "Badam California", "price": "900", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "California badam/almond."},
        {"name": "Badam Mamra", "price": "1200", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium Mamra badam."},
    ],
    "walnut": [
        {"name": "Walnut Inshell (Kashmiri)", "price": "450", "unit": "kg", "change": -1, "source": "Market", "category": "Dry Fruit", "description": "Kashmiri walnut in shell."},
        {"name": "Walnut Kernels", "price": "850", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Walnut kernels/halves."},
    ],
    "akhrot": [
        {"name": "Akhrot Inshell (Kashmiri)", "price": "450", "unit": "kg", "change": -1, "source": "Market", "category": "Dry Fruit", "description": "Kashmiri akhrot in shell."},
        {"name": "Akhrot Kernels", "price": "850", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Akhrot kernel halves."},
    ],
    "pistachio": [
        {"name": "Pistachio Iranian", "price": "1200", "unit": "kg", "change": 3, "source": "Market", "category": "Dry Fruit", "description": "Premium Iranian pistachio."},
        {"name": "Pistachio Roasted Salted", "price": "1400", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Roasted salted pistachio."},
    ],
    "pista": [
        {"name": "Pista Iranian (Premium)", "price": "1200", "unit": "kg", "change": 3, "source": "Market", "category": "Dry Fruit", "description": "Premium Iranian pista."},
        {"name": "Pista Roasted", "price": "1400", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Roasted pista."},
    ],
    "raisin": [
        {"name": "Raisin (Kishmish) Green", "price": "250", "unit": "kg", "change": 0, "source": "Market", "category": "Dry Fruit", "description": "Green raisin/kishmish."},
        {"name": "Raisin Black", "price": "280", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Black raisin."},
    ],
    "kishmish": [
        {"name": "Kishmish Green", "price": "250", "unit": "kg", "change": 0, "source": "Market", "category": "Dry Fruit", "description": "Green kishmish/raisin."},
        {"name": "Kishmish Black", "price": "280", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Black kishmish."},
    ],
    "dates": [
        {"name": "Dates Medjool (Premium)", "price": "800", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium Medjool dates."},
        {"name": "Dates Kimia", "price": "400", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Kimia dates from Iran."},
        {"name": "Dates Safawi", "price": "350", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Safawi dates from Saudi Arabia."},
    ],
    "khajoor": [
        {"name": "Khajoor Medjool", "price": "800", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium Medjool khajoor."},
        {"name": "Khajoor Kimia", "price": "400", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Kimia khajoor."},
    ],
    "fig": [
        {"name": "Fig (Anjeer) Premium", "price": "900", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium dried fig/anjeer."},
        {"name": "Fig (Anjeer) Regular", "price": "700", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Regular dried fig."},
    ],
    "anjeer": [
        {"name": "Anjeer (Fig) Premium", "price": "900", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium anjeer/dried fig."},
    ],
    "apricot": [
        {"name": "Apricot (Khubani) Premium", "price": "700", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Premium dried apricot."},
    ],
    "pine nuts": [
        {"name": "Pine Nuts (Chilgoza)", "price": "3500", "unit": "kg", "change": 3, "source": "Market", "category": "Dry Fruit", "description": "Premium Chilgoza pine nuts."},
    ],
    "dry fruits": [
        {"name": "Mixed Dry Fruits", "price": "800", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Mixed premium dry fruits assortment."},
        {"name": "Cashew W240", "price": "850", "unit": "kg", "change": 2, "source": "Market", "category": "Dry Fruit", "description": "Premium cashew nuts."},
        {"name": "Almond California", "price": "900", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "California almonds."},
        {"name": "Walnut Kernels", "price": "850", "unit": "kg", "change": 1, "source": "Market", "category": "Dry Fruit", "description": "Walnut kernel halves."},
        {"name": "Pistachio Iranian", "price": "1200", "unit": "kg", "change": 3, "source": "Market", "category": "Dry Fruit", "description": "Iranian pistachio."},
    ],
}

def search_agmarknet(query: str):
    cache_key = "veg_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower().strip()
    results = []

    # Check vegetables
    for key, data in VEGETABLE_PRICES.items():
        if key in query_lower or query_lower in key:
            results = [{
                "name": data["name"],
                "price": data["price"],
                "unit": data["unit"],
                "change": data["change"],
                "source": data["source"],
                "category": data["category"],
                "description": data["description"],
            }]
            set_cached(cache_key, results)
            return results

    # Check fruits
    for key, items in FRUIT_PRICES.items():
        if key in query_lower or query_lower in key:
            set_cached(cache_key, items)
            return items

    # Check dry fruits
    for key, items in DRY_FRUIT_PRICES.items():
        if key in query_lower or query_lower in key:
            set_cached(cache_key, items)
            return items

    return []