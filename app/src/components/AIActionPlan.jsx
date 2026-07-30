import "./AIActionPlan.css";


function AIActionPlan({ result, weather }) {

    if (!result) return null;

    const diseaseName = result.class.replace(/_/g, " ");

    const humidity = weather?.main?.humidity || 50;

    const condition = weather?.weather?.[0]?.main || "";

    const disease = diseaseName.toLowerCase();

    const isHealthy = disease.includes("healthy");
let spreadRisk = "LOW";

if (!isHealthy) {

    if (humidity > 85 || condition === "Rain") {

        spreadRisk = "HIGH";

    }
    else if (humidity > 70) {

        spreadRisk = "MEDIUM";

    }

}
else {

    if (condition === "Rain") {

        spreadRisk = "MEDIUM";

    }

}

const risk = spreadRisk;

    if (!isHealthy) {

        if (humidity > 85 || condition === "Rain") {

            spreadRisk = "HIGH";

        }

        else if (humidity > 70) {

            spreadRisk = "MEDIUM";

        }

    }
    else {

        if (condition === "Rain") {

            spreadRisk = "MEDIUM";

        }

    }

    const color =
    spreadRisk === "HIGH"
        ? "#ef4444"
        : spreadRisk === "MEDIUM"
        ? "#eab308"
        : "#22c55e";

    const actions = [];

    if (disease.includes("healthy")) {

actions.push("🌱 Crop looks healthy.");
actions.push("💧 Continue regular irrigation.");

if (condition === "Rain") {

    actions.push("☔ Rain detected. Avoid preventive spraying today.");

}

actions.push("📷 Scan again after one week.");

    }

    else {

        actions.push("🍂 Remove infected leaves immediately.");

        if (humidity > 80)
            actions.push("💧 Avoid watering during evening.");

        if (condition === "Rain")
            actions.push("☔ Delay spraying until rain stops.");

        actions.push("🌿 Apply organic Neem Oil spray.");

        actions.push("📷 Scan the crop again after 48 hours.");

    }

    return (

        <div className="action-card">

            <h2>🧠 AI Action Plan</h2>

            <div
                className="risk-banner"
                style={{
                    background: color
                }}
            >

               {isHealthy
    ? `Weather Risk : ${risk}`
    : `Disease Spread Risk : ${risk}`}
            </div>

            <ul>

                {actions.map((item, index) => (

                    <li key={index}>

                        {item}

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default AIActionPlan;