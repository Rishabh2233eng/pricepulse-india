from cache import get_cached, set_cached

CAR_PRICES = {
    "maruti alto k10": {"name": "Maruti Alto K10 VXI", "price": "399000", "source": "Maruti Suzuki"},
    "maruti swift": {"name": "Maruti Swift LXI", "price": "699000", "source": "Maruti Suzuki"},
    "maruti baleno": {"name": "Maruti Baleno Sigma", "price": "669000", "source": "Maruti Suzuki"},
    "maruti brezza": {"name": "Maruti Brezza LXI", "price": "829000", "source": "Maruti Suzuki"},
    "maruti dzire": {"name": "Maruti Dzire LXI", "price": "699000", "source": "Maruti Suzuki"},
    "maruti ertiga": {"name": "Maruti Ertiga VXI", "price": "899000", "source": "Maruti Suzuki"},
    "maruti fronx": {"name": "Maruti Fronx Sigma", "price": "749000", "source": "Maruti Suzuki"},
    "maruti grand vitara": {"name": "Maruti Grand Vitara Sigma", "price": "1099000", "source": "Maruti Suzuki"},
    "tata punch": {"name": "Tata Punch Pure", "price": "599000", "source": "Tata Motors"},
    "tata nexon": {"name": "Tata Nexon Smart", "price": "799000", "source": "Tata Motors"},
    "tata nexon ev": {"name": "Tata Nexon EV Creative", "price": "1399000", "source": "Tata Motors"},
    "tata tiago": {"name": "Tata Tiago XE", "price": "499000", "source": "Tata Motors"},
    "tata tiago ev": {"name": "Tata Tiago EV XE", "price": "849000", "source": "Tata Motors"},
    "tata harrier": {"name": "Tata Harrier Smart", "price": "1499000", "source": "Tata Motors"},
    "tata safari": {"name": "Tata Safari Smart", "price": "1599000", "source": "Tata Motors"},
    "hyundai creta": {"name": "Hyundai Creta E", "price": "1099000", "source": "Hyundai India"},
    "hyundai i20": {"name": "Hyundai i20 Magna", "price": "749000", "source": "Hyundai India"},
    "hyundai venue": {"name": "Hyundai Venue E", "price": "799000", "source": "Hyundai India"},
    "hyundai verna": {"name": "Hyundai Verna EX", "price": "1099000", "source": "Hyundai India"},
    "hyundai tucson": {"name": "Hyundai Tucson Signature", "price": "2799000", "source": "Hyundai India"},
    "honda city": {"name": "Honda City V", "price": "1199000", "source": "Honda India"},
    "honda amaze": {"name": "Honda Amaze E", "price": "799000", "source": "Honda India"},
    "honda elevate": {"name": "Honda Elevate V", "price": "1149000", "source": "Honda India"},
    "kia seltos": {"name": "Kia Seltos HTE", "price": "1099000", "source": "Kia India"},
    "kia sonet": {"name": "Kia Sonet HTE", "price": "799000", "source": "Kia India"},
    "kia carens": {"name": "Kia Carens Premium", "price": "1099000", "source": "Kia India"},
    "mg hector": {"name": "MG Hector Style", "price": "1399000", "source": "MG Motor"},
    "mg astor": {"name": "MG Astor Style", "price": "999000", "source": "MG Motor"},
    "toyota innova": {"name": "Toyota Innova Crysta GX", "price": "1999000", "source": "Toyota India"},
    "toyota fortuner": {"name": "Toyota Fortuner 4x2 AT", "price": "3299000", "source": "Toyota India"},
    "renault kwid": {"name": "Renault Kwid RXE", "price": "460000", "source": "Renault India"},
    "volkswagen taigun": {"name": "VW Taigun Comfortline", "price": "1199000", "source": "VW India"},
    "skoda slavia": {"name": "Skoda Slavia Active", "price": "1099000", "source": "Skoda India"},
}

BIKE_PRICES = {
    "honda activa": {"name": "Honda Activa 6G", "price": "74536", "source": "Honda"},
    "honda shine": {"name": "Honda Shine 100", "price": "64900", "source": "Honda"},
    "honda hornet": {"name": "Honda Hornet 2.0", "price": "134900", "source": "Honda"},
    "tvs jupiter": {"name": "TVS Jupiter 110", "price": "79000", "source": "TVS"},
    "tvs apache 160": {"name": "TVS Apache RTR 160 4V", "price": "121080", "source": "TVS"},
    "tvs apache 200": {"name": "TVS Apache RTR 200 4V", "price": "147900", "source": "TVS"},
    "tvs raider": {"name": "TVS Raider 125", "price": "99000", "source": "TVS"},
    "bajaj pulsar 150": {"name": "Bajaj Pulsar 150", "price": "111000", "source": "Bajaj"},
    "bajaj pulsar 200": {"name": "Bajaj Pulsar NS200", "price": "148930", "source": "Bajaj"},
    "bajaj pulsar n250": {"name": "Bajaj Pulsar N250", "price": "152900", "source": "Bajaj"},
    "bajaj dominar 400": {"name": "Bajaj Dominar 400", "price": "231000", "source": "Bajaj"},
    "bajaj avenger": {"name": "Bajaj Avenger Street 160", "price": "118900", "source": "Bajaj"},
    "hero splendor": {"name": "Hero Splendor Plus", "price": "76500", "source": "Hero MotoCorp"},
    "hero glamour": {"name": "Hero Glamour", "price": "85000", "source": "Hero MotoCorp"},
    "hero xpulse": {"name": "Hero XPulse 200", "price": "141900", "source": "Hero MotoCorp"},
    "royal enfield classic 350": {"name": "Royal Enfield Classic 350", "price": "193079", "source": "Royal Enfield"},
    "royal enfield meteor": {"name": "Royal Enfield Meteor 350", "price": "210000", "source": "Royal Enfield"},
    "royal enfield himalayan": {"name": "Royal Enfield Himalayan 450", "price": "284000", "source": "Royal Enfield"},
    "royal enfield bullet": {"name": "Royal Enfield Bullet 350", "price": "172900", "source": "Royal Enfield"},
    "royal enfield hunter": {"name": "Royal Enfield Hunter 350", "price": "149900", "source": "Royal Enfield"},
    "yamaha r15": {"name": "Yamaha R15 V4", "price": "178900", "source": "Yamaha"},
    "yamaha fz": {"name": "Yamaha FZ-S V4", "price": "132900", "source": "Yamaha"},
    "yamaha mt15": {"name": "Yamaha MT-15 V2", "price": "163900", "source": "Yamaha"},
    "ktm duke 200": {"name": "KTM Duke 200", "price": "196000", "source": "KTM"},
    "ktm duke 390": {"name": "KTM Duke 390", "price": "319000", "source": "KTM"},
    "ktm rc 390": {"name": "KTM RC 390", "price": "329000", "source": "KTM"},
    "suzuki gixxer": {"name": "Suzuki Gixxer 250", "price": "194900", "source": "Suzuki"},
    "bmw g310r": {"name": "BMW G 310 R", "price": "299000", "source": "BMW Motorrad"},
}

def search_vehicle_price(query: str):
    cache_key = "vehicle_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower()
    results = []

    # Search cars
    for key, data in CAR_PRICES.items():
        if any(w in query_lower for w in key.split()) or key in query_lower:
            results.append({
                "name": data["name"],
                "price": data["price"],
                "unit": "piece",
                "change": 1,
                "source": data["source"],
                "category": "Car",
                "description": f"{data['name']} ex-showroom price Delhi."
            })

    # Search bikes
    for key, data in BIKE_PRICES.items():
        if any(w in query_lower for w in key.split()) or key in query_lower:
            results.append({
                "name": data["name"],
                "price": data["price"],
                "unit": "piece",
                "change": 1,
                "source": data["source"],
                "category": "Bike",
                "description": f"{data['name']} ex-showroom price Delhi."
            })

    results = results[:6]
    if results:
        set_cached(cache_key, results)
    return results