import "./AIInsights.css";

function AIInsights({ result, weather }) {

    if (!result) return null;

    const confidence = Math.round(result.confidence);

    const humidity = weather?.main?.humidity || 0;

    const condition = weather?.weather?.[0]?.main || "Unknown";

    const insights = [];

    if (confidence > 90)
        insights.push("High AI confidence for this prediction.");

    if (humidity > 80)
        insights.push("High humidity may increase fungal disease spread.");

    if (condition === "Rain")
        insights.push("Rainy conditions require additional crop monitoring.");

    if (result.class.toLowerCase().includes("healthy"))
        insights.push("Crop appears healthy. Continue regular monitoring.");

    else {
        insights.push("Immediate treatment is recommended.");
        insights.push("Organic treatment options are available.");
        insights.push("Scan the crop again after 48 hours.");
    }

    return (

        <div className="insight-card">

            <h2>🧠 AI Insights</h2>

            <ul>

                {insights.map((item,index)=>(

                    <li key={index}>✔ {item}</li>

                ))}

            </ul>

        </div>

    );

}

export default AIInsights;