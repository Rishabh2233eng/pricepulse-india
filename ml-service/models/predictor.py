import numpy as np
from sklearn.linear_model import LinearRegression

def predict_price(history: list, days_ahead: int = 7):
    if len(history) < 3:
        return {"predicted_price": history[-1], "trend": "stable", "confidence": 0}

    X = np.array(range(len(history))).reshape(-1, 1)
    y = np.array(history)

    model = LinearRegression()
    model.fit(X, y)

    future_x = np.array([[len(history) + days_ahead]])
    predicted = float(model.predict(future_x)[0])

    current = float(history[-1])
    change_pct = float(((predicted - current) / current) * 100)

    if change_pct > 2:
        trend = "rising"
    elif change_pct < -2:
        trend = "falling"
    else:
        trend = "stable"

    r2 = float(model.score(X, y))
    confidence = round(r2 * 100, 1)

    return {
        "current_price": round(current, 2),
        "predicted_price": round(predicted, 2),
        "change_percent": round(change_pct, 2),
        "trend": trend,
        "confidence": confidence,
        "days_ahead": days_ahead,
    }

def detect_anomaly(history: list) -> bool:
    if len(history) < 4:
        return False
    mean = float(np.mean(history[:-1]))
    std = float(np.std(history[:-1]))
    latest = float(history[-1])
    return bool(abs(latest - mean) > 2 * std)