function getWeatherRecommendation(weather, disease, crop) {

    const recommendations = [];

    if (!weather) return recommendations;

    const humidity = weather.main.humidity;
    const temperature = weather.main.temp;
    const condition = weather.weather[0].main;

    // Healthy Crop
    if (disease.toLowerCase().includes("healthy")) {

        recommendations.push(`✅ ${crop} looks healthy.`);

        recommendations.push("🌱 Continue monitoring every 3–4 days.");

    } else {

        recommendations.push(`⚠ Disease detected in ${crop}.`);

        recommendations.push("🧹 Remove infected leaves immediately.");

        recommendations.push("🚜 Apply treatment as recommended.");

    }

    // Weather Rules

    if (condition === "Rain") {

        recommendations.push("🌧 Rain detected. Avoid spraying chemicals today.");

    }

    if (humidity >= 80) {

        recommendations.push("💧 High humidity may encourage fungal growth.");

    }

    if (temperature >= 35) {

        recommendations.push("☀ Irrigate during early morning or evening.");

    }

    if (temperature <= 15) {

        recommendations.push("🥶 Protect plants from cold stress.");

    }

    // Crop-specific Advice

    if (crop.includes("Tomato")) {

        recommendations.push("🍅 Prune lower tomato leaves to improve airflow.");

    }

    if (crop.includes("Potato")) {

        recommendations.push("🥔 Inspect tubers regularly for blight symptoms.");

    }

    if (crop.includes("Maize")) {

        recommendations.push("🌽 Watch for fall armyworm damage.");

    }

    if (crop.includes("Wheat")) {

        recommendations.push("🌾 Monitor for rust and powdery mildew.");

    }

    return recommendations;

}

export default getWeatherRecommendation;