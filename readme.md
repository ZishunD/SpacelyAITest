# 🧠 Junior Software Engineer Test - Text-to-Image Generator

This is my implementation of the Junior Software Engineer test project: a full-stack app that converts text prompts into AI-generated images using the **Spacely Enterprise API**.

The frontend is built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**. The backend uses **NestJS** and **Firestore** for storage. The entire app is containerized using **Docker** for easy local development and deployment.

---

## 🧱 Tech Stack

- **Frontend**: React + Next.js (App Router) + Tailwind CSS + shadcn/ui  
- **Backend**: NestJS (REST API)  
- **Database**: Firestore  
- **AI API**: Spacely Enterprise Text-to-Image API  
- **DevOps**: Docker + Docker Compose  

---

## 📁 Project Structure

```bash
/frontend             # Frontend app (Next.js)
/backend              # Backend API (NestJS)
/docker-compose.yml   # Docker Compose configuration
/README.md            # This README file
```
---

## 🚀 How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/ZishunD/SpacelyAITest.git
cd SpacelyAITest
````

2. **Set up environment variables**

Create a `.env.local` file inside the `backend` directory:

```env
SPACELY_API_KEY=your_spacely_api_key
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

3. **Start the app with Docker Compose**

```bash
docker-compose up --build
```

4. **Access the application**

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:3001](http://localhost:3001)

---

## ✨ Features

* Input field for prompt and negative prompt
* Calls Spacely API to generate images
* Saves prompts and image URLs in Firestore
* Displays image generation history
* Auto-detects expired images and shows fallback message
* Light and dark mode support
* Fully Dockerized for easy deployment

---

## 🧪 API Endpoints

### `POST /api/generate`

Generates images based on prompt and optional negative prompt.

```bash
#Test
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"A futuristic Tokyo street scene at night","nPrompt":"low quality, blurry"}'
```

**Request Example:**

```json
{
  "prompt": "A futuristic Tokyo street scene at night",
  "nPrompt": "low quality, blurry"
}
```

**Response Example:**

```json
{
  "imageUrls": [
    "https://storage.googleapis.com/..."
  ]
}
```

---

### `GET /api/history`

Returns a list of all previous prompt/image generations.

```bash
#Test
curl -X GET http://localhost:3000/api/history
```

**Response Example:**

```json
{
  "histories": [
    {
      "prompt": "A cat in space",
      "nPrompt": "blurry",
      "imageUrls": [
        "https://storage.googleapis.com/..."
      ]
    }
  ]
}
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).