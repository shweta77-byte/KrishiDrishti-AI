from pathlib import Path
import shutil
import random

# ----------------------------
# Project Paths
# ----------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[2]

SOURCE_DATASET = PROJECT_ROOT / "dataset" / "processed"
FINAL_DATASET = PROJECT_ROOT / "dataset" / "final_dataset"

TRAIN_DIR = FINAL_DATASET / "train"
VAL_DIR = FINAL_DATASET / "val"
TEST_DIR = FINAL_DATASET / "test"

TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15

random.seed(42)

# ----------------------------
# Copy Images Function
# ----------------------------

def copy_images(images, destination):
    destination.mkdir(parents=True, exist_ok=True)

    for img in images:
        shutil.copy2(img, destination / img.name)

# ----------------------------
# Main Program
# ----------------------------

print("=" * 60)
print("KrishiDrishti AI - Dataset Split")
print("=" * 60)

# Remove previous dataset if exists
if FINAL_DATASET.exists():
    shutil.rmtree(FINAL_DATASET)

TRAIN_DIR.mkdir(parents=True)
VAL_DIR.mkdir(parents=True)
TEST_DIR.mkdir(parents=True)

classes = sorted([folder for folder in SOURCE_DATASET.iterdir() if folder.is_dir()])

print(f"\nTotal Classes : {len(classes)}\n")

for cls in classes:

    print(f"Processing -> {cls.name}")

    images = []

    # Read only image files
    for ext in ("*.jpg", "*.jpeg", "*.png", "*.JPG"):
        images.extend(cls.glob(ext))

    random.shuffle(images)

    total = len(images)

    train_end = int(total * TRAIN_RATIO)
    val_end = train_end + int(total * VAL_RATIO)

    train_images = images[:train_end]
    val_images = images[train_end:val_end]
    test_images = images[val_end:]

    copy_images(train_images, TRAIN_DIR / cls.name)
    copy_images(val_images, VAL_DIR / cls.name)
    copy_images(test_images, TEST_DIR / cls.name)

    print(f"   Train : {len(train_images)}")
    print(f"   Val   : {len(val_images)}")
    print(f"   Test  : {len(test_images)}")
    print()

print("=" * 60)
print("Dataset Split Completed Successfully!")
print("=" * 60)