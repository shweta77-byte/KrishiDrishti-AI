function AISummary({ result, weather }) {

    if (!result || !weather) return null;

    const disease = result.class.replace(/_/g, " ");
    const confidence = Math.round(result.confidence);

    const humidity = weather.main.humidity;
    const temperature = weather.main.temp;
    const condition = weather.weather[0].main;

    const healthy =
        disease.toLowerCase().includes("healthy");

    return (

        <div className="summary-card">

            <h2>🧠 AI Summary</h2>

            <p>

                The uploaded leaf appears

                <strong>

                    {healthy ? " healthy " : ` affected by ${disease} `}

                </strong>

                with

                <strong> {confidence}% </strong>

                confidence.

            </p>

            <p>

                Current weather is

                <strong> {condition}</strong>

                with

                <strong> {humidity}% </strong>

                humidity and

                <strong> {temperature}°C</strong>.

            </p>

            <p>

                {

                    healthy

                    ?

                    "Preventive monitoring is recommended to maintain crop health."

                    :

                    "Immediate treatment is recommended to reduce disease spread."

                }

            </p>

        </div>

    );

}

export default AISummary;