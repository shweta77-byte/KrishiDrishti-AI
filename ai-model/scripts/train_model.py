import tensorflow as tf
from pathlib import Path
# ---------------------------------------
# Data Augmentation
# ---------------------------------------

data_augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip("horizontal"),
    tf.keras.layers.RandomRotation(0.15),
    tf.keras.layers.RandomZoom(0.15),
    tf.keras.layers.RandomContrast(0.1),
])

print("=" * 60)
print("KrishiDrishti AI - Model Training")
print("=" * 60)

# ----------------------------
# Project Paths
# ----------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATASET_PATH = PROJECT_ROOT / "dataset" / "PlantVillage"

print(f"\nDataset Path : {DATASET_PATH}")

if not DATASET_PATH.exists():
    raise FileNotFoundError("Dataset folder not found!")

print("✅ Dataset Found")

# ----------------------------
# Configuration
# ----------------------------

IMG_SIZE = (224, 224)
BATCH_SIZE = 16
SEED = 42
# ----------------------------
# Load Dataset
# ----------------------------

train_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

validation_dataset = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=SEED,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_dataset.class_names

print("\n✅ Dataset Loaded Successfully!")
print(f"Training Classes : {len(class_names)}")

print("\nClass Names:")
for cls in class_names:
    print("•", cls)
    # ----------------------------
# Optimize Dataset Pipeline
# ----------------------------

AUTOTUNE = tf.data.AUTOTUNE

train_dataset = (
    train_dataset
    .shuffle(200)
    .prefetch(AUTOTUNE)
)

validation_dataset = (
    validation_dataset
    .prefetch(AUTOTUNE)
)

print("\n✅ Dataset Pipeline Ready!")
# ---------------------------------------
# Build EfficientNetB0 Model
# ---------------------------------------

print("\nBuilding EfficientNetB0 Model...")

base_model = tf.keras.applications.EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(224, 224, 3)
)

base_model.trainable = False

inputs = tf.keras.Input(shape=(224, 224, 3))

x = data_augmentation(inputs)

x = tf.keras.applications.efficientnet.preprocess_input(x)

x = base_model(x, training=False)

x = tf.keras.layers.GlobalAveragePooling2D()(x)

x = tf.keras.layers.Dropout(0.3)(x)

outputs = tf.keras.layers.Dense(
    len(class_names),
    activation="softmax"
)(x)

model = tf.keras.Model(inputs, outputs)

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

print("\n✅ Model Built Successfully!\n")

model.summary()
# ---------------------------------------
# Train Model
# ---------------------------------------

print("\nStarting Training...\n")
options = tf.data.Options()
options.experimental_distribute.auto_shard_policy = (
    tf.data.experimental.AutoShardPolicy.OFF
)

train_dataset = train_dataset.with_options(options)
validation_dataset = validation_dataset.with_options(options)
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=3
)

print("Training finished!")
MODEL_DIR = PROJECT_ROOT / "ai-model" / "models"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

model.save(MODEL_DIR / "plant_disease_model.keras")

print("\n✅ Model saved successfully!")