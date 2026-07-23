import numpy as np
import tensorflow as tf
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]

MODEL_PATH = PROJECT_ROOT / "ai-model" / "models" / "plant_disease_model.keras"

DATASET_PATH = PROJECT_ROOT / "dataset" / "PlantVillage"

IMAGE_SIZE = (224, 224)

class_names = sorted(
    folder.name
    for folder in DATASET_PATH.iterdir()
    if folder.is_dir()
)

model = tf.keras.models.load_model(MODEL_PATH)

def predict(image):

    image = tf.keras.utils.img_to_array(image)
    image = tf.expand_dims(image, axis=0)

    prediction = model.predict(image, verbose=0)

    predicted_index = np.argmax(prediction)

    confidence = float(np.max(prediction) * 100)

    return {
        "class": class_names[predicted_index],
        "confidence": round(confidence, 2)
    }