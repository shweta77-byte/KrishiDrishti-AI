from pathlib import Path

# Project Root
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Dataset Paths
RAW_DATASET = PROJECT_ROOT / "dataset" / "PlantVillage"
PROCESSED_DATASET = PROJECT_ROOT / "dataset" / "processed"
import shutil

SELECTED_CLASSES = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",

    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",

    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_healthy"
]
print("=" * 50)
print("KrishiDrishti AI - Dataset Preparation")
print("=" * 50)

print(f"\nProject Root : {PROJECT_ROOT}")
print(f"Raw Dataset  : {RAW_DATASET}")
print(f"Output Folder: {PROCESSED_DATASET}")

if not RAW_DATASET.exists():
    print("\n❌ Dataset Not Found!")
    exit()

print("\n✅ Dataset Found Successfully!")

# Create processed folder
PROCESSED_DATASET.mkdir(exist_ok=True)

print("✅ Processed folder created successfully!")
print("\n" + "=" * 50)
print("Dataset Summary")
print("=" * 50)

for folder in sorted(RAW_DATASET.iterdir()):

    if folder.is_dir():

        image_count = len(list(folder.glob("*")))

        print(f"{folder.name:<40} {image_count} images")
        print("\n" + "=" * 50)
print("Copying Selected Classes")
print("=" * 50)

for class_name in SELECTED_CLASSES:

    source = RAW_DATASET / class_name
    destination = PROCESSED_DATASET / class_name

    if destination.exists():
        shutil.rmtree(destination)

    shutil.copytree(source, destination)

    print(f"✅ {class_name}")