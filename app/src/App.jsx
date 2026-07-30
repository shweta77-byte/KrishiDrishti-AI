import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import recommendations from "./data/recommendations";
import { predictDisease } from "./services/api";


import Header from "./components/Header";
import AIFarmDoctor from "./components/AIFarmDoctor";
import ConfidenceMeter from "./components/ConfidenceMeter";
import ExplainableAI from "./components/ExplainableAI";


import AIInsights from "./components/AIInsights";
import AIHealthScore from "./components/AIHealthScore";
import AIActionPlan from "./components/AIActionPlan";
import AISummary from "./components/AISummary";
import OfflineBanner from "./components/OfflineBanner";
import SmartRecommendation from "./components/SmartRecommendation";
import CropTimeline from "./components/CropTimeline";
import NetworkStatus from "./components/NetworkStatus";
import FarmerProfile from "./components/FarmerProfile";
import OfflineStatus from "./components/OfflineStatus";
import DiseaseProgress from "./components/DiseaseProgress";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import WeatherCard from "./components/WeatherCard";
import CommunityAlert from "./components/CommunityAlert";
import UploadBox from "./components/UploadBox";
import SeverityHeatmap from "./components/SeverityHeatmap";
import ConfidenceAlert from "./components/ConfidenceAlert";
import ResultCard from "./components/ResultCard";
import PredictionHistory from "./components/PredictionHistory";
import LoadingOverlay from "./components/LoadingOverlay";
import DiseaseRisk from "./components/DiseaseRisk";
import OfflineAICapability from "./components/OfflineAICapability";
import Footer from "./components/Footer";
import ModelInfo from "./components/ModelInfo";





function App() {

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [weather, setWeather] = useState(null);

    const diseaseInfo = result
        ? recommendations[result.class]?.English
        : null;
        console.log("RESULT FROM APP:", result);

console.log("RESULT CLASS:", result?.class);

console.log(
    "RECOMMENDATION MATCH:",
    recommendations[result?.class]
);

    const [history, setHistory] = useState(() => {

        const savedHistory = localStorage.getItem("predictionHistory");

        return savedHistory ? JSON.parse(savedHistory) : [];

    });
useEffect(() => {

        localStorage.setItem(
            "predictionHistory",
            JSON.stringify(history)
        );

    }, [history]);
    useEffect(() => {

    console.log(
        "UPDATED DISEASE INFO:",
        diseaseInfo
    );

}, [diseaseInfo]);


    async function handlePrediction(image) {

        setLoading(true);

        try {

            const response = await predictDisease(image);
            console.log("MODEL OUTPUT:", response.class);
            console.log("Detected Disease:", response.class);
            console.log(response.class);

            await new Promise(resolve =>
                setTimeout(resolve, 2500)
            );

            setResult(response);
            toast.success(
    `🌿 ${response.class.replace(/_/g, " ")} detected successfully!`
);

            const newPrediction = {

                disease: response.class.replace(/_/g, " "),

                confidence: Math.round(response.confidence),

                time: new Date().toLocaleTimeString()

            };

            setHistory(prev => [

                newPrediction,

                ...prev

            ].slice(0, 20));

        }

        catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.detail ||
                "❌ Unable to analyze the image. Please try again."
            );
        }

        finally {

            setLoading(false);

        }

    }
    function deletePrediction(index) {

    const updatedHistory = history.filter(
        (_, i) => i !== index
    );

    setHistory(updatedHistory);

    toast.info("🗑 Prediction removed");

}

function clearHistory() {

    setHistory([]);

    toast.warning("🧹 Prediction history cleared");

}

   return (

<div className="container">

<OfflineBanner />

<Header />

<FarmerProfile />

        <Dashboard history={history} />

        <Analytics history={history} />

        <WeatherCard setWeather={setWeather} />

        <UploadBox onPredict={handlePrediction} />

        ...
           {loading && <LoadingOverlay />}

<ResultCard
    result={result}
/>
<ConfidenceMeter
    confidence={result?.confidence}
/>

<AISummary
    result={result}
    weather={weather}
/>

<AIHealthScore
    result={result}
    weather={weather}
/>

<SeverityHeatmap
    result={result}
/>

<ConfidenceAlert
    result={result}
/>

<AIActionPlan
    result={result}
    weather={weather}
/>

<SmartRecommendation
    result={result}
    weather={weather}
/>

<AIFarmDoctor
    result={result}
    weather={weather}
    diseaseInfo={diseaseInfo}
/>

<ExplainableAI
    result={result}
    weather={weather}
/>
<AIInsights
    result={result}
    weather={weather}
/>

<DiseaseRisk
    weather={weather}
    result={result}
/>
<PredictionHistory
   history={history}
   onDelete={deletePrediction}
   onClear={clearHistory}
/>

<ModelInfo />

<Footer />

<DiseaseProgress history={history} />

<CropTimeline history={history} />

<ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    pauseOnFocusLoss={false}
    theme="colored"
/>

</div>

    );

}

export default App;