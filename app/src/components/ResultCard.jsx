import { generateReport } from "../utils/generateReport";
import recommendations from "../data/recommendations";

function ResultCard({ result }) {

    if (!result) return null;

    const confidence = Math.round(result.confidence);

    const diseaseInfo =
        recommendations[result.class] || {

            description: "No additional information available.",

            severity: "Unknown",

            prevention: [
                "Consult an agricultural expert."
            ]

        };

    return (

        <div className="result-card">

            <h2>🧠 AI Diagnosis Report</h2>

            <div className="result-item">

                <strong>🌿 Disease</strong>

                <span className="disease-badge">
                    {result.class.replace(/_/g, " ")}
                </span>

            </div>

            <div className="result-item">

                <strong>📊 Confidence</strong>

                <span>

                    {confidence}%

                    <br />

                    <small className="confidence-label">

                        {confidence >= 80
                            ? "High Confidence"
                            : confidence >= 60
                            ? "Medium Confidence"
                            : "Low Confidence"}

                    </small>

                </span>

            </div>

            <div className="progress-bar">

                <div
                    className="progress-fill"
                    style={{ width: `${confidence}%` }}
                />

            </div>

            <div className="result-section">

                <h3>📝 Description</h3>

                <p>{diseaseInfo.description}</p>

            </div>
            <div className="result-section">

    <h3>🍂 Symptoms</h3>

    <ul className="recommendation-list">

        {diseaseInfo.symptoms?.map((item, index) => (

            <li key={index}>
                🔸 {item}
            </li>

        ))}

    </ul>

</div>

            <div className="result-section">

                <h3>⚠ Severity</h3>

                <span className="severity">
                    {diseaseInfo.severity}
                </span>

            </div>

            <div className="result-section">

                <h3>✅ Recommended Actions</h3>

                <ul className="recommendation-list">

                    {diseaseInfo.prevention.map((item, index) => (

                        <li key={index}>
                            ✅ {item}
                        </li>

                    ))}

                </ul>

            </div>

            <button
                onClick={() => generateReport(result, diseaseInfo)}
            >
                📄 Download Report
            </button>

        </div>

    );

}

export default ResultCard;