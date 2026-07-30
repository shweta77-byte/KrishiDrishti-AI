import { useEffect, useState } from "react";

function FarmerProfile() {

    const [crop, setCrop] = useState(
        localStorage.getItem("selectedCrop") || ""
    );

    const crops = [
        "🍅 Tomato",
        "🥔 Potato",
        "🌾 Wheat",
        "🌽 Maize",
        "🍆 Brinjal",
        "🍎 Apple",
        "🌶 Chili",
        "🥒 Cucumber"
    ];

    useEffect(() => {

        if(crop){

            localStorage.setItem(
                "selectedCrop",
                crop
            );

        }

    },[crop]);

    return(

        <div className="farmer-card">

            <h2>🌾 My Crop</h2>

            <select
                value={crop}
                onChange={(e)=>setCrop(e.target.value)}
            >

                <option value="">
                    Select Crop
                </option>

                {crops.map(crop=>(
                    <option
                        key={crop}
                        value={crop}
                    >
                        {crop}
                    </option>
                ))}

            </select>

            {crop && (

                <p>

                    🌱 Monitoring:

                    <strong> {crop}</strong>

                </p>

            )}

        </div>

    );

}

export default FarmerProfile;