import { NextRequest, NextResponse } from "next/server";

const allProducts: Record<string, any[]> = {
  tomato: [{ name: "Tomato", price: "42", unit: "kg", change: -12, source: "Agmarknet", category: "Vegetable", description: "Fresh red tomatoes from local mandis across India." }],
  onion: [{ name: "Onion", price: "28", unit: "kg", change: -5, source: "Agmarknet", category: "Vegetable", description: "Medium sized onions sourced from Nashik, Maharashtra." }],
  potato: [{ name: "Potato", price: "22", unit: "kg", change: 3, source: "Agmarknet", category: "Vegetable", description: "Fresh potatoes from Agra and UP mandis." }],
  rice: [{ name: "Basmati Rice", price: "85", unit: "kg", change: 1, source: "Agmarknet", category: "Grocery", description: "Premium basmati rice from Punjab." }],
  wheat: [{ name: "Wheat", price: "32", unit: "kg", change: 0, source: "Agmarknet", category: "Grocery", description: "Wheat grain from MP and Punjab mandis." }],
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
  gold: [
    { name: "Gold 24K", price: "7240", unit: "gram", change: 1.2, source: "MCX", category: "Commodity", description: "24 Karat pure gold price on MCX India." },
    { name: "Gold 22K", price: "6637", unit: "gram", change: 1.1, source: "MCX", category: "Commodity", description: "22 Karat gold used in jewellery." },
    { name: "Gold 18K", price: "5430", unit: "gram", change: 1.0, source: "MCX", category: "Commodity", description: "18 Karat gold price in India." },
  ],
  silver: [{ name: "Silver", price: "89500", unit: "kg", change: 2.1, source: "MCX", category: "Commodity", description: "Silver price on MCX India commodity exchange." }],
  iphone: [
    { name: "iPhone 15", price: "79900", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 128GB - Latest model with A16 Bionic chip." },
    { name: "iPhone 15 Pro", price: "134900", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 Pro with titanium design and A17 Pro chip." },
    { name: "iPhone 14", price: "59900", unit: "piece", change: -8, source: "Amazon", category: "Smartphone", description: "Apple iPhone 14 128GB." },
    { name: "iPhone 13", price: "44900", unit: "piece", change: -10, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 13 128GB." },
  ],
  samsung: [
    { name: "Samsung Galaxy S24", price: "74999", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy S24 with Snapdragon 8 Gen 3." },
    { name: "Samsung Galaxy A55", price: "38999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy A55 5G mid-range phone." },
    { name: "Samsung Galaxy A35", price: "26999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy A35 5G." },
    { name: "Samsung Galaxy M14", price: "13999", unit: "piece", change: -1, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy M14 5G budget phone." },
    { name: "Samsung Galaxy M34", price: "17999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy M34 5G with 6000mAh battery." },
  ],
  oneplus: [
    { name: "OnePlus 12", price: "64999", unit: "piece", change: -4, source: "Amazon", category: "Smartphone", description: "OnePlus 12 with Snapdragon 8 Gen 3 and Hasselblad camera." },
    { name: "OnePlus Nord CE4", price: "24999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "OnePlus Nord CE4 budget 5G phone." },
    { name: "OnePlus Nord CE3 Lite", price: "17999", unit: "piece", change: -3, source: "Amazon", category: "Smartphone", description: "OnePlus Nord CE3 Lite 5G." },
  ],
  redmi: [
    { name: "Redmi Note 13", price: "17999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Redmi Note 13 5G with 108MP camera." },
    { name: "Redmi Note 13 Pro", price: "23999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Redmi Note 13 Pro 5G." },
    { name: "Redmi 13C", price: "9999", unit: "piece", change: -1, source: "Amazon", category: "Smartphone", description: "Redmi 13C budget Android phone." },
    { name: "Redmi A3", price: "7499", unit: "piece", change: 0, source: "Flipkart", category: "Smartphone", description: "Redmi A3 entry level phone." },
  ],
  realme: [
    { name: "Realme 12 Pro+", price: "27999", unit: "piece", change: -4, source: "Flipkart", category: "Smartphone", description: "Realme 12 Pro+ with periscope camera." },
    { name: "Realme Narzo 70", price: "14999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Realme Narzo 70 5G." },
    { name: "Realme C65", price: "9999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "Realme C65 budget phone." },
  ],
  phone: [
    { name: "Redmi A3", price: "7499", unit: "piece", change: 0, source: "Flipkart", category: "Smartphone", description: "Redmi A3 entry level phone." },
    { name: "Redmi 13C", price: "9999", unit: "piece", change: -1, source: "Amazon", category: "Smartphone", description: "Redmi 13C budget Android phone." },
    { name: "Realme C65", price: "9999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "Realme C65 budget phone." },
    { name: "Samsung Galaxy M14", price: "13999", unit: "piece", change: -1, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy M14 5G." },
    { name: "Realme Narzo 70", price: "14999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Realme Narzo 70 5G." },
    { name: "Redmi Note 13", price: "17999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Redmi Note 13 5G." },
    { name: "OnePlus Nord CE3 Lite", price: "17999", unit: "piece", change: -3, source: "Amazon", category: "Smartphone", description: "OnePlus Nord CE3 Lite 5G." },
    { name: "Samsung Galaxy M34", price: "17999", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy M34 5G." },
    { name: "OnePlus Nord CE4", price: "24999", unit: "piece", change: -1, source: "Flipkart", category: "Smartphone", description: "OnePlus Nord CE4 5G." },
    { name: "Samsung Galaxy A35", price: "26999", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy A35 5G." },
    { name: "Samsung Galaxy A55", price: "38999", unit: "piece", change: -2, source: "Amazon", category: "Smartphone", description: "Samsung Galaxy A55 5G." },
    { name: "iPhone 13", price: "44900", unit: "piece", change: -10, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 13 128GB." },
    { name: "OnePlus 12", price: "64999", unit: "piece", change: -4, source: "Amazon", category: "Smartphone", description: "OnePlus 12 flagship." },
    { name: "Samsung Galaxy S24", price: "74999", unit: "piece", change: -5, source: "Flipkart", category: "Smartphone", description: "Samsung Galaxy S24." },
    { name: "iPhone 15", price: "79900", unit: "piece", change: -3, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 128GB." },
    { name: "iPhone 15 Pro", price: "134900", unit: "piece", change: -2, source: "Flipkart", category: "Smartphone", description: "Apple iPhone 15 Pro." },
  ],
  macbook: [
    { name: "MacBook Air M2", price: "114900", unit: "piece", change: -2, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air with M2 chip, 8GB RAM, 256GB SSD." },
    { name: "MacBook Pro M3", price: "169900", unit: "piece", change: -1, source: "Apple Store", category: "Laptop", description: "Apple MacBook Pro 14 inch with M3 chip." },
  ],
  laptop: [
    { name: "Acer Aspire Lite", price: "29990", unit: "piece", change: -2, source: "Flipkart", category: "Laptop", description: "Acer Aspire Lite with Ryzen 3." },
    { name: "HP 15s", price: "34990", unit: "piece", change: -1, source: "Amazon", category: "Laptop", description: "HP 15s with Intel Core i3." },
    { name: "Lenovo IdeaPad Slim 3", price: "38990", unit: "piece", change: 0, source: "Amazon", category: "Laptop", description: "Lenovo IdeaPad Slim 3 with Ryzen 5." },
    { name: "Asus VivoBook 15", price: "42990", unit: "piece", change: -2, source: "Flipkart", category: "Laptop", description: "Asus VivoBook 15 with Intel i5." },
    { name: "HP Pavilion 15", price: "54990", unit: "piece", change: -1, source: "Flipkart", category: "Laptop", description: "HP Pavilion 15 with Ryzen 5." },
    { name: "Dell XPS 13", price: "89990", unit: "piece", change: -3, source: "Dell India", category: "Laptop", description: "Dell XPS 13 with Intel Core i7." },
    { name: "MacBook Air M2", price: "114900", unit: "piece", change: -2, source: "Apple Store", category: "Laptop", description: "Apple MacBook Air M2." },
    { name: "MacBook Pro M3", price: "169900", unit: "piece", change: -1, source: "Apple Store", category: "Laptop", description: "Apple MacBook Pro M3." },
  ],
  bike: [
    { name: "Honda Activa 6G", price: "74536", unit: "piece", change: 1, source: "Honda Dealer", category: "Bike", description: "Honda Activa 6G scooter ex-showroom price." },
    { name: "TVS Jupiter", price: "79000", unit: "piece", change: 0, source: "TVS Dealer", category: "Bike", description: "TVS Jupiter scooter." },
    { name: "Bajaj Pulsar 150", price: "111000", unit: "piece", change: 1, source: "Bajaj Dealer", category: "Bike", description: "Bajaj Pulsar 150 ex-showroom." },
    { name: "TVS Apache RTR 160", price: "121080", unit: "piece", change: 0, source: "TVS Dealer", category: "Bike", description: "TVS Apache RTR 160 4V ex-showroom." },
    { name: "Bajaj Pulsar NS200", price: "148930", unit: "piece", change: 1, source: "Bajaj Dealer", category: "Bike", description: "Bajaj Pulsar NS200 ex-showroom Delhi." },
    { name: "Royal Enfield Classic 350", price: "193079", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "Royal Enfield Classic 350 ex-showroom Delhi." },
    { name: "Royal Enfield Meteor 350", price: "210000", unit: "piece", change: 2, source: "RE Dealer", category: "Bike", description: "Royal Enfield Meteor 350 cruiser." },
    { name: "Royal Enfield Himalayan", price: "229000", unit: "piece", change: 1, source: "RE Dealer", category: "Bike", description: "Royal Enfield Himalayan adventure tourer." },
  ],
  car: [
    { name: "Maruti Alto K10", price: "399000", unit: "piece", change: 0, source: "Maruti Dealer", category: "Car", description: "Maruti Alto K10 entry level car." },
    { name: "Tata Punch", price: "599000", unit: "piece", change: 0, source: "Tata Dealer", category: "Car", description: "Tata Punch Pure petrol." },
    { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Suzuki Swift LXi ex-showroom Delhi." },
    { name: "Tata Nexon", price: "799000", unit: "piece", change: 1, source: "Tata Dealer", category: "Car", description: "Tata Nexon Smart petrol ex-showroom." },
    { name: "Hyundai Creta", price: "1099000", unit: "piece", change: 2, source: "Hyundai Dealer", category: "Car", description: "Hyundai Creta E petrol ex-showroom." },
    { name: "Kia Seltos", price: "1099000", unit: "piece", change: 1, source: "Kia Dealer", category: "Car", description: "Kia Seltos HTE petrol." },
    { name: "Honda City", price: "1199000", unit: "piece", change: 1, source: "Honda Dealer", category: "Car", description: "Honda City V petrol." },
    { name: "Hyundai Tucson", price: "2799000", unit: "piece", change: 2, source: "Hyundai Dealer", category: "Car", description: "Hyundai Tucson Signature petrol." },
  ],
  maruti: [
    { name: "Maruti Alto K10", price: "399000", unit: "piece", change: 0, source: "Maruti Dealer", category: "Car", description: "Maruti Alto K10." },
    { name: "Maruti Swift", price: "699000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Swift LXi." },
    { name: "Maruti Baleno", price: "669000", unit: "piece", change: 1, source: "Maruti Dealer", category: "Car", description: "Maruti Baleno Sigma." },
    { name: "Maruti Brezza", price: "829000", unit: "piece", change: 2, source: "Maruti Dealer", category: "Car", description: "Maruti Brezza LXi." },
  ],
  tata: [
    { name: "Tata Punch", price: "599000", unit: "piece", change: 0, source: "Tata Dealer", category: "Car", description: "Tata Punch Pure petrol." },
    { name: "Tata Nexon", price: "799000", unit: "piece", change: 1, source: "Tata Dealer", category: "Car", description: "Tata Nexon Smart petrol." },
    { name: "Tata Tiago EV", price: "849000", unit: "piece", change: 0, source: "Tata Dealer", category: "Car", description: "Tata Tiago EV." },
  ],
};

// Extract price budget from query like "under 20k", "below 50000", "less than 30k"
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

export async function GET(req: NextRequest) {
  const rawQuery = req.nextUrl.searchParams.get("q") || "";
  const query = rawQuery.toLowerCase();

  if (!query) return NextResponse.json({ error: "Query required" }, { status: 400 });

  // Find matching product key
  const key = Object.keys(allProducts).find((k) => query.includes(k));
  let prices = key ? allProducts[key] : [];

  // If no key found, search across all products by name
  if (prices.length === 0) {
    const words = query.split(" ").filter((w) => w.length > 2);
    const allItems = Object.values(allProducts).flat();
    prices = allItems.filter((item) =>
      words.some((word) => item.name.toLowerCase().includes(word) || item.category.toLowerCase().includes(word))
    );
  }

  // Apply budget filter
  const budget = extractBudget(query);
  if (budget.max) {
    prices = prices.filter((p) => parseFloat(p.price.replace(/,/g, "")) <= budget.max!);
  }
  if (budget.min) {
    prices = prices.filter((p) => parseFloat(p.price.replace(/,/g, "")) >= budget.min!);
  }

  // Sort by price ascending if budget query
  if (budget.max || budget.min || query.includes("cheap") || query.includes("best")) {
    prices = prices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  if (prices.length === 0) {
    prices = [{ name: rawQuery, price: "N/A", unit: "unit", change: 0, source: "Not found", category: "Unknown", description: "No data available yet. We are adding more products daily." }];
  }

  return NextResponse.json({ query: rawQuery, prices, timestamp: new Date().toISOString() });
}