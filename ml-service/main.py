from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models.predictor import predict_price, detect_anomaly
from data.prices import PRICE_HISTORY

app = FastAPI(title="PricePulse ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    product: str
    days_ahead: int = 7

@app.get("/")
def root():
    return {"message": "PricePulse ML Service Running!"}

@app.post("/predict")
def predict(req: PredictRequest):
    product = req.product.lower()

    # Find matching history
    key = next((k for k in PRICE_HISTORY if product in k or k in product), None)

    if not key:
        return {
            "product": product,
            "error": "No historical data found",
            "trend": "unknown",
        }

    history = PRICE_HISTORY[key]
    result = predict_price(history, req.days_ahead)
    is_anomaly = detect_anomaly(history)

    return {
        "product": product,
        "history": history,
        "prediction": result,
        "is_price_spike": is_anomaly,
        "alert": "⚠️ Unusual price detected!" if is_anomaly else None,
    }

@app.get("/predict/{product}")
def predict_get(product: str, days: int = 7):
    key = next((k for k in PRICE_HISTORY if product in k or k in product), None)

    if not key:
        return {"product": product, "error": "No data found", "trend": "unknown"}

    history = PRICE_HISTORY[key]
    result = predict_price(history, days)
    is_anomaly = detect_anomaly(history)

    return {
        "product": product,
        "history": history,
        "prediction": result,
        "is_price_spike": is_anomaly,
        "alert": "⚠️ Unusual price detected!" if is_anomaly else None,
    }