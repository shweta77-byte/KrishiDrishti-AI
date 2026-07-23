function LoadingOverlay() {
    return (
        <div className="loading-overlay">

            <div className="loading-box">

                <h2>🧠 AI is Analyzing...</h2>

                <div className="loader"></div>

                <p>Loading AI Model...</p>

                <p>Extracting Leaf Features...</p>

                <p>Comparing Disease Patterns...</p>

                <p>Generating Diagnosis Report...</p>

            </div>

        </div>
    );
}

export default LoadingOverlay;