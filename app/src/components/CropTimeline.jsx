import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function CropTimeline({ history }) {

    const { language } = useContext(LanguageContext);

    if (!history || history.length === 0) {

        return (

            <div className="timeline-card">

                <h2>📈 Crop Health Timeline</h2>

                <p>No prediction history available.</p>

            </div>

        );

    }

    return (

        <div className="timeline-card">

            <h2>📈 Crop Health Timeline</h2>

            <div className="timeline">

                {[...history].reverse().map((item, index) => (

                    <div
                        className="timeline-item"
                        key={index}
                    >

                        <div className="timeline-dot"></div>

                        <div className="timeline-content">

                            <h3>
                                {item.disease.replace(/_/g, " ")}
                            </h3>

                            <p>
                                Confidence : {item.confidence}%
                            </p>

                            <small>{item.time}</small>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default CropTimeline;