import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";
import diseaseTranslations from "../data/diseaseTranslations";
function PredictionHistory({ history, onDelete, onClear }) {
    const { language } = useContext(LanguageContext);
const text = translations[language];

    if (!history || history.length === 0) {

        return (

            <div className="history-card">

                <h2>📊 {text.predictionHistory}</h2>

<p>{text.noPredictions}</p>

            </div>

        );

    }

    return (

        <div className="history-card">

            <h2>📊 {text.predictionHistory}</h2>

            <table className="history-table">

                <thead>

                    <tr>

                        <th>{text.historyDisease}</th>
<th>{text.historyConfidence}</th>
<th>{text.historyTime}</th>

                    </tr>

                </thead>

                <tbody>

                    {history.map((item, index) => (

                        <tr key={index}>

                            <td>
    {diseaseTranslations[language]?.[item.disease] || item.disease}
</td>

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
