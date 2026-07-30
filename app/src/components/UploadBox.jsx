import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";
import { checkImageQuality } from "../utils/imageQuality";
function UploadBox({ onPredict }) {
    const { language } = useContext(LanguageContext);

const text = translations[language];
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);
function processFile(file) {

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));

}

function handleImage(event) {

    processFile(event.target.files[0]);

}
function removeImage() {

    setSelectedImage(null);
    setPreview(null);

}

function handleDrag(e) {

    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {

        setDragActive(true);

    } else {

        setDragActive(false);

    }

}

function handleDrop(e) {

    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {

        processFile(e.dataTransfer.files[0]);

    }

}
    

    return (
        <div className="upload-card">
            <h2>{text.uploadTitle}</h2>

        

            <p className="upload-text">
                {text.uploadDescription}
            </p>

            <label
    className={`upload-area ${dragActive ? "drag-active" : ""}`}
    onDragEnter={handleDrag}
    onDragOver={handleDrag}
    onDragLeave={handleDrag}
    onDrop={handleDrop}
    onDragEnd={handleDrag}
>

                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="preview-image"
                    />
                ) : (
                    <>

<div className="upload-icon">
    🌿
</div>

<h3>Take a photo of your crop</h3>

<p>
Capture a clear image or choose one from your gallery.
</p>

<div className="upload-buttons">

<button
    className="camera-btn"
    onClick={(e)=>{
        e.preventDefault();
        document.getElementById("cameraInput").click();
    }}
>
    📷 Take Photo
</button>

<button
    className="gallery-btn"
    onClick={(e)=>{
        e.preventDefault();
        document.getElementById("galleryInput").click();
    }}
>
    🖼 Gallery
</button>

</div>

<p className="supported-files">
JPG • JPEG • PNG
</p>

</>
                )}

                <input
    id="cameraInput"
    type="file"
    accept="image/*"
    capture="environment"
    onChange={handleImage}
    hidden
/>

<input
    id="galleryInput"
    type="file"
    accept="image/*"
    onChange={handleImage}
    hidden
/>

                </label>

            {selectedImage && (

    <div className="file-info">

    <div className="file-details">

        <p>
            📂 <strong>{selectedImage.name}</strong>
        </p>

        <p>
            📏 {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
        </p>

    </div>

    <button
        className="remove-btn"
        onClick={removeImage}
    >
        🗑 Remove Photo
    </button>

</div>

)}

<button
    className="predict-btn"
    disabled={!selectedImage}
    onClick={() => {

        const quality = checkImageQuality(selectedImage);

        if (!quality.ok) {

            toast.error(quality.message);

            return;

        }

        onPredict(selectedImage);

    }}
>
    🌿 Check My Crop
</button>
        </div>
    );
}

export default UploadBox;
