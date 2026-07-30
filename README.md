# KrishiDrishti AI

KrishiDrishti AI is an AI-powered plant disease detection platform that enables farmers and agricultural professionals to identify crop diseases from plant images. The project combines a TensorFlow deep learning model, a FastAPI backend, a React web application, and an Android application to provide disease detection across multiple platforms.

## Features

* AI-powered plant disease detection
* React-based web application
* Android mobile application (APK)
* FastAPI backend for prediction services
* TensorFlow deep learning model
* User-friendly interface for uploading and analyzing plant images
* Cross-platform accessibility

## Tech Stack

| Component  | Technology         |
| ---------- | ------------------ |
| AI Model   | TensorFlow         |
| Backend    | FastAPI            |
| Frontend   | React              |
| Mobile App | Android (APK)      |
| Languages  | Python, JavaScript |

## Project Architecture

```text
Plant Image
      │
      ▼
Web Application / Android App
      │
      ▼
FastAPI Backend
      │
      ▼
TensorFlow AI Model
      │
      ▼
Disease Prediction
      │
      ▼
Result Display
```

## Android Application

KrishiDrishti AI is also available as an Android application, allowing users to diagnose plant diseases directly from their smartphones.

### Mobile Features

* Capture images using the phone camera
* Upload images from the gallery
* Receive instant disease predictions
* Simple and intuitive user interface
* Portable solution for field use

> **Note:** The APK can be found in the project release section or shared separately for installation.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/shweta77-byte/KrishiDrishti-AI.git
cd KrishiDrishti-AI
```

### Backend

```bash
python -m venv venv
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

### Frontend

```bash
npm install
npm run dev
```

## Future Improvements

* Support additional crop species
* Real-time camera disease detection
* Disease severity estimation
* Treatment and fertilizer recommendations
* Multi-language support
* Offline prediction capability
