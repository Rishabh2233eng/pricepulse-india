import { NextRequest, NextResponse } from "next/server";

const allProducts: Record<string, any[]> = {
  // Vegetables
  tomato: [{ name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh red tomatoes from local mandis." }],
  onion: [{ name: "Onion", price: "28", unit: "kg", change: -5, source: "Agmarknet", category: "Vegetable", description: "Medium sized onions from Nashik." }],
  potato: [{ name: "Potato", price: "22", unit: "kg", change: 3, source: "Agmarknet", category: "Vegetable", description: "Fresh potatoes from UP mandis." }],
  garlic: [{ name: "Garlic", price: "120", unit: "kg", change: 5, source: "Agmarknet", category: "Vegetable", description: "Fresh garlic from MP mandis." }],
  ginger: [{ name: "Ginger", price: "80", unit: "kg", change: 2, source: "Agmarknet", category: "Vegetable", description: "Fresh ginger from Kerala." }],
  lemon: [{ name: "Lemon", price: "60", unit: "kg", change: -3, source: "Agmarknet", category: "Vegetable", description: "Fresh lemons from Andhra Pradesh." }],
  cabbage: [{ name: "Cabbage", price: "18", unit: "kg", change: -2, source: "Agmarknet", category: "Vegetable", description: "Fresh cabbage." }],
  cauliflower: [{ name: "Cauliflower", price: "25", unit: "kg", change: -4, source: "Agmarknet", category: "Vegetable", description: "Fresh cauliflower." }],
  spinach: [{ name: "Spinach", price: "30", unit: "kg", change: 1, source: "Agmarknet", category: "Vegetable", description: "Fresh spinach leaves." }],
  carrot: [{ name: "Carrot", price: "35", unit: "kg", change: -2, source: "Agmarknet", category: "Vegetable", description: "Fresh carrots from Punjab." }],
  peas: [{ name: "Green Peas", price: "55", unit: "kg", change: 3, source: "Agmarknet", category: "Vegetable", description: "Fresh green peas." }],
  brinjal: [{ name: "Brinjal", price: "32", unit: "kg", change: -1, source: "Agmarknet", category: "Vegetable", description: "Fresh brinjal/eggplant." }],
  ladyfinger: [{ name: "Lady Finger (Bhindi)", price: "40", unit: "kg", change: 2, source: "Agmarknet", category: "Vegetable", description: "Fresh bhindi." }],
  cucumber: [{ name: "Cucumber", price: "25", unit: "kg", change: -3, source: "Agmarknet", category: "Vegetable", description: "Fresh cucumbers." }],
  capsicum: [{ name: "Capsicum", price: "60", unit: "kg", change: 4, source: "Agmarknet", category: "Vegetable", description: "Fresh capsicum." }],

  // Grocery
  rice: [
    { name: "Basmati Rice", price: "85", unit: "kg", change: 1, source: "Agmarknet", category: "Grocery", description: "Premium basmati rice from Punjab." },
    { name: "Sona Masoori Rice", price: "55", unit: "kg", change: 0, source: "Agmarknet", category: "Grocery", description: "Sona Masoori rice from Andhra." },
  ],
  wheat: [{ name: "Wheat", price: "32", unit: "kg", change: 0, source: "Agmarknet", category: "Grocery", description: "Wheat grain from MP." }],
  dal: [
    { name: "Toor Dal", price: "130", unit: "kg", change: 5, source: "Agmarknet", category: "Grocery", description: "Toor dal from Maharashtra." },
    { name: "Moong Dal", price: "110", unit: "kg", change: 3, source: "Agmarknet", category: "Grocery", description: "Moong dal." },
    { name: "Chana Dal", price: "90", unit: "kg", change: 2, source: "Agmarknet", category: "Grocery", description: "Chana dal." },
  ],
  sugar: [{ name: "Sugar", price: "42", unit: "kg", change: 1, source: "Agmarknet", category: "Grocery", description: "Refined sugar." }],
  oil: [
    { name: "Mustard Oil", price: "180", unit: "litre", change: 2, source: "Agmarknet", category: "Grocery", description: "Pure mustard oil." },
    { name: "Sunflower Oil", price: "140", unit: "litre", change: -1, source: "Agmarknet", category: "Grocery", description: "Refined sunflower oil." },
    { name: "Groundnut Oil", price: "190", unit: "litre", change: 1, source: "Agmarknet", category: "Grocery", description: "Pure groundnut oil." },
  ],
  atta: [{ name: "Wheat Atta", price: "38", unit: "kg", change: 0, source: "Agmarknet", category: "Grocery", description: "Whole wheat flour." }],
  milk: [
    { name: "Amul Full Cream Milk", price: "68", unit: "litre", change: 0, source: "Amul", category: "Grocery", description: "Full cream milk." },
    { name: "Amul Toned Milk", price: "58", unit: "litre", change: 0, source: "Amul", category: "Grocery", description: "Toned milk." },
  ],
  eggs: [{ name: "Eggs", price: "7", unit: "piece", change: 1, source: "NECC", category: "Grocery", description: "Farm fresh eggs." }],
  chicken: [{ name: "Chicken (Broiler)", price: "180", unit: "kg", change: -3, source: "Market", category: "Grocery", description: "Fresh broiler chicken." }],
  fish: [{ name: "Rohu Fish", price: "220", unit: "kg", change: 2, source: "Market", category: "Grocery", description: "Fresh rohu fish." }],

  // Fuel
  petrol: [
    { name: "Petrol - Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Delhi." },
    { name: "Petrol - Mumbai", price: "103.44", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Mumbai." },
    { name: "Petrol - Bangalore", price: "102.86", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Bangalore." },
    { name: "Petrol - Chennai", price: "100.75", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Chennai." },
    { name: "Petrol - Hyderabad", price: "107.41", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Hyderabad." },
    { name: "Petrol - Kolkata", price: "103.94", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Kolkata." },
  ],
  diesel: [
    { name: "Diesel - Delhi", price: "87.67", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Diesel price in Delhi." },
    { name: "Diesel - Mumbai", price: "89.97", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Diesel price in Mumbai." },
    { name: "Diesel - Bangalore", price: "90.94", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Diesel price in Bangalore." },
    { name: "Diesel - Chennai", price: "92.44", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Diesel price in Chennai." },
  ],
  cng: [
    { name: "CNG - Delhi", price: "74.09", unit: "kg", change: -2, source: "IGL", category: "Fuel", description: "CNG price in Delhi." },
    { name: "CNG - Mumbai", price: "66.00", unit: "kg", change: -1, source: "MGL", category: "Fuel", description: "CNG price in Mumbai." },
    { name: "CNG - Pune", price: "75.00", unit: "kg", change: -1, source: "MGL", category: "Fuel", description: "CNG price in Pune." },
  ],
  lpg: [
    { name: "LPG Cylinder (14.2kg)", price: "803", unit: "cylinder", change: 0, source: "IOCL", category: "Fuel", description: "Domestic LPG cylinder price." },
    { name: "LPG Cylinder (5kg)", price: "471", unit: "cylinder", change: 0, source: "IOCL", category: "Fuel", description: "Small LPG cylinder." },
  ],

  // Commodities
  gold: [
    { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24 Karat pure gold on MCX India." },
    { name: "Gold 22K", price: "6637", unit: "gram", change: 1.1, source: "MCX", category: "Commodity", description: "22 Karat gold for jewellery." },
    { name: "Gold 18K", price: "5430", unit: "gram", change: 1.0, source: "MCX", category: "Commodity", description: "18 Karat gold price." },
  ],
  silver: [{ name: "Silver", price: "89500", unit: "kg", change: 2.1, source: "MCX", category: "Commodity", description: "Silver price on MCX India." }],
  diamond: [{ name: "Diamond (1 carat)", price: "350000", unit: "carat", change: 0.5, source: "GIA", category: "Commodity", description: "1 carat diamond average price." }],

  // Phones
  iphone: [
    { name: "iPhone 16", price: "79900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16 128GB." },
    { name: "iPhone 16 Pro", price: "119900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16 Pro 128GB." },
    { name: "iPhone 15", price: "69900", unit: "piece", change: -8, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 128GB." },
    { name: "iPhone 15 Pro", price: "119900", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 Pro." },
    { name: "iPhone 14", price: "54900", unit: "piece", change: -12, source: "Amazon", category: "Smartphone", description: "Apple iPhone 14 128GB." },
    { name: "iPhone 13", price: "44900", unit: "piece", change: -15, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 13 128GB." },
  ],
  samsung: [
    { name: "Samsung Galaxy S25", price: "80999", unit: "piece", change: -2, source: "Samsung India", category: "Smartphone", description: "Samsung Galaxy S25." },
    { name: "Samsung Galaxy S24", price: "69999", unit: "piece", change: -8, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy S24." },
    { name: "Samsung Galaxy A55", price: "34999", unit: "piece", change: -5, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy A55 5G." },
    { name: "Samsung Galaxy A35", price: "26999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy A35 5G." },
    { name: "Samsung Galaxy M14", price: "12999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy M14 5G." },
    { name: "Samsung Galaxy M34", price: "16999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy M34 5G." },
  ],
  oneplus: [
    { name: "OnePlus 13", price: "69999", unit: "piece", change: -2, source: "OnePlus India", category: "Smartphone", description: "OnePlus 13 flagship." },
    { name: "OnePlus 12", price: "59999", unit: "piece", change: -8, source: "Amazon", category: "Smartphone", description: "OnePlus 12." },
    { name: "OnePlus Nord CE4", price: "22999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "OnePlus Nord CE4." },
    { name: "OnePlus Nord CE3 Lite", price: "16999", unit: "piece", change: -5, source: "Amazon", category: "Smartphone", description: "OnePlus Nord CE3 Lite 5G." },
  ],
  redmi: [
    { name: "Redmi Note 14", price: "19999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "Redmi Note 14 5G." },
    { name: "Redmi Note 13", price: "16999", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Redmi Note 13 5G." },
    { name: "Redmi 13C", price: "8999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Redmi 13C." },
    { name: "Redmi A3", price: "6999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "Redmi A3 entry level." },
  ],
  realme: [
    { name: "Realme 13 Pro+", price: "29999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Realme 13 Pro+." },
    { name: "Realme 12 Pro+", price: "24999", unit: "piece", change: -6, source: "Flipkart", category: "Smartphone", description: "Realme 12 Pro+." },
    { name: "Realme Narzo 70", price: "13999", unit: "piece", change: -3, source: "Amazon", category: "Smartphone", description: "Realme Narzo 70 5G." },
    { name: "Realme C65", price: "8999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Realme C65." },
  ],
  vivo: [
    { name: "Vivo V40", price: "34999", unit: "piece", change: -2, source: "Vivo India", category: "Smartphone", description: "Vivo V40 5G." },
    { name: "Vivo Y200", price: "19999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "Vivo Y200 5G." },
    { name: "Vivo T3x", price: "12999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Vivo T3x 5G." },
  ],
  oppo: [
    { name: "OPPO Reno 12 Pro", price: "36999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "OPPO Reno 12 Pro 5G." },
    { name: "OPPO A3 Pro", price: "22999", unit: "piece", change: -1, source: "Amazon", category: "Smartphone", description: "OPPO A3 Pro 5G." },
  ],
  phone: [
    { name: "Redmi A3", price: "6999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "Redmi A3 entry level." },
    { name: "Redmi 13C", price: "8999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Redmi 13C." },
    { name: "Realme C65", price: "8999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Realme C65." },
    { name: "Samsung Galaxy M14", price: "12999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy M14 5G." },
    { name: "Realme Narzo 70", price: "13999", unit: "piece", change: -3, source: "Amazon", category: "Smartphone", description: "Realme Narzo 70 5G." },
    { name: "Redmi Note 13", price: "16999", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Redmi Note 13 5G." },
    { name: "OnePlus Nord CE3 Lite", price: "16999", unit: "piece", change: -5, source: "Amazon", category: "Smartphone", description: "OnePlus Nord CE3 Lite." },
    { name: "Samsung Galaxy M34", price: "16999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy M34 5G." },
    { name: "Redmi Note 14", price: "19999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "Redmi Note 14 5G." },
    { name: "OnePlus Nord CE4", price: "22999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "OnePlus Nord CE4." },
    { name: "OPPO A3 Pro", price: "22999", unit: "piece", change: -1, source: "Amazon", category: "Smartphone", description: "OPPO A3 Pro." },
    { name: "Samsung Galaxy A35", price: "26999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy A35 5G." },
    { name: "Realme 13 Pro+", price: "29999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Realme 13 Pro+." },
    { name: "Samsung Galaxy A55", price: "34999", unit: "piece", change: -5, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy A55 5G." },
    { name: "Vivo V40", price: "34999", unit: "piece", change: -2, source: "Vivo India", category: "Smartphone", description: "Vivo V40 5G." },
    { name: "iPhone 13", price: "44900", unit: "piece", change: -15, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 13." },
    { name: "iPhone 14", price: "54900", unit: "piece", change: -12, source: "Amazon", category: "Smartphone", description: "Apple iPhone 14." },
    { name: "OnePlus 12", price: "59999", unit: "piece", change: -8, source: "Amazon", category: "Smartphone", description: "OnePlus 12." },
    { name: "Samsung Galaxy S24", price: "69999", unit: "piece", change: -8, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy S24." },
    { name: "iPhone 15", price: "69900", unit: "piece", change: -8, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15." },
    { name: "OnePlus 13", price: "69999", unit: "piece", change: -2, source: "OnePlus India", category: "Smartphone", description: "OnePlus 13." },
    { name: "iPhone 16", price: "79900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16." },
    { name: "Samsung Galaxy S25", price: "80999", unit: "piece", change: -2, source: "Samsung India", category: "Smartphone", description: "Samsung Galaxy S25." },
    { name: "iPhone 15 Pro", price: "119900", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 Pro." },
    { name: "iPhone 16 Pro", price: "119900", unit: "piece", change: -1, source: "Apple India", category: "Smartphone", description: "Apple iPhone 16 Pro." },
  ],

  // Laptops
  macbook: [
    { name: "MacBook Air M3", price: "114900", unit: "piece", change: -1, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air M3 chip." },
    { name: "MacBook Pro M3", price: "169900", unit: "piece", change: -1, source: "Apple Store", category: "Laptop", description: "Apple MacBook Pro 14 inch M3." },
    { name: "MacBook Air M2", price: "99900", unit: "piece", change: -5, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air M2." },
  ],
  laptop: [
    { name: "Acer Aspire Lite", price: "28990", unit: "piece", change: -3, source: "Flipkart", category: "Laptop", description: "Acer Aspire Lite Ryzen 3." },
    { name: "HP 15s Ryzen 5", price: "42990", unit: "piece", change: -2, source: "Amazon", category: "Laptop", description: "HP 15s with Ryzen 5." },
    { name: "Lenovo IdeaPad Slim 3", price: "38990", unit: "piece", change: 0, source: "Amazon", category: "Laptop", description: "Lenovo IdeaPad Slim 3 Ryzen 5." },
    { name: "Asus VivoBook 15", price: "42990", unit: "piece", change: -2, source: "Flipkart", category: "Laptop", description: "Asus VivoBook 15 Intel i5." },
    { name: "HP Pavilion 15", price: "56990", unit: "piece", change: -1, source: "Flipkart", category: "Laptop", description: "HP Pavilion 15 Ryzen 7." },
    { name: "Dell Inspiron 15", price: "52990", unit: "piece", change: -2, source: "Dell India", category: "Laptop", description: "Dell Inspiron 15 Intel i5." },
    { name: "Dell XPS 13", price: "89990", unit: "piece", change: -3, source: "Dell India", category: "Laptop", description: "Dell XPS 13 Intel Core i7." },
    { name: "Lenovo ThinkPad E14", price: "72990", unit: "piece", change: -1, source: "Amazon", category: "Laptop", description: "Lenovo ThinkPad E14 AMD." },
    { name: "MacBook Air M2", price: "99900", unit: "piece", change: -5, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air M2." },
    { name: "MacBook Air M3", price: "114900", unit: "piece", change: -1, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air M3." },
    { name: "MacBook Pro M3", price: "169900", unit: "piece", change: -1, source: "Apple Store", category: "Laptop", description: "Apple MacBook Pro M3." },
  ],

  // Bikes
  bike: [
    { name: "Honda Activa 6G", price: "74536", unit: "piece", change: 1, source: "Honda Dealer", category: "Bike", description: "Honda Activa 6G scooter." },
    { name: "TVS Jupiter", price: "79000", unit: "piece", change: 0, source: "TVS Dealer", category: "Bike", description: "TVS Jupiter scooter." },
    { name: "Bajaj Pulsar 150", price: "111000", unit: "piece", change: 1, source: "Bajaj Dealer", category: "Bike", description: "Bajaj Pulsar 150." },
    { name: "TVS Apache RTR 160", price: "121080", unit: "piece", change: 0, source: "TVS Dealer", category: "Bike", description: "TVS Apache RTR 160 4V." },
    { name: "Bajaj Pulsar NS200", price: "148930", unit: "piece", change: 1, source: "Bajaj Dealer", category: "Bike", description: "Bajaj Pulsar NS200." },
    { name: "Hero Splendor Plus", price: "76500", unit: "piece", change: 1, source: "Hero Dealer", category: "Bike", description: "Hero Splendor Plus." },
    { name: "Yamaha FZ-S V4", price: "132900", unit: "piece", change: 1, source: "Yamaha Dealer", category: "Bike", description: "Yamaha FZ-S V4 FI." },
    { name: "KTM Duke 200", price: "196000", unit: "piece", change: 2, source: "KTM Dealer", category: "Bike", description: "KTM Duke 200." },
    { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "Royal Enfield Classic 350." },
    { name: "Royal Enfield Meteor 350", price: "210000", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "Royal Enfield Meteor 350." },
    { name: "Royal Enfield Himalayan", price: "229000", unit: "piece", change: 1, source: "RE Dealer", category: "Bike", description: "Royal Enfield Himalayan." },
    { name: "Bajaj Dominar 400", price: "231000", unit: "piece", change: 1, source: "Bajaj Dealer", category: "Bike", description: "Bajaj Dominar 400." },
  ],

  // Cars
  car: [
    { name: "Maruti Alto K10", price: "399000", unit: "piece", change: 0, source: "Maruti Dealer", category: "Car", description: "Maruti Alto K10." },
    { name: "Renault Kwid", price: "460000", unit: "piece", change: 0, source: "Renault Dealer", category: "Car", description: "Renault Kwid RXE." },
    { name: "Tata Punch", price: "599000", unit: "piece", change: 0, source: "Tata Dealer", category: "Car", description: "Tata Punch Pure petrol." },
    { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Swift LXi." },
    { name: "Maruti Baleno", price: "669000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Baleno Sigma." },
    { name: "Tata Nexon", price: "799000", unit: "piece", change: 1, source: "Tata Dealer", category: "Car", description: "Tata Nexon Smart petrol." },
    { name: "Hyundai i20", price: "749000", unit: "piece", change: 1, source: "Hyundai Dealer", category: "Car", description: "Hyundai i20 Magna petrol." },
    { name: "Kia Sonet", price: "799000", unit: "piece", change: 1, source: "Kia Dealer", category: "Car", description: "Kia Sonet HTE petrol." },
    { name: "Maruti Brezza", price: "829000", unit: "piece", change: 2, source: "Maruti Dealer", category: "Car", description: "Maruti Brezza LXi." },
    { name: "Hyundai Creta", price: "1099000", unit: "piece", change: 2, source: "Hyundai Dealer", category: "Car", description: "Hyundai Creta E petrol." },
    { name: "Kia Seltos", price: "1099000", unit: "piece", change: 1, source: "Kia Dealer", category: "Car", description: "Kia Seltos HTE petrol." },
    { name: "Honda City", price: "1199000", unit: "piece", change: 1, source: "Honda Dealer", category: "Car", description: "Honda City V petrol." },
    { name: "Tata Nexon EV", price: "1399000", unit: "piece", change: -1, source: "Tata Dealer", category: "Car", description: "Tata Nexon EV." },
    { name: "MG Hector", price: "1399000", unit: "piece", change: 1, source: "MG Dealer", category: "Car", description: "MG Hector Style petrol." },
    { name: "Hyundai Tucson", price: "2799000", unit: "piece", change: 2, source: "Hyundai Dealer", category: "Car", description: "Hyundai Tucson Signature." },
  ],

  // Electronics
  tv: [
    { name: "Samsung 43\" 4K TV", price: "32990", unit: "piece", change: -5, source: "Flipkart", category: "Electronics", description: "Samsung 43 inch 4K Smart TV." },
    { name: "LG 55\" OLED TV", price: "89990", unit: "piece", change: -3, source: "Amazon", category: "Electronics", description: "LG 55 inch OLED 4K TV." },
    { name: "Sony Bravia 65\" TV", price: "129990", unit: "piece", change: -2, source: "Sony India", category: "Electronics", description: "Sony Bravia 65 inch 4K TV." },
    { name: "Mi 40\" Full HD TV", price: "19990", unit: "piece", change: -8, source: "Flipkart", category: "Electronics", description: "Mi 40 inch Full HD Smart TV." },
  ],
  ac: [
    { name: "Voltas 1.5 Ton 3 Star AC", price: "32990", unit: "piece", change: -2, source: "Flipkart", category: "Appliance", description: "Voltas 1.5 ton 3 star split AC." },
    { name: "Daikin 1.5 Ton 5 Star AC", price: "45990", unit: "piece", change: -1, source: "Amazon", category: "Appliance", description: "Daikin 1.5 ton 5 star inverter AC." },
    { name: "LG 1 Ton 4 Star AC", price: "38990", unit: "piece", change: -2, source: "Flipkart", category: "Appliance", description: "LG 1 ton 4 star split AC." },
    { name: "Samsung 2 Ton 3 Star AC", price: "54990", unit: "piece", change: -1, source: "Amazon", category: "Appliance", description: "Samsung 2 ton 3 star AC." },
  ],
  refrigerator: [
    { name: "LG 260L Double Door Fridge", price: "28990", unit: "piece", change: -3, source: "Flipkart", category: "Appliance", description: "LG 260 litre double door refrigerator." },
    { name: "Samsung 253L Double Door", price: "26990", unit: "piece", change: -2, source: "Amazon", category: "Appliance", description: "Samsung 253 litre frost free fridge." },
    { name: "Whirlpool 184L Single Door", price: "15990", unit: "piece", change: -1, source: "Flipkart", category: "Appliance", description: "Whirlpool 184 litre single door fridge." },
  ],
  washing: [
    { name: "Samsung 7kg Front Load", price: "34990", unit: "piece", change: -2, source: "Flipkart", category: "Appliance", description: "Samsung 7kg front load washing machine." },
    { name: "LG 8kg Top Load", price: "21990", unit: "piece", change: -1, source: "Amazon", category: "Appliance", description: "LG 8kg top load washing machine." },
    { name: "Whirlpool 6.5kg Top Load", price: "16990", unit: "piece", change: -2, source: "Flipkart", category: "Appliance", description: "Whirlpool 6.5kg top load." },
  ],

  // Real Estate
  rent: [
    { name: "1BHK Rent - Delhi", price: "12000", unit: "month", change: 5, source: "99acres", category: "Real Estate", description: "Average 1BHK rent in Delhi." },
    { name: "2BHK Rent - Mumbai", price: "35000", unit: "month", change: 8, source: "99acres", category: "Real Estate", description: "Average 2BHK rent in Mumbai." },
    { name: "1BHK Rent - Bangalore", price: "18000", unit: "month", change: 10, source: "99acres", category: "Real Estate", description: "Average 1BHK rent in Bangalore." },
    { name: "2BHK Rent - Hyderabad", price: "20000", unit: "month", change: 7, source: "99acres", category: "Real Estate", description: "Average 2BHK rent in Hyderabad." },
  ],

  // Medicines
  medicine: [
    { name: "Paracetamol 500mg (10 tabs)", price: "15", unit: "strip", change: 0, source: "MRP", category: "Medicine", description: "Paracetamol 500mg tablet strip." },
    { name: "Dolo 650 (15 tabs)", price: "30", unit: "strip", change: 0, source: "MRP", category: "Medicine", description: "Dolo 650mg paracetamol strip." },
    { name: "Azithromycin 500mg (5 tabs)", price: "85", unit: "strip", change: 0, source: "MRP", category: "Medicine", description: "Azithromycin antibiotic strip." },
    { name: "Vitamin D3 (60 caps)", price: "350", unit: "bottle", change: 2, source: "MRP", category: "Medicine", description: "Vitamin D3 supplement." },
    { name: "Multivitamin (30 tabs)", price: "250", unit: "bottle", change: 1, source: "MRP", category: "Medicine", description: "Daily multivitamin supplement." },
  ],
};

function extractBudget(query: string): { max?: number; min?: number } {
  const q = query.toLowerCase();
  const budget: { max?: number; min?: number } = {};
  const underMatch = q.match(/(?:under|below|less than|upto|up to)\s*₹?\s*(\d+)\s*(k|lakh|lac)?/);
  if (underMatch) {
    let val = parseInt(underMatch[1]);
    if (underMatch[2] === "k") val *= 1000;
    if (underMatch[2] === "lakh" || underMatch[2] === "lac") val *= 100000;
    budget.max = val;
  }
  const aboveMatch = q.match(/(?:above|over|more than|minimum|min)\s*₹?\s*(\d+)\s*(k|lakh|lac)?/);
  if (aboveMatch) {
    let val = parseInt(aboveMatch[1]);
    if (aboveMatch[2] === "k") val *= 1000;
    if (aboveMatch[2] === "lakh" || aboveMatch[2] === "lac") val *= 100000;
    budget.min = val;
  }
  return budget;
}

async function getAIPrices(query: string) {
  try {
    const prompt = `You are an Indian market price expert. 
A user searched for: "${query}"

Generate realistic current Indian market prices for this product. 
Respond ONLY in this exact JSON array format (no markdown):
[
  {"name": "product name", "price": "number as string", "unit": "kg/litre/piece/gram", "change": number, "source": "source name", "category": "category", "description": "brief description"},
  ...
]
Give 2-4 results. Use realistic current Indian prices in rupees. change is percentage change from last week (positive = price went up, negative = went down).`;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const rawQuery = req.nextUrl.searchParams.get("q") || "";
  const query = rawQuery.toLowerCase();
  if (!query) return NextResponse.json({ error: "Query required" }, { status: 400 });

  const key = Object.keys(allProducts).find((k) => query.includes(k));
  let prices = key ? allProducts[key] : [];

  if (prices.length === 0) {
    const words = query.split(" ").filter((w) => w.length > 2);
    const allItems = Object.values(allProducts).flat();
    prices = allItems.filter((item) =>
      words.some((word) => item.name.toLowerCase().includes(word) || item.category.toLowerCase().includes(word))
    );
  }

  const budget = extractBudget(query);
  if (budget.max) prices = prices.filter((p) => parseFloat(p.price.replace(/,/g, "")) <= budget.max!);
  if (budget.min) prices = prices.filter((p) => parseFloat(p.price.replace(/,/g, "")) >= budget.min!);
  if (budget.max || budget.min || query.includes("cheap") || query.includes("best")) {
    prices = prices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  // If still nothing found — use Gemini AI to generate prices
  if (prices.length === 0) {
    const aiPrices = await getAIPrices(rawQuery);
    if (aiPrices.length > 0) {
      return NextResponse.json({ query: rawQuery, prices: aiPrices, source: "ai", timestamp: new Date().toISOString() });
    }
    prices = [{ name: rawQuery, price: "N/A", unit: "unit", change: 0, source: "Not found", category: "Unknown", description: "No data available yet. Try a different search." }];
  }

  return NextResponse.json({ query: rawQuery, prices, timestamp: new Date().toISOString() });
}