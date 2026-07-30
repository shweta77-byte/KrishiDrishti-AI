import "./AIHealthScore.css";

function AIHealthScore({ result, weather }) {

    if (!result) return null;

    const confidence = Math.round(result.confidence);

    let score = confidence;

    if (weather) {

        const humidity = weather.main.humidity;

        if (humidity > 85)
            score -= 12;

        else if (humidity > 70)
            score -= 6;

    }

    score = Math.max(0, Math.min(100, score));

    let status = "";
    let color = "";

    if (score >= 90) {

        status = "Excellent";
        color = "#16a34a";

    }

    else if (score >= 75) {

        status = "Good";
        color = "#65a30d";

    }

    else if (score >= 60) {

        status = "Moderate";
        color = "#eab308";

    }

    else {

        status = "Critical";
        color = "#dc2626";

    }

    return (

        <div className="health-card">

            <h2>🌱 AI Crop Health Score</h2>

            <div
                className="score-circle"
                style={{
                    borderColor: color
                }}
            >

                <span>{score}</span>

            </div>

            <h3
                style={{
                    color
                }}
            >

                {status}

            </h3>

            <div className="health-details">

                <p>

                    🤖 AI Confidence

                    <strong>

                        {confidence}%

                    </strong>

                </p>

                <p>

                    🌿 Disease

                    <strong>

                        {result.class.replace(/_/g, " ")}

                    </strong>

                </p>

                {

                    weather &&

                    <p>

                        💧 Humidity

                        <strong>

                            {weather.main.humidity}%

                        </strong>

                    </p>

                }

            </div>

        </div>

    );

}

export default AIHealthScore;