function PredictionHistory({ history }) {

    if (!history || history.length === 0) {

        return (

            <div className="history-card">

                <h2>📊 Prediction History</h2>

                <p>No predictions yet.</p>

            </div>

        );

    }

    return (

        <div className="history-card">

            <h2>📊 Prediction History</h2>

            <table className="history-table">

                <thead>

                    <tr>

                        <th>Disease</th>
                        <th>Confidence</th>
                        <th>Time</th>

                    </tr>

                </thead>

                <tbody>

                    {history.map((item, index) => (

                        <tr key={index}>

                            <td>{item.disease}</td>

                            <td>{item.confidence}%</td>

                            <td>{item.time}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default PredictionHistory;
