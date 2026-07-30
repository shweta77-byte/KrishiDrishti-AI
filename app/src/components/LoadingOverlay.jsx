import { useEffect, useState } from "react";

function LoadingOverlay() {

    const steps = [
        {
            icon: "📤",
            text: "Uploading plant image..."
        },
        {
            icon: "🌿",
            text: "Examining leaf structure..."
        },
        {
            icon: "🧠",
            text: "AI model is identifying disease..."
        },
        {
            icon: "🔍",
            text: "Comparing with PlantVillage dataset..."
        },
        {
            icon: "📊",
            text: "Calculating confidence score..."
        },
        {
            icon: "🌦",
            text: "Analyzing weather impact..."
        },
        {
            icon: "💊",
            text: "Generating treatment recommendations..."
        },
        {
            icon: "📄",
            text: "Preparing AI diagnosis report..."
        }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentStep((prev) =>
                prev === steps.length - 1 ? prev : prev + 1
            );

        }, 450);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="loading-overlay">

            <div className="loading-box">

                <div className="plant-loader">
                    🌿
                </div>

                <h2>KrishiDrishti AI</h2>

                <h3>
                    {steps[currentStep].icon}{" "}
                    {steps[currentStep].text}
                </h3>

                <div className="loader"></div>

                <div style={{ marginTop: 20 }}>

                    {steps.map((step, index) => (

                        <p
                            key={index}
                            style={{
                                color:
                                    index <= currentStep
                                        ? "#15803d"
                                        : "#999",
                                fontWeight:
                                    index === currentStep
                                        ? "bold"
                                        : "normal",
                                margin: "8px 0"
                            }}
                        >
                            {index < currentStep
                                ? "✅"
                                : index === currentStep
                                ? "⏳"
                                : "⬜"}{" "}
                            {step.text}
                        </p>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default LoadingOverlay;