import "./SeverityHeatmap.css";

function SeverityHeatmap({ result }) {

    if (!result) return null;

    const disease = result.class.toLowerCase();
    const confidence = Math.round(result.confidence);

    const healthy = disease.includes("healthy");

    const affected = healthy
        ? 5
        : Math.min(100 - confidence + 20, 90);

    const healthyArea = 100 - affected;

    return (

        <div className="heatmap-card">

            <h2>🟩 Leaf Health Index</h2>

            <div className="heat-row">

                <span>Healthy Tissue</span>

                <progress
                    max="100"
                    value={healthyArea}
                />

                <span>{healthyArea}%</span>

            </div>

            <div className="heat-row">

                <span>Affected Tissue</span>

                <progress
                    max="100"
                    value={affected}
                />

                <span>{affected}%</span>

            </div>

            <h3>

                {healthy
                    ? "🟢 Safe Zone"
                    : affected > 40
                    ? "🔴 Critical Zone"
                    : "🟡 Moderate Zone"}

            </h3>

        </div>

    );

}

export default SeverityHeatmap;