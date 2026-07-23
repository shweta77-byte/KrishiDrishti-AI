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

# ---------------------------------------
# Project Paths
# ---------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATASET_PATH = PROJECT_ROOT / "dataset" / "PlantVillage"

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
SEED = 42

print("=" * 50)
print("KrishiDrishti AI - Dataset Loader")
print("=" * 50)

print(f"\nDataset Path : {DATASET_PATH}")

if not DATASET_PATH.exists():
    raise FileNotFoundError("Dataset folder not found!")

print("✅ Dataset Found")

# ---------------------------------------
# Load Dataset
# ---------------------------------------

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
# ---------------------------------------
# Optimize Dataset Pipeline
# ---------------------------------------

AUTOTUNE = tf.data.AUTOTUNE

train_dataset = (
    train_dataset
    .cache()
    .shuffle(1000)
    .prefetch(buffer_size=AUTOTUNE)
)

validation_dataset = (
    validation_dataset
    .cache()
    .prefetch(buffer_size=AUTOTUNE)
)

print("\n✅ Dataset Pipeline Ready")

print("\nDataset Loaded Successfully!")

print("\nClasses:")

for name in class_names:
    print("•", name)

try:
    import matplotlib.pyplot as plt  # type: ignore[reportMissingModuleSource]
except ImportError:
    plt = None



if plt is not None:
    plt.figure(figsize=(10, 10))

    for images, labels in train_dataset.take(1):
        for i in range(9):
            ax = plt.subplot(3, 3, i + 1)
            plt.imshow(images[i].numpy().astype("uint8"))
            plt.title(class_names[labels[i]])
            plt.axis("off")

    plt.tight_layout()
    plt.show()
# ---------------------------------------
# Base Model
# ---------------------------------------

base_model = tf.keras.applications.EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(224, 224, 3)
)

base_model.trainable = False
# ---------------------------------------
# Full Model
# ---------------------------------------

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

print("\n✅ Model Built Successfully!")
model.summary()