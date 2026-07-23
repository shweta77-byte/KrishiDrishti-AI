const recommendations = {

    Tomato_healthy: {

    description:
        "The uploaded tomato leaf appears healthy with no visible signs of disease.",

    severity: "Low",

    symptoms: [

        "Bright green healthy leaves",

        "No yellow or brown spots",

        "No fungal growth",

        "Normal leaf texture"

    ],

    causes: [

        "Proper crop care",

        "Balanced soil nutrition",

        "Healthy environmental conditions"

    ],

    treatment: [

        "No treatment is required.",

        "Continue regular monitoring.",

        "Maintain current farming practices."

    ],

    expertAdvice:

        "Inspect the crop weekly and continue preventive monitoring to maintain healthy growth.",

    prevention: [

        "Continue regular watering",

        "Monitor leaves weekly",

        "Maintain balanced soil nutrition",

        "Ensure proper sunlight exposure"

    ]

},
    Tomato_Early_blight: {

        description:
            "Early Blight is a fungal disease causing concentric brown spots on leaves.",

        severity: "Medium",

        prevention: [
            "Remove infected foliage.",
            "Apply suitable fungicides.",
            "Avoid excessive moisture.",
            "Rotate crops every season."
        ]
    },

    Tomato_Late_blight: {

        description:
            "Late Blight spreads rapidly and can destroy tomato crops if untreated.",

        severity: "High",

        prevention: [
            "Remove infected plants immediately.",
            "Avoid water accumulation.",
            "Apply fungicide early.",
            "Monitor nearby plants daily."
        ]
    }

};

export default recommendations;