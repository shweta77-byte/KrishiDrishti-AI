import tensorflow as tf

print("TensorFlow Version:", tf.__version__)

print("Loading EfficientNet...")

model = tf.keras.applications.EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(224, 224, 3)
)

print("✅ EfficientNet loaded successfully!")