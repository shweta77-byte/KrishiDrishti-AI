import "./ConfidenceAlert.css";

function ConfidenceAlert({ result }) {

    if (!result) return null;

    const confidence = Math.round(result.confidence);

    let color = "#16a34a";
    let title = "🟢 Very High Confidence";
    let message = "Prediction is highly reliable.";

    if (confidence < 90) {

        color = "#eab308";
        title = "🟡 Good Confidence";
        message = "Prediction is reliable but monitoring is recommended.";

    }

    if (confidence < 75) {

        color = "#f97316";
        title = "🟠 Moderate Confidence";
        message = "Capture a clearer image for better accuracy.";

    }

    if (confidence < 60) {

        color = "#dc2626";
        title = "🔴 Low Confidence";
        message = "Please upload another image with better lighting and focus.";

    }

    return (

        <div
            className="confidence-alert"
            style={{ borderLeft: `8px solid ${color}` }}
        >

            <h2>{title}</h2>

            <p>{message}</p>

        </div>

    );

}

export default ConfidenceAlert;