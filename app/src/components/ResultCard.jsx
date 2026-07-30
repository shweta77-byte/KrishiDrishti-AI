import { useContext, useEffect } from "react";


import { generateReport } from "../utils/generateReport";
import recommendations from "../data/recommendations";
console.log("RECOMMENDATIONS FILE LOADED", recommendations);

import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";

import diseaseTranslations from "../data/diseaseTranslations";
function ResultCard({ result, setDiseaseInfo }) {

    const { language } = useContext(LanguageContext);

    const text = translations[language];



    if (!result) return null;

    const confidence = Math.round(result.confidence);
    const translatedDisease =
    diseaseTranslations[language][result.class.replace(/_/g, " ")]
    || result.class.replace(/_/g, " ");
    const diseaseData = recommendations[result.class];

console.log("RESULT.CLASS:", result.class);
console.log("FOUND DISEASE:", diseaseData);

const diseaseInfo =
    diseaseData?.[language] || {
        
        
        description: "No additional information available.",
        severity: "Unknown",
        prevention: [
            "Consult an agricultural expert."
        ]
    };
    useEffect(() => {

    console.log("SENDING DISEASE INFO:", diseaseInfo);

    if(setDiseaseInfo){
        setDiseaseInfo(diseaseInfo);
    }

}, [diseaseInfo]);

console.log("LANGUAGE:", language);
console.log("DISEASE INFO:", diseaseInfo);

const speakDiagnosis = () => {

    if (!result) return;

    const disease = result.class.replace(/_/g, " ");

    const confidence = Math.round(result.confidence);

    const text = `
        Disease detected: ${disease}.
        Confidence level: ${confidence} percent.
        Please read the treatment recommendations carefully.
    `;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);

};

    return (

        <div className="result-card">

           <div className="result-header">

    <h2>🧠 {text.diagnosisReport}</h2>

    <p>
        AI-powered plant disease analysis with confidence score and treatment recommendations.
    </p>

</div>

            <div className="result-item">

                <strong>🌿 {text.disease}</strong>

                <span
    className={`disease-badge ${
        result.class.toLowerCase().includes("healthy")
            ? "healthy-badge"
            : "disease-badge-red"
    }`}
>
    {translatedDisease}
</span>

            </div>
           {result.class.toLowerCase().includes("healthy") ? (

    <div className="health-banner healthy">

        <h3>🟢 {text.healthyPlant}</h3>

        <p>
            {text.noDisease}
        </p>

    </div>

) : (

    <div className="health-banner diseased">

        <h3>🔴 {text.diseaseDetected}</h3>

       <p>
    {text.diseaseMessage}
</p>

    </div>

)}





            <div className="result-item">

                <strong>📊 {text.confidenceLabel}</strong>

                <span>

                    {confidence}%

                    <br />

                    <small className="confidence-label">

                        {confidence >= 80
    ? text.highConfidence
    : confidence >= 60
    ? text.mediumConfidence
    : text.lowConfidence}

                    </small>

                </span>

            </div>

            <div className="progress-bar">

                <div
    className="progress-fill"
    style={{
        width: `${confidence}%`,
        transition: "width 1.2s ease"
    }}
/>

            </div>

            <div className="result-section">

                <h3>📝 {text.description}</h3>

                <p>{diseaseInfo.description}</p>

            </div>
            <div className="result-section">

    <h3>🍂 {text.symptoms}</h3>

    <ul className="recommendation-list">
        {diseaseInfo.symptoms?.map((item, index) => (

            <li key={index}>
                🔸 {item}
            </li>

        ))}
    </ul>

</div>
<div className="result-section">

    <h3>⚠ {text.causes}</h3>

    <ul className="recommendation-list">

        {(diseaseInfo.causes || [
    "Cause information unavailable. Consult local agricultural expert."
]).map((item, index) => (

    <li key={index}>
        ⚠ {item}
    </li>

))}

    </ul>


</div>
<div className="result-section">

    <h3>💊 {text.treatment}</h3>

    <ul className="recommendation-list">

        {(diseaseInfo.treatment || [
    "Treatment information unavailable. Consult local agricultural expert."
]).map((item, index) => (

    <li key={index}>
        💊 {item}
    </li>

))}
    </ul>

</div>
{diseaseInfo.medicine?.length > 0 && (

<div className="result-section">

    <h3>🧪 {text.recommendedMedicines}</h3>

    <ul className="recommendation-list">

        {diseaseInfo.medicine.map((item, index) => (

            <li key={index}>
                💉 {item}
            </li>

        ))}

    </ul>

</div>

)}
{diseaseInfo.organicSolution?.length > 0 && (

<div className="result-section">

    <h3>🌱 {text.organicSolution}</h3>

    <ul className="recommendation-list">

        {diseaseInfo.organicSolution.map((item, index) => (

            <li key={index}>
                🌿 {item}
            </li>

        ))}

    </ul>

</div>

)}
{diseaseInfo.fertilizer?.length > 0 && (

<div className="result-section">

    <h3>🚜 {text.fertilizerRecommendation}</h3>

    <ul className="recommendation-list">

        {diseaseInfo.fertilizer.map((item, index) => (

            <li key={index}>
                🌾 {item}
            </li>

        ))}

    </ul>

</div>

)}
{diseaseInfo.watering && (

<div className="result-section">

    <h3>💧 {text.wateringAdvice}</h3>

    <p>{diseaseInfo.watering}</p>

</div>

)}
            <div className="result-section">

                <h3>⚠ {text.severity}</h3>

                <span
    className={`severity ${
        diseaseInfo.severity.toLowerCase() === "high"
            ? "severity-high"
            : diseaseInfo.severity.toLowerCase() === "medium"
            ? "severity-medium"
            : "severity-low"
    }`}
>
    {diseaseInfo.severity}
</span>

            </div>
            <div className="result-section">

    <h3>👨‍🌾 {text.expertAdvice}</h3>

    <p>{diseaseInfo.expertAdvice}</p>

</div>

{diseaseInfo.expectedRecovery && (

<div className="result-section">

    <h3>⏳ {text.expectedRecovery}</h3>

    <p>{diseaseInfo.expectedRecovery}</p>

</div>

)}

            <div className="result-section">

                <h3>✅ {text.recommendedActions}</h3>

                <ul className="recommendation-list">

                    {(diseaseInfo.prevention || [
    "Preventive information unavailable."
]).map((item, index) => (
                        <li key={index}>
                            ✅ {item}
                        </li>

                    ))}

                </ul>

            </div>

           <button
    className="voice-btn"
    onClick={speakDiagnosis}
>
    🔊 Listen to Diagnosis
</button>
 <button
    className="download-report-btn"
    onClick={() => generateReport(result, diseaseInfo)}
>
    📄 Download AI Diagnosis Report
</button>

        </div>

    );

}

export default ResultCard;