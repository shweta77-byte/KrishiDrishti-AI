import "./ModelInfo.css";

function ModelInfo(){

    return(

        <div className="model-card">

            <h2>🧠 AI Model Information</h2>

            <div className="model-grid">

                <div>
                    <h3>Model</h3>
                    <p>CNN Image Classifier</p>
                </div>


                <div>
                    <h3>Dataset</h3>
                    <p>PlantVillage Dataset</p>
                </div>


                <div>
                    <h3>Supported Crops</h3>
                    <p>
                        Potato, Tomato, Pepper Bell
                    </p>
                </div>


                <div>
                    <h3>Disease Classes</h3>
                    <p>15 Classes</p>
                </div>


                <div>
                    <h3>Framework</h3>
                    <p>
                        TensorFlow / Keras
                    </p>
                </div>


                <div>
                    <h3>Inference</h3>
                    <p>
                        Real-time Prediction
                    </p>
                </div>

            </div>


        </div>

    );

}

export default ModelInfo;