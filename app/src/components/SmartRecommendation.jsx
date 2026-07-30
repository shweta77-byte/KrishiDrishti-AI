import getWeatherRecommendation from "../utils/weatherRecommendations";

function SmartRecommendation({ weather, result }) {

    if (!weather || !result) return null;

    const crop =
    result.class.split("___")[0] || "Crop";
    const recommendations = getWeatherRecommendation(
        weather,
        result.class,
        crop
    );

    return (

        <div className="smart-card">

            <h2>🧠 Smart Weather Recommendations</h2>

            <p>
                Personalized advice for <strong>{crop}</strong>
            </p>

            <ul>

                {recommendations.map((item, index) => (

                    <li key={index}>
                        {item}
                    </li>

                ))}

            </ul>

        </div>

    );

}

export default SmartRecommendation;