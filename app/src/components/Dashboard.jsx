import { useContext, useEffect, useState } from "react";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";
import diseaseTranslations from "../data/diseaseTranslations";
function Dashboard({ history }) {
    const { language } = useContext(LanguageContext);

const text = translations[language];
const [displayPredictions, setDisplayPredictions] = useState(0);
const [displayConfidence, setDisplayConfidence] = useState(0);
const [displayHealthy, setDisplayHealthy] = useState(0);
const [displayDiseased, setDisplayDiseased] = useState(0);

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

    const healthyCount = history.filter(item =>
        item.disease.toLowerCase().includes("healthy")
    ).length;

    const diseasedCount = totalPredictions - healthyCount;
    const healthyPercentage =
    totalPredictions > 0
        ? Math.round((healthyCount / totalPredictions) * 100)
        : 0;

const diseasedPercentage =
    totalPredictions > 0
        ? Math.round((diseasedCount / totalPredictions) * 100)
        : 0;

    const lastDisease =
    totalPredictions > 0
        ? diseaseTranslations[language][history[0].disease]
          || history[0].disease
        : "None";
       useEffect(() => {
    const timers = [];

    const animateValue = (target, setter) => {
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 30));

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                setter(target);
                clearInterval(timer);
            } else {
                setter(current);
            }
        }, 20);

        timers.push(timer);
    };

    animateValue(totalPredictions, setDisplayPredictions);
    animateValue(averageConfidence, setDisplayConfidence);
    animateValue(healthyCount, setDisplayHealthy);
    animateValue(diseasedCount, setDisplayDiseased);

    return () => timers.forEach(clearInterval);
}, [
    totalPredictions,
    averageConfidence,
    healthyCount,
    diseasedCount
]);

    return (

        <div className="dashboard">

            <div className="dashboard-card total-card">
                <h3>📊 {text.dashboardPredictions}</h3>
                <h1>{displayPredictions}</h1>
                <p className="dashboard-subtitle">
    {totalPredictions > 0
        ? "📈 Active Prediction History"
        : "📂 No Predictions Yet"}
</p>
            </div>

            <div className="dashboard-card confidence-card">
                <h3>🎯 {text.dashboardConfidence}</h3>
                <h1>{displayConfidence}%</h1>
                <div className="confidence-badge">
    {averageConfidence >= 90
        ? "🟢 Excellent"
        : averageConfidence >= 75
        ? "🟡 Good"
        : "🔴 Low"}
</div>
                <p className="dashboard-subtitle">
    AI Confidence Score
</p>
            </div>

            <div className="dashboard-card healthy-card">
    <h3>🟢 {text.healthyPlants}</h3>

    <h1>{displayHealthy}</h1>

    <p>{healthyPercentage}%</p>
    <p className="dashboard-subtitle">
    {healthyPercentage}% Healthy
</p>

</div>

           <div className="dashboard-card diseased-card">
    <h3>🔴 {text.diseasedPlants}</h3>

    <h1>{displayDiseased}</h1>

    <p>{diseasedPercentage}%</p>
    <p className="dashboard-subtitle">
    {diseasedPercentage}% Diseased
</p>

</div>

            <div className="dashboard-card last-card">

    <h3>🌿 {text.lastDisease}</h3>

    <h2>
        {totalPredictions > 0
            ? lastDisease
            : text.noPredictions}
    </h2>

    {totalPredictions > 0 && (

        <>

            <p className="dashboard-subtitle">
                🤖 Confidence: {history[0].confidence}%
            </p>

            <p className="dashboard-subtitle">
                🕒 {history[0].time}
            </p>

        </>

    )}

</div>

        </div>
    );

}

export default Dashboard;