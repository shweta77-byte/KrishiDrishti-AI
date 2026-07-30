from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from predictor import predict

app = FastAPI(
    title="KrishiDrishti AI",
    version="1.0.0"
)
from fastapi.middleware.cors import CORSMiddleware



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://krishi-drishti-ai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "KrishiDrishti AI Backend is running."
    }


@app.post("/predict")
async def predict_leaf(file: UploadFile = File(...)):

    image = Image.open(file.file).convert("RGB")
    image = image.resize((224, 224))

    result = predict(image)

    return result