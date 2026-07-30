import "./ConfidenceMeter.css";

function ConfidenceMeter({ confidence }) {

    if (confidence === undefined || confidence === null)
        return null;

    const value = Math.round(confidence);

    let status = "";
    let color = "#16a34a";

    if (value >= 90) {

        status = "Excellent Prediction";
        color = "#16a34a";

    }

    else if (value >= 75) {

        status = "Good Prediction";
        color = "#eab308";

    }

    else {

        status = "Low Confidence";
        color = "#dc2626";

    }

    return (

        <div className="confidence-card">

            <h2>🤖 AI Confidence</h2>

            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{
                        width: `${value}%`,
                        background: color
                    }}
                />

            </div>

            <h3>{value}%</h3>

            <p style={{ color }}>

                {status}

            </p>

        </div>

    );

}

export default ConfidenceMeter;