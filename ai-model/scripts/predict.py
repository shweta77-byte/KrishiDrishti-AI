import tensorflow as tf
import numpy as np
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).resolve().parents[2]
MODEL_PATH = PROJECT_ROOT / "ai-model" / "models" / "plant_disease_model.keras"

IMAGE_SIZE = (224, 224)
DATASET_PATH = PROJECT_ROOT / "dataset" / "PlantVillage"

class_names = sorted(
    folder.name
    for folder in DATASET_PATH.iterdir()
    if folder.is_dir()
)



print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded.")

IMAGE_PATH = PROJECT_ROOT / "test_images" / "leaf.jpg"
image = tf.keras.utils.load_img(
    IMAGE_PATH,
    target_size=IMAGE_SIZE
)

image = tf.keras.utils.img_to_array(image)
image = np.expand_dims(image, axis=0)
prediction = model.predict(image)

predicted_index = np.argmax(prediction)

confidence = float(np.max(prediction) * 100)

print()
print("Prediction :", class_names[predicted_index])
print(f"Confidence : {confidence:.2f}%")