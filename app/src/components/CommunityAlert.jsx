import "./CommunityAlert.css";

const alerts = [

    {
        district: "Ahmedabad",
        disease: "Early Blight",
        risk: "High"
    },

    {
        district: "Rajkot",
        disease: "Leaf Mold",
        risk: "Medium"
    },

    {
        district: "Surat",
        disease: "Healthy Crop",
        risk: "Low"
    }

];

function CommunityAlert() {

    return (

        <div className="community-card">

            <h2>📢 Community Crop Alert (Demo)</h2>

            {alerts.map((item,index)=>(

                <div
                    key={index}
                    className="community-item"
                >

                    <h3>{item.district}</h3>

                    <p>{item.disease}</p>

                    <strong>{item.risk} Risk</strong>

                </div>

            ))}

        </div>

    );

}

export default CommunityAlert;