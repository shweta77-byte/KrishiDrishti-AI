import axios from "axios";

const API = axios.create({
    baseURL: "https://krishidrishti-ai-1.onrender.com"
});

export async function predictDisease(imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await API.post("/predict", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}