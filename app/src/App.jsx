import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UploadBox from "./components/UploadBox";
import ResultCard from "./components/ResultCard";
import PredictionHistory from "./components/PredictionHistory";
import LoadingOverlay from "./components/LoadingOverlay";

import { predictDisease } from "./services/api";

function App() {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    async function handlePrediction(image) {

        setLoading(true);

        try {

            const response = await predictDisease(image);

            await new Promise(resolve =>
                setTimeout(resolve, 2500)
            );

            setResult(response);

            const newPrediction = {

                disease: response.class.replace(/_/g, " "),

                confidence: Math.round(response.confidence),

                time: new Date().toLocaleTimeString()

            };

            setHistory(prev => [

                newPrediction,

                ...prev

            ].slice(0, 5));

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.detail ||

                error.message ||

                "Prediction failed."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="container">

            <Header />

            <Dashboard history={history} />

            <UploadBox onPredict={handlePrediction} />

            {loading && <LoadingOverlay />}

            <ResultCard result={result} />

            <PredictionHistory history={history} />

        </div>

    );

}

export default App;