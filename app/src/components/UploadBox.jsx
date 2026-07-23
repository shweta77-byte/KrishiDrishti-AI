import { useState } from "react";

function UploadBox({ onPredict }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    function handleImage(event) {
        const file = event.target.files[0];

        if (!file) return;

        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    }

    return (
        <div className="upload-card">

            <h2>Upload Plant Leaf</h2>

            <p className="upload-text">
                Upload a clear image of a plant leaf to identify diseases using AI.
            </p>

            <label className="upload-area">

                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="preview-image"
                    />
                ) : (
                    <>
                        <div className="upload-icon">🌿</div>

                        <h3>Drag & Drop</h3>

                        <p>or click to browse your image</p>
                    </>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    hidden
                />
            </label>

            <button
                disabled={!selectedImage}
                onClick={() => onPredict(selectedImage)}
            >
                🔍 Predict Disease
            </button>

        </div>
    );
}

export default UploadBox;
