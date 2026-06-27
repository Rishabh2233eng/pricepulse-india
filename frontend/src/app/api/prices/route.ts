import { NextRequest, NextResponse } from "next/server";

const allProducts: Record<string, any[]> = {
  // Vegetables
  tomato: [{ name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh red tomatoes from local mandis across India." }],
  onion: [{ name: "Onion", price: "28", unit: "kg", change: -5, source: "Agmarknet", category: "Vegetable", description: "Medium sized onions sourced from Nashik, Maharashtra." }],
  potato: [{ name: "Potato", price: "22", unit: "kg", change: 3, source: "Agmarknet", category: "Vegetable", description: "Fresh potatoes from Agra and UP mandis." }],
  rice: [{ name: "Basmati Rice", price: "85", unit: "kg", change: 1, source: "Agmarknet", category: "Grocery", description: "Premium basmati rice from Punjab." }],
  wheat: [{ name: "Wheat", price: "32", unit: "kg", change: 0, source: "Agmarknet", category: "Grocery", description: "Wheat grain from MP and Punjab mandis." }],

  // Fuel
  petrol: [
    { name: "Petrol - Delhi", price: "94.77", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Delhi as per IOCL daily revision." },
    { name: "Petrol - Mumbai", price: "103.44", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Mumbai." },
    { name: "Petrol - Bangalore", price: "102.86", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Bangalore." },
    { name: "Petrol - Chennai", price: "100.75", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Petrol price in Chennai." },
  ],
  diesel: [
    { name: "Diesel - Delhi", price: "87.67", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Diesel price in Delhi." },
    { name: "Diesel - Mumbai", price: "89.97", unit: "litre", change: 0, source: "IOCL", category: "Fuel", description: "Diesel price in Mumbai." },
  ],
  cng: [
    { name: "CNG - Delhi", price: "74.09", unit: "kg", change: -2, source: "IGL", category: "Fuel", description: "CNG price in Delhi from Indraprastha Gas Limited." },
    { name: "CNG - Mumbai", price: "66.00", unit: "kg", change: -1, source: "MGL", category: "Fuel", description: "CNG price in Mumbai from Mahanagar Gas." },
  ],

  // Commodities
  gold: [
    { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24 Karat pure gold price on MCX India." },
    { name: "Gold 22K", price: "6637", unit: "gram", change: 1.1, source: "MCX", category: "Commodity", description: "22 Karat gold used in jewellery." },
    { name: "Gold 18K", price: "5430", unit: "gram", change: 1.0, source: "MCX", category: "Commodity", description: "18 Karat gold price in India." },
  ],
  silver: [{ name: "Silver", price: "89500", unit: "kg", change: 2.1, source: "MCX", category: "Commodity", description: "Silver price on MCX India commodity exchange." }],

  // Phones
  iphone: [
    { name: "iPhone 15", price: "79900", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 128GB - Latest model with A16 Bionic chip." },
    { name: "iPhone 15 Pro", price: "134900", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 Pro with titanium design and A17 Pro chip." },
    { name: "iPhone 14", price: "59900", unit: "piece", change: -8, source: "Amazon", category: "Smartphone", description: "Apple iPhone 14 128GB." },
  ],
  samsung: [
    { name: "Samsung Galaxy S24", price: "74999", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy S24 with Snapdragon 8 Gen 3." },
    { name: "Samsung Galaxy A55", price: "38999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy A55 5G mid-range phone." },
  ],
  oneplus: [
    { name: "OnePlus 12", price: "64999", unit: "piece", change: -4, source: "Amazon", category: "Smartphone", description: "OnePlus 12 with Snapdragon 8 Gen 3 and Hasselblad camera." },
    { name: "OnePlus Nord CE4", price: "24999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "OnePlus Nord CE4 budget 5G phone." },
  ],
  phone: [
    { name: "iPhone 15", price: "79900", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 128GB." },
    { name: "Samsung Galaxy S24", price: "74999", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy S24." },
    { name: "OnePlus 12", price: "64999", unit: "piece", change: -4, source: "Amazon", category: "Smartphone", description: "OnePlus 12 flagship." },
    { name: "Redmi Note 13", price: "17999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Redmi Note 13 budget phone." },
  ],

  // Laptops
  macbook: [
    { name: "MacBook Air M2", price: "114900", unit: "piece", change: -2, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air with M2 chip, 8GB RAM, 256GB SSD." },
    { name: "MacBook Pro M3", price: "169900", unit: "piece", change: -1, source: "Apple Store", category: "Laptop", description: "Apple MacBook Pro 14 inch with M3 chip." },
  ],
  laptop: [
    { name: "MacBook Air M2", price: "114900", unit: "piece", change: -2, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air M2." },
    { name: "Dell XPS 13", price: "89990", unit: "piece", change: -3, source: "Dell India", category: "Laptop", description: "Dell XPS 13 with Intel Core i7." },
    { name: "HP Pavilion 15", price: "54990", unit: "piece", change: -1, source: "Flipkart", category: "Laptop", description: "HP Pavilion 15 with Ryzen 5." },
    { name: "Lenovo IdeaPad", price: "45990", unit: "piece", change: 0, source: "Amazon", category: "Laptop", description: "Lenovo IdeaPad Slim 5." },
    { name: "Asus VivoBook", price: "42990", unit: "piece", change: -2, source: "Flipkart", category: "Laptop", description: "Asus VivoBook 15 with Intel i5." },
  ],

  // Bikes
  bike: [
    { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "Royal Enfield Classic 350 ex-showroom Delhi." },
    { name: "Honda Activa 6G", price: "74536", unit: "piece", change: 1, source: "Honda Dealer", category: "Bike", description: "Honda Activa 6G scooter ex-showroom price." },
    { name: "Bajaj Pulsar NS200", price: "148930", unit: "piece", change: 1, source: "Bajaj Dealer", category: "Bike", description: "Bajaj Pulsar NS200 ex-showroom Delhi." },
    { name: "TVS Apache RTR 160", price: "121080", unit: "piece", change: 0, source: "TVS Dealer", category: "Bike", description: "TVS Apache RTR 160 4V ex-showroom." },
  ],
  "royal enfield": [
    { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "Royal Enfield Classic 350." },
    { name: "Royal Enfield Meteor 350", price: "210000", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "Royal Enfield Meteor 350 cruiser." },
    { name: "Royal Enfield Himalayan", price: "229000", unit: "piece", change: 1, source: "RE Dealer", category: "Bike", description: "Royal Enfield Himalayan adventure tourer." },
  ],

  // Cars
  car: [
    { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Suzuki Swift LXi ex-showroom Delhi." },
    { name: "Hyundai Creta", price: "1099000", unit: "piece", change: 2, source: "Hyundai Dealer", category: "Car", description: "Hyundai Creta E petrol ex-showroom." },
    { name: "Tata Nexon", price: "799000", unit: "piece", change: 1, source: "Tata Dealer", category: "Car", description: "Tata Nexon Smart petrol ex-showroom." },
    { name: "Tata Tiago EV", price: "849000", unit: "piece", change: 0, source: "Tata Dealer", category: "Car", description: "Tata Tiago EV electric car." },
  ],
  maruti: [
    { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Swift LXi." },
    { name: "Maruti Baleno", price: "669000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Baleno Sigma." },
    { name: "Maruti Brezza", price: "829000", unit: "piece", change: 2, source: "Maruti Dealer", category: "Car", description: "Maruti Brezza LXi." },
  ],
  tata: [
    { name: "Tata Nexon", price: "799000", unit: "piece", change: 1, source: "Tata Dealer", category: "Car", description: "Tata Nexon Smart petrol." },
    { name: "Tata Punch", price: "599000", unit: "piece", change: 0, source: "Tata Dealer", category: "Car", description: "Tata Punch Pure petrol." },
    { name: "Tata Tiago EV", price: "849000", unit: "piece", change: 0, source: "Tata Dealer", category: "Car", description: "Tata Tiago EV." },
  ],
};

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (!query) return NextResponse.json({ error: "Query required" }, { status: 400 });

  const key = Object.keys(allProducts).find((k) => query.includes(k));
  const prices = key ? allProducts[key] : [{ name: query, price: "N/A", unit: "unit", change: 0, source: "Not found", category: "Unknown", description: "No data available for this product yet." }];

  return NextResponse.json({ query, prices, timestamp: new Date().toISOString() });
}