function Dashboard({ history }) {

    const totalPredictions = history.length;

    const averageConfidence =
        totalPredictions > 0
            ? Math.round(
                  history.reduce(
                      (sum, item) => sum + item.confidence,
                      0
                  ) / totalPredictions
              )
            : 0;

    const lastDisease =
        totalPredictions > 0
            ? history[0].disease
            : "None";

    return (

        <div className="dashboard">

            <div className="dashboard-card">

                <h3>📊 Total Predictions</h3>

                <h1>{totalPredictions}</h1>

            </div>

            <div className="dashboard-card">

                <h3>🎯 Average Confidence</h3>

                <h1>{averageConfidence}%</h1>

            </div>

            <div className="dashboard-card">

                <h3>🌿 Last Disease</h3>

                <h2>{lastDisease}</h2>

            </div>

        </div>

    );

}

export default Dashboard;