import "./ExplainableAI.css";

function ExplainableAI({ result, weather }) {

    if (!result) return null;

    const confidence = Math.round(result.confidence);

    const humidity = weather?.main?.humidity || 0;

    const temperature = weather?.main?.temp || 0;

    const condition = weather?.weather?.[0]?.main || "Unknown";

    return (

        <div className="explain-card">

            <h2>🤖 Explainable AI Decision</h2>

            <div className="explain-grid">

                <div>

                    <h3>AI Prediction</h3>

                    <p>

                        {result.class.replace(/_/g," ")}

                    </p>

                </div>

                <div>

                    <h3>Confidence</h3>

                    <p>

                        {confidence}%

                    </p>

                </div>

            </div>

           <ul>

<li>
✔ CNN image classifier analyzed leaf visual patterns.
</li>

<li>
✔ Prediction confidence:
{confidence}%
</li>

<li>
✔ Environmental factor considered:
Humidity {humidity}%
</li>

<li>
✔ Weather condition considered:
{condition}
</li>

<li>
✔ Disease symptoms matched with agricultural knowledge base.
</li>

<li>
✔ Treatment recommendations generated using disease + environmental conditions.
</li>

</ul>
<div className="ai-reason-card">

<h3>🔍 AI Reasoning Summary</h3>

<p>
The AI identified this disease by analyzing leaf patterns,
matching them with trained disease categories, and combining
environmental conditions for recommendation generation.
</p>

</div>
        </div>

    );

}

export default ExplainableAI;