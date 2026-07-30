import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";

function DiseaseRisk({ weather, result }) {

    const { language } = useContext(LanguageContext);
    const text = translations[language];

    if (!weather || !result) return null;

    const humidity = weather.main.humidity;
    const temperature = weather.main.temp;
    const wind = weather.wind.speed;
    const condition = weather.weather[0].main;

    let risk = "Low";
    let message = text.lowRisk;

    const advice = [];

    // ---------------- Risk Calculation ----------------

    if (humidity > 80 || condition === "Rain") {
        risk = "Medium";
        message = text.mediumRisk;
    }

    if (humidity > 90 && condition === "Rain") {
        risk = "High";
        message = text.highRisk;
    }

    // ---------------- Smart Weather Advice ----------------

    if (humidity > 80) {
        advice.push("💧 High humidity can promote fungal diseases.");
        advice.push("🌿 Improve air circulation around plants.");
    }

    if (condition === "Rain") {
        advice.push("☔ Avoid spraying pesticides during rain.");
    }

    if (temperature > 35) {
        advice.push("☀ Water crops early morning or evening.");
    }

    if (temperature < 15) {
        advice.push("🥶 Cold weather may slow plant growth.");
    }

    if (wind > 15) {
        advice.push("💨 Avoid spraying chemicals on windy days.");
    }

    // ---------------- Disease-Specific Advice ----------------

    const disease = result.class.toLowerCase();

    if (disease.includes("blight")) {
        advice.push("🧪 Spray Mancozeb or Copper-based fungicide.");
        advice.push("🍂 Remove infected leaves immediately.");
    }

    if (disease.includes("healthy")) {
        advice.push("✅ Your crop looks healthy. Continue regular monitoring.");
    }

    if (disease.includes("rust")) {
        advice.push("🌱 Avoid excessive leaf wetness.");
    }

    if (disease.includes("mildew")) {
        advice.push("🌬 Increase spacing between plants.");
    }

    return (

        <div className="risk-card">

            <h2>⚠ {text.riskTitle}</h2>

            <h3>

                {text.riskLevel} :

                <span className={risk.toLowerCase()}>
                    {" "}{risk}
                </span>

            </h3>

            <p>{message}</p>

            <h4 style={{marginTop:"20px"}}>

                🌾 Smart Farming Recommendations

            </h4>

            <ul>

                {advice.map((item,index)=>(

                    <li key={index}>{item}</li>

                ))}

            </ul>

        </div>

    );

}

export default DiseaseRisk;