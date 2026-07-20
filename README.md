# 📚 StudyMate AI

StudyMate AI is a modern AI-powered learning platform that helps students organize study resources, generate personalized study plans, and interact with an AI assistant for learning support. It provides a clean, responsive interface with secure authentication and an intelligent dashboard.

## 🌐 Live Demo

- **Frontend:** https://your-frontend-url.vercel.app

---

## ✨ Features

- 🔐 Secure Authentication (Email/Password + Google Login)
- 🤖 AI Chat Assistant powered by Gemini AI
- 📅 AI Study Plan Generator
- 📚 Resource Management (Create, Update, Delete)
- 🔍 Explore Resources with Search & Filters
- 📖 Resource Details Page
- 📊 Dynamic Dashboard Overview
- 👤 User Profile Management
- 👍👎 Like/Dislike AI Responses
- 🗑️ Delete AI Conversations
- 🌙 Dark & Light Theme
- 📱 Fully Responsive Design
- ⚡ Smooth UI with Framer Motion
- 🚀 Fast Performance with Next.js

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- Framer Motion
- TanStack Query
- Better Auth
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Google Gemini AI
- Better Auth
- CORS
- dotenv

---

## 📂 Project Structure

```
studymate-ai/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── lib/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
```

### Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/studymate-ai.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## 📡 API Endpoints

### Authentication

- POST `/api/auth`

### Resources

- GET `/api/resources`
- GET `/api/resources/:id`
- POST `/api/resources`
- PATCH `/api/resources/:id`
- DELETE `/api/resources/:id`

### AI

- POST `/api/ai/chat`
- GET `/api/ai/history`
- PATCH `/api/ai/history/:id/reaction`
- DELETE `/api/ai/history/:id`
- POST `/api/ai/study-plan`

### Dashboard

- GET `/api/dashboard/overview`

---

## 📱 Responsive

- Mobile
- Tablet
- Desktop

---

## 🔒 Authentication

- Email & Password
- Google OAuth
- Protected Dashboard Routes

---

## 🤖 AI Features

- AI Chat
- Study Plan Generation
- Chat History
- Like / Dislike Responses
- Delete Conversations

---

## 📸 Screenshots

Add screenshots of:

- Home
- Explore
- AI Chat
- Dashboard
- Resource Details
- Profile

---

## 👨‍💻 Author

**Nahid Ahamed Ridoy**

- GitHub: https://github.com/Nahidahamedridoy
- LinkedIn: https://www.linkedin.com/in/your-linkedin

---

## 📄 License

This project is licensed under the MIT License.