import "./AIFarmDoctor.css";

function AIFarmDoctor({ result, weather, diseaseInfo }) {

    if (!result) return null;


    const disease = result.class.replace(/_/g, " ");

    const confidence = Math.round(result.confidence);


    const humidity = weather?.main?.humidity || 0;

    const temperature = weather?.main?.temp || 0;

    const condition =
        weather?.weather?.[0]?.main || "Unknown";


    const severity =
        diseaseInfo?.severity || "Medium";


    const recovery =
        diseaseInfo?.expectedRecovery || "7-14 days";


    const isHealthy =
        disease.toLowerCase().includes("healthy");



    let spreadRisk = "LOW";

    let riskColor = "#16a34a";


    if (!isHealthy) {


        if (humidity > 85 || condition === "Rain") {

            spreadRisk = "HIGH";
            riskColor = "#dc2626";

        }

        else if (humidity > 70) {

            spreadRisk = "MEDIUM";
            riskColor = "#eab308";

        }

    }



    const priorityTitle = isHealthy
        ? "🟢 CROP STATUS : HEALTHY"
        : spreadRisk === "HIGH"
        ? "🔴 IMMEDIATE ACTION REQUIRED"
        : "🟡 ATTENTION REQUIRED";


    const priorityMessage = isHealthy
        ? "Continue regular crop monitoring."
        : spreadRisk === "HIGH"
        ? "Disease may spread rapidly. Start treatment immediately."
        : "Treat the crop within the next 2–3 days.";




    const organicTreatment =
        diseaseInfo?.organicSolution || [

            "Neem oil spray",

            "Remove infected leaves",

            "Maintain crop hygiene"

        ];



    const chemicalTreatment =
        diseaseInfo?.medicine || [

            "Copper fungicide",

            "Mancozeb"

        ];



    const actions =
        diseaseInfo?.prevention || [

            "Monitor crop regularly",

            "Maintain proper irrigation"

        ];



    return (

        <div className="doctor-card">


            <div
                className="priority-alert"
                style={{
                    background:
                    isHealthy
                    ? "#16a34a"
                    : spreadRisk==="HIGH"
                    ? "#dc2626"
                    : "#eab308"
                }}
            >

                <h2>{priorityTitle}</h2>

                <p>{priorityMessage}</p>

            </div>



            <h2>
                🩺 AI Farm Doctor Report
            </h2>



            <div className="doctor-grid">


                <div>

                    <h3>🌿 Disease</h3>

                    <p>{disease}</p>

                </div>



                <div>

                    <h3>🤖 AI Confidence</h3>

                    <p>
                        {confidence}%
                    </p>

                </div>



                <div>

                    <h3>⚠ Severity</h3>

                    <p>
                        {severity}
                    </p>

                </div>



                <div>

                    <h3>🌡 Temperature</h3>

                    <p>
                        {temperature} °C
                    </p>

                </div>



                <div>

                    <h3>💧 Humidity</h3>

                    <p>
                        {humidity}%
                    </p>

                </div>



                <div>

                    <h3>☁ Weather</h3>

                    <p>
                        {condition}
                    </p>

                </div>



                <div>

                    <h3>⏳ Recovery</h3>

                    <p>
                        {recovery}
                    </p>

                </div>



                <div>

                    <h3>⚠ Spread Risk</h3>

                    <p
                    style={{
                        color:riskColor
                    }}
                    >

                        {spreadRisk}

                    </p>

                </div>



            </div>




            <hr />



            <h3>
                🌱 Organic Treatment
            </h3>


            <ul>

            {
                organicTreatment.map(
                    (item,index)=>(

                    <li key={index}>
                        🌿 {item}
                    </li>

                    )
                )
            }

            </ul>




            {!isHealthy && (

            <>

            <h3>
                🧪 Chemical Treatment
            </h3>


            <ul>

            {

            chemicalTreatment.map(
                (item,index)=>(

                <li key={index}>
                    💊 {item}
                </li>

                )
            )

            }

            </ul>

            </>

            )}





            <h3>
                📋 Immediate Action
            </h3>


            <ul>

            {

            actions.map(
                (item,index)=>(

                <li key={index}>
                    ✅ {item}
                </li>

                )
            )

            }

            </ul>




            <div className="recovery-card">

                <h3>
                    🌱 Recovery Advisory
                </h3>


                <p>
                    Expected Recovery:
                    <strong>
                        {" "}{recovery}
                    </strong>
                </p>


                <p>
                    ✔ Follow recommended treatment schedule.
                </p>


                <p>
                    ✔ Inspect nearby plants.
                </p>


            </div>





            <div className="explanation-card">

                <h3>
                    🤖 Why This Recommendation?
                </h3>


                <p>
                    ✔ Disease identified using CNN model.
                </p>


                <p>
                    ✔ Confidence score:
                    {confidence}%
                </p>


                <p>
                    ✔ Weather condition:
                    {condition}
                </p>


                <p>
                    ✔ Humidity:
                    {humidity}%
                </p>


                <p>
                    ✔ Risk calculated using agricultural rules.
                </p>


            </div>





            <div className="doctor-warning">

            {
                isHealthy
                ?
                "✅ Crop is healthy. Continue preventive monitoring."
                :
                "⚠ Early treatment is recommended to reduce disease spread."
            }

            </div>


        </div>

    );

}


export default AIFarmDoctor;