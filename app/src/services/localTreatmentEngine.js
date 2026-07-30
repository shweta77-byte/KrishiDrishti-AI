export function generateLocalizedAdvice(
    disease,
    weather
) {

    const advice = [];

    const diseaseName = disease.toLowerCase();

    const humidity =
        weather?.main?.humidity || 0;

    const condition =
        weather?.weather?.[0]?.main || "Unknown";



    // Fungal disease conditions

    if (
    diseaseName.includes("late blight") ||
    diseaseName.includes("early blight") ||
    diseaseName.includes("leaf mold") ||
    diseaseName.includes("septoria")
){
    advice.push(
    "Fungal disease detected. Maintain proper crop hygiene and remove infected leaves."
);

advice.push(
    "Apply neem oil spray as an organic preventive treatment."
);

        if (humidity > 70) {

            advice.push(
                "High humidity detected. Fungal disease spread risk is increased."
            );

            advice.push(
                "Avoid overhead irrigation and keep leaves dry."
            );

            advice.push(
                "Apply neem oil spray as a preventive organic measure."
            );

        }


        if (
            condition === "Rain" ||
            condition === "Clouds"
        ) {

            advice.push(
                "Cloudy/rainy conditions may support fungal growth. Improve plant ventilation."
            );

        }

    }



    // Bacterial disease

    if (
        disease.includes("Bacterial")
    ) {

        advice.push(
            "Maintain field hygiene and remove infected plant parts."
        );

        advice.push(
            "Avoid handling plants when leaves are wet."
        );

    }



    // Viral disease

    if (
        disease.includes("Virus") ||
        disease.includes("Mosaic")
    ) {

        advice.push(
            "No direct cure available. Remove infected plants to prevent spread."
        );

        advice.push(
            "Control insect vectors such as whiteflies."
        );

    }



    // General organic advice

    advice.push(
        "Use compost and organic soil management practices for better plant health."
    );


    return advice;

}