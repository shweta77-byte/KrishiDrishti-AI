import "./DiseaseProgress.css";

function DiseaseProgress({ history }) {

    if (!history || history.length < 2) return null;

    const latest = history[0];
    const previous = history[1];

    let status = "No Change";
    let color = "#eab308";

    if (latest.disease !== previous.disease) {

        if (
            latest.disease.toLowerCase().includes("healthy")
        ) {
            status = "Improved";
            color = "#16a34a";
        }
        else {
            status = "Disease Progressed";
            color = "#dc2626";
        }
    }

    return (

        <div className="progress-card">

            <h2>📈 Disease Progress Tracker</h2>

            <div className="progress-grid">

                <div className="progress-box">

                    <h3>Previous Scan</h3>

                    <p>{previous.disease}</p>

                    <small>{previous.time}</small>

                </div>

                <div className="progress-arrow">

                    ➜

                </div>

                <div className="progress-box">

                    <h3>Current Scan</h3>

                    <p>{latest.disease}</p>

                    <small>{latest.time}</small>

                </div>

            </div>

            <h3
                style={{
                    color,
                    marginTop: "20px"
                }}
            >
                {status}
            </h3>

        </div>

    );

}

export default DiseaseProgress;