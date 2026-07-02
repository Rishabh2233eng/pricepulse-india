from cache import get_cached, set_cached

CAR_PRICES = {
    "maruti alto k10": [{"name": "Maruti Alto K10 VXI", "price": "399000", "unit": "piece", "change": 0, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Alto K10 VXI ex-showroom Delhi."}],
    "maruti alto": [{"name": "Maruti Alto K10 LXI", "price": "349000", "unit": "piece", "change": 0, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Alto K10 base variant."}],
    "maruti swift": [
        {"name": "Maruti Swift LXI", "price": "699000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Swift LXI ex-showroom Delhi."},
        {"name": "Maruti Swift VXI", "price": "769000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Swift VXI ex-showroom Delhi."},
        {"name": "Maruti Swift ZXI", "price": "869000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Swift ZXI ex-showroom Delhi."},
    ],
    "maruti baleno": [
        {"name": "Maruti Baleno Sigma", "price": "669000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Baleno Sigma ex-showroom."},
        {"name": "Maruti Baleno Delta", "price": "739000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Baleno Delta ex-showroom."},
    ],
    "maruti brezza": [
        {"name": "Maruti Brezza LXI", "price": "829000", "unit": "piece", "change": 2, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Brezza LXI ex-showroom."},
        {"name": "Maruti Brezza VXI", "price": "1099000", "unit": "piece", "change": 2, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Brezza VXI ex-showroom."},
    ],
    "maruti dzire": [
        {"name": "Maruti Dzire LXI", "price": "699000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Dzire LXI ex-showroom."},
        {"name": "Maruti Dzire VXI", "price": "779000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Dzire VXI ex-showroom."},
    ],
    "maruti ertiga": [
        {"name": "Maruti Ertiga VXI", "price": "899000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Ertiga VXI 7 seater."},
    ],
    "maruti fronx": [{"name": "Maruti Fronx Sigma", "price": "749000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Fronx Sigma ex-showroom."}],
    "maruti grand vitara": [{"name": "Maruti Grand Vitara Sigma", "price": "1099000", "unit": "piece", "change": 1, "source": "Maruti Suzuki", "category": "Car", "description": "Maruti Grand Vitara Sigma."}],
    "tata punch": [
        {"name": "Tata Punch Pure", "price": "599000", "unit": "piece", "change": 0, "source": "Tata Motors", "category": "Car", "description": "Tata Punch Pure petrol ex-showroom."},
        {"name": "Tata Punch Adventure", "price": "769000", "unit": "piece", "change": 0, "source": "Tata Motors", "category": "Car", "description": "Tata Punch Adventure ex-showroom."},
    ],
    "tata nexon ev": [
        {"name": "Tata Nexon EV Creative", "price": "1399000", "unit": "piece", "change": -1, "source": "Tata Motors", "category": "Car", "description": "Tata Nexon EV Creative ex-showroom."},
        {"name": "Tata Nexon EV Fearless+", "price": "1899000", "unit": "piece", "change": -1, "source": "Tata Motors", "category": "Car", "description": "Tata Nexon EV Fearless+ long range."},
    ],
    "tata nexon": [
        {"name": "Tata Nexon Smart", "price": "799000", "unit": "piece", "change": 1, "source": "Tata Motors", "category": "Car", "description": "Tata Nexon Smart petrol ex-showroom."},
        {"name": "Tata Nexon Smart+", "price": "949000", "unit": "piece", "change": 1, "source": "Tata Motors", "category": "Car", "description": "Tata Nexon Smart+ petrol."},
        {"name": "Tata Nexon Creative", "price": "1199000", "unit": "piece", "change": 1, "source": "Tata Motors", "category": "Car", "description": "Tata Nexon Creative petrol."},
    ],
    "tata tiago": [
        {"name": "Tata Tiago XE", "price": "499000", "unit": "piece", "change": 0, "source": "Tata Motors", "category": "Car", "description": "Tata Tiago XE base variant."},
        {"name": "Tata Tiago XZ+", "price": "729000", "unit": "piece", "change": 0, "source": "Tata Motors", "category": "Car", "description": "Tata Tiago XZ+ top variant."},
    ],
    "tata harrier": [
        {"name": "Tata Harrier Smart", "price": "1499000", "unit": "piece", "change": 1, "source": "Tata Motors", "category": "Car", "description": "Tata Harrier Smart ex-showroom."},
        {"name": "Tata Harrier Adventure", "price": "1899000", "unit": "piece", "change": 1, "source": "Tata Motors", "category": "Car", "description": "Tata Harrier Adventure ex-showroom."},
    ],
    "tata safari": [
        {"name": "Tata Safari Smart", "price": "1599000", "unit": "piece", "change": 1, "source": "Tata Motors", "category": "Car", "description": "Tata Safari Smart 7 seater."},
        {"name": "Tata Safari Adventure", "price": "1999000", "unit": "piece", "change": 1, "source": "Tata Motors", "category": "Car", "description": "Tata Safari Adventure ex-showroom."},
    ],
    "hyundai creta": [
        {"name": "Hyundai Creta E", "price": "1099000", "unit": "piece", "change": 2, "source": "Hyundai India", "category": "Car", "description": "Hyundai Creta E petrol ex-showroom."},
        {"name": "Hyundai Creta S", "price": "1349000", "unit": "piece", "change": 2, "source": "Hyundai India", "category": "Car", "description": "Hyundai Creta S petrol."},
        {"name": "Hyundai Creta SX", "price": "1649000", "unit": "piece", "change": 2, "source": "Hyundai India", "category": "Car", "description": "Hyundai Creta SX top variant."},
    ],
    "hyundai i20": [
        {"name": "Hyundai i20 Magna", "price": "749000", "unit": "piece", "change": 1, "source": "Hyundai India", "category": "Car", "description": "Hyundai i20 Magna ex-showroom."},
        {"name": "Hyundai i20 Sportz", "price": "949000", "unit": "piece", "change": 1, "source": "Hyundai India", "category": "Car", "description": "Hyundai i20 Sportz ex-showroom."},
    ],
    "hyundai venue": [
        {"name": "Hyundai Venue E", "price": "799000", "unit": "piece", "change": 1, "source": "Hyundai India", "category": "Car", "description": "Hyundai Venue E ex-showroom."},
        {"name": "Hyundai Venue S", "price": "999000", "unit": "piece", "change": 1, "source": "Hyundai India", "category": "Car", "description": "Hyundai Venue S ex-showroom."},
    ],
    "hyundai verna": [
        {"name": "Hyundai Verna EX", "price": "1099000", "unit": "piece", "change": 1, "source": "Hyundai India", "category": "Car", "description": "Hyundai Verna EX ex-showroom."},
        {"name": "Hyundai Verna S", "price": "1399000", "unit": "piece", "change": 1, "source": "Hyundai India", "category": "Car", "description": "Hyundai Verna S ex-showroom."},
    ],
    "honda city": [
        {"name": "Honda City V", "price": "1199000", "unit": "piece", "change": 1, "source": "Honda India", "category": "Car", "description": "Honda City V petrol ex-showroom."},
        {"name": "Honda City VX", "price": "1399000", "unit": "piece", "change": 1, "source": "Honda India", "category": "Car", "description": "Honda City VX petrol ex-showroom."},
    ],
    "honda amaze": [{"name": "Honda Amaze E", "price": "799000", "unit": "piece", "change": 1, "source": "Honda India", "category": "Car", "description": "Honda Amaze E ex-showroom."}],
    "honda elevate": [{"name": "Honda Elevate V", "price": "1149000", "unit": "piece", "change": 1, "source": "Honda India", "category": "Car", "description": "Honda Elevate V ex-showroom."}],
    "kia seltos": [
        {"name": "Kia Seltos HTE", "price": "1099000", "unit": "piece", "change": 1, "source": "Kia India", "category": "Car", "description": "Kia Seltos HTE ex-showroom."},
        {"name": "Kia Seltos HTK+", "price": "1399000", "unit": "piece", "change": 1, "source": "Kia India", "category": "Car", "description": "Kia Seltos HTK+ ex-showroom."},
    ],
    "kia sonet": [
        {"name": "Kia Sonet HTE", "price": "799000", "unit": "piece", "change": 1, "source": "Kia India", "category": "Car", "description": "Kia Sonet HTE ex-showroom."},
        {"name": "Kia Sonet HTK+", "price": "1099000", "unit": "piece", "change": 1, "source": "Kia India", "category": "Car", "description": "Kia Sonet HTK+ ex-showroom."},
    ],
    "mg hector": [{"name": "MG Hector Style", "price": "1399000", "unit": "piece", "change": 1, "source": "MG Motor", "category": "Car", "description": "MG Hector Style petrol ex-showroom."}],
    "toyota innova": [{"name": "Toyota Innova Crysta GX", "price": "1999000", "unit": "piece", "change": 1, "source": "Toyota India", "category": "Car", "description": "Toyota Innova Crysta GX ex-showroom."}],
    "toyota fortuner": [{"name": "Toyota Fortuner 4x2 AT", "price": "3299000", "unit": "piece", "change": 2, "source": "Toyota India", "category": "Car", "description": "Toyota Fortuner 4x2 AT ex-showroom."}],
    "volkswagen taigun": [{"name": "VW Taigun Comfortline", "price": "1199000", "unit": "piece", "change": 1, "source": "VW India", "category": "Car", "description": "Volkswagen Taigun Comfortline ex-showroom."}],
    "skoda slavia": [{"name": "Skoda Slavia Active", "price": "1099000", "unit": "piece", "change": 1, "source": "Skoda India", "category": "Car", "description": "Skoda Slavia Active ex-showroom."}],
    "renault kwid": [{"name": "Renault Kwid RXE", "price": "460000", "unit": "piece", "change": 0, "source": "Renault India", "category": "Car", "description": "Renault Kwid RXE ex-showroom."}],
    "mahindra thar": [
        {"name": "Mahindra Thar RWD AX(O)", "price": "1399000", "unit": "piece", "change": 2, "source": "Mahindra", "category": "Car", "description": "Mahindra Thar RWD petrol ex-showroom."},
        {"name": "Mahindra Thar 4WD LX", "price": "1699000", "unit": "piece", "change": 2, "source": "Mahindra", "category": "Car", "description": "Mahindra Thar 4WD LX ex-showroom."},
    ],
    "mahindra scorpio": [
        {"name": "Mahindra Scorpio N Z2", "price": "1349000", "unit": "piece", "change": 1, "source": "Mahindra", "category": "Car", "description": "Mahindra Scorpio N Z2 ex-showroom."},
    ],
    "mahindra xuv700": [
        {"name": "Mahindra XUV700 MX", "price": "1399000", "unit": "piece", "change": 1, "source": "Mahindra", "category": "Car", "description": "Mahindra XUV700 MX ex-showroom."},
        {"name": "Mahindra XUV700 AX5", "price": "1799000", "unit": "piece", "change": 1, "source": "Mahindra", "category": "Car", "description": "Mahindra XUV700 AX5 ex-showroom."},
    ],
}

BIKE_PRICES = {
    "honda activa 6g": [{"name": "Honda Activa 6G", "price": "74536", "unit": "piece", "change": 1, "source": "Honda", "category": "Bike", "description": "Honda Activa 6G scooter ex-showroom Delhi."}],
    "honda activa": [
        {"name": "Honda Activa 6G", "price": "74536", "unit": "piece", "change": 1, "source": "Honda", "category": "Bike", "description": "Honda Activa 6G ex-showroom Delhi."},
        {"name": "Honda Activa 125", "price": "87384", "unit": "piece", "change": 1, "source": "Honda", "category": "Bike", "description": "Honda Activa 125 premium scooter."},
    ],
    "honda shine": [{"name": "Honda Shine 100", "price": "64900", "unit": "piece", "change": 0, "source": "Honda", "category": "Bike", "description": "Honda Shine 100 ex-showroom Delhi."}],
    "honda hornet": [{"name": "Honda Hornet 2.0", "price": "134900", "unit": "piece", "change": 1, "source": "Honda", "category": "Bike", "description": "Honda Hornet 2.0 ex-showroom Delhi."}],
    "tvs jupiter": [{"name": "TVS Jupiter 110", "price": "79000", "unit": "piece", "change": 0, "source": "TVS", "category": "Bike", "description": "TVS Jupiter 110 scooter ex-showroom."}],
    "tvs apache 160": [{"name": "TVS Apache RTR 160 4V", "price": "121080", "unit": "piece", "change": 0, "source": "TVS", "category": "Bike", "description": "TVS Apache RTR 160 4V ex-showroom."}],
    "tvs apache 200": [{"name": "TVS Apache RTR 200 4V", "price": "147900", "unit": "piece", "change": 1, "source": "TVS", "category": "Bike", "description": "TVS Apache RTR 200 4V ex-showroom."}],
    "tvs ntorq": [{"name": "TVS NTORQ 125", "price": "99600", "unit": "piece", "change": 0, "source": "TVS", "category": "Bike", "description": "TVS NTORQ 125 Race XP scooter."}],
    "tvs raider": [{"name": "TVS Raider 125", "price": "99000", "unit": "piece", "change": 0, "source": "TVS", "category": "Bike", "description": "TVS Raider 125 ex-showroom."}],
    "bajaj pulsar 150": [{"name": "Bajaj Pulsar 150", "price": "111000", "unit": "piece", "change": 1, "source": "Bajaj", "category": "Bike", "description": "Bajaj Pulsar 150 ex-showroom Delhi."}],
    "bajaj pulsar 200": [{"name": "Bajaj Pulsar NS200", "price": "148930", "unit": "piece", "change": 1, "source": "Bajaj", "category": "Bike", "description": "Bajaj Pulsar NS200 ex-showroom."}],
    "bajaj pulsar n250": [{"name": "Bajaj Pulsar N250", "price": "152900", "unit": "piece", "change": 1, "source": "Bajaj", "category": "Bike", "description": "Bajaj Pulsar N250 ex-showroom."}],
    "bajaj dominar 400": [{"name": "Bajaj Dominar 400", "price": "231000", "unit": "piece", "change": 1, "source": "Bajaj", "category": "Bike", "description": "Bajaj Dominar 400 ex-showroom."}],
    "bajaj avenger": [{"name": "Bajaj Avenger Street 160", "price": "118900", "unit": "piece", "change": 0, "source": "Bajaj", "category": "Bike", "description": "Bajaj Avenger Street 160 ex-showroom."}],
    "hero splendor": [
        {"name": "Hero Splendor Plus", "price": "76500", "unit": "piece", "change": 1, "source": "Hero MotoCorp", "category": "Bike", "description": "Hero Splendor Plus ex-showroom Delhi."},
        {"name": "Hero Splendor+ XTEC", "price": "82000", "unit": "piece", "change": 1, "source": "Hero MotoCorp", "category": "Bike", "description": "Hero Splendor+ XTEC ex-showroom."},
    ],
    "hero glamour": [{"name": "Hero Glamour", "price": "85000", "unit": "piece", "change": 0, "source": "Hero MotoCorp", "category": "Bike", "description": "Hero Glamour ex-showroom Delhi."}],
    "hero xpulse": [{"name": "Hero XPulse 200", "price": "141900", "unit": "piece", "change": 1, "source": "Hero MotoCorp", "category": "Bike", "description": "Hero XPulse 200 adventure bike."}],
    "royal enfield classic 350": [
        {"name": "Royal Enfield Classic 350 Redditch", "price": "193079", "unit": "piece", "change": 2, "source": "Royal Enfield", "category": "Bike", "description": "RE Classic 350 Redditch ex-showroom Delhi."},
        {"name": "Royal Enfield Classic 350 Halcyon", "price": "210000", "unit": "piece", "change": 2, "source": "Royal Enfield", "category": "Bike", "description": "RE Classic 350 Halcyon ex-showroom."},
    ],
    "royal enfield meteor": [
        {"name": "Royal Enfield Meteor 350 Fireball", "price": "210000", "unit": "piece", "change": 2, "source": "Royal Enfield", "category": "Bike", "description": "RE Meteor 350 Fireball ex-showroom."},
    ],
    "royal enfield himalayan": [
        {"name": "Royal Enfield Himalayan 450", "price": "284000", "unit": "piece", "change": 1, "source": "Royal Enfield", "category": "Bike", "description": "RE Himalayan 450 adventure tourer."},
    ],
    "royal enfield bullet": [{"name": "Royal Enfield Bullet 350", "price": "172900", "unit": "piece", "change": 2, "source": "Royal Enfield", "category": "Bike", "description": "RE Bullet 350 ex-showroom Delhi."}],
    "royal enfield hunter": [{"name": "Royal Enfield Hunter 350", "price": "149900", "unit": "piece", "change": 1, "source": "Royal Enfield", "category": "Bike", "description": "RE Hunter 350 ex-showroom Delhi."}],
    "royal enfield": [
        {"name": "Royal Enfield Hunter 350", "price": "149900", "unit": "piece", "change": 1, "source": "Royal Enfield", "category": "Bike", "description": "RE Hunter 350 ex-showroom Delhi."},
        {"name": "Royal Enfield Classic 350", "price": "193079", "unit": "piece", "change": 2, "source": "Royal Enfield", "category": "Bike", "description": "RE Classic 350 ex-showroom Delhi."},
        {"name": "Royal Enfield Meteor 350", "price": "210000", "unit": "piece", "change": 2, "source": "Royal Enfield", "category": "Bike", "description": "RE Meteor 350 ex-showroom."},
        {"name": "Royal Enfield Himalayan 450", "price": "284000", "unit": "piece", "change": 1, "source": "Royal Enfield", "category": "Bike", "description": "RE Himalayan 450 adventure."},
    ],
    "yamaha r15": [{"name": "Yamaha R15 V4 MotoGP Edition", "price": "178900", "unit": "piece", "change": 1, "source": "Yamaha", "category": "Bike", "description": "Yamaha R15 V4 ex-showroom."}],
    "yamaha fz": [{"name": "Yamaha FZ-S V4 FI", "price": "132900", "unit": "piece", "change": 1, "source": "Yamaha", "category": "Bike", "description": "Yamaha FZ-S V4 ex-showroom."}],
    "yamaha mt15": [{"name": "Yamaha MT-15 V2", "price": "163900", "unit": "piece", "change": 1, "source": "Yamaha", "category": "Bike", "description": "Yamaha MT-15 V2 ex-showroom."}],
    "ktm duke 200": [{"name": "KTM Duke 200", "price": "196000", "unit": "piece", "change": 2, "source": "KTM", "category": "Bike", "description": "KTM Duke 200 ex-showroom Delhi."}],
    "ktm duke 390": [{"name": "KTM Duke 390", "price": "319000", "unit": "piece", "change": 2, "source": "KTM", "category": "Bike", "description": "KTM Duke 390 ex-showroom Delhi."}],
    "ktm rc 390": [{"name": "KTM RC 390", "price": "329000", "unit": "piece", "change": 2, "source": "KTM", "category": "Bike", "description": "KTM RC 390 supersport ex-showroom."}],
    "suzuki gixxer": [{"name": "Suzuki Gixxer 250", "price": "194900", "unit": "piece", "change": 1, "source": "Suzuki", "category": "Bike", "description": "Suzuki Gixxer 250 ex-showroom."}],
    "bmw g310r": [{"name": "BMW G 310 R", "price": "299000", "unit": "piece", "change": 1, "source": "BMW Motorrad", "category": "Bike", "description": "BMW G 310 R ex-showroom Delhi."}],
    "triumph speed 400": [{"name": "Triumph Speed 400", "price": "239000", "unit": "piece", "change": 1, "source": "Triumph India", "category": "Bike", "description": "Triumph Speed 400 ex-showroom."}],
    "harley davidson x440": [{"name": "Harley-Davidson X440 S", "price": "239000", "unit": "piece", "change": 1, "source": "Harley-Davidson", "category": "Bike", "description": "Harley-Davidson X440 S ex-showroom."}],
}

def search_vehicle_price(query: str):
    cache_key = "vehicle_" + query.lower().replace(" ", "_")
    cached = get_cached(cache_key)
    if cached:
        return cached

    query_lower = query.lower().strip()
    results = []

    # Search cars - exact match first
    for key, items in CAR_PRICES.items():
        if key == query_lower or key in query_lower or query_lower in key:
            results.extend(items)

    # Search bikes
    for key, items in BIKE_PRICES.items():
        if key == query_lower or key in query_lower or query_lower in key:
            results.extend(items)

    # Word-based match if no results
    if not results:
        query_words = set(query_lower.split())
        for key, items in {**CAR_PRICES, **BIKE_PRICES}.items():
            key_words = set(key.split())
            if len(query_words & key_words) >= 2:
                results.extend(items)

    # Remove duplicates
    seen = set()
    unique = []
    for r in results:
        if r["name"] not in seen:
            seen.add(r["name"])
            unique.append(r)

    unique = unique[:6]
    if unique:
        set_cached(cache_key, unique)
    return unique