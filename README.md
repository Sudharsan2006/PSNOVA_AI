# Team AI — Full-Stack Portfolio

> **4 engineers. 20+ projects. Infinite possibilities.**
> A stunning portfolio platform for Team AI from K.S. Rangasamy College of Technology (KSRCT) — built with React + Node.js + MongoDB + OpenAI.

---

## ✨ Features

| Feature | Tech |
|---|---|
| 🎴 ReflectiveCard UI | Webcam-backed metallic SVG cards |
| 🤖 AI Chatbot | OpenAI GPT-4o mini (with rule-based fallback) |
| 📩 Contact Form | Saved to MongoDB Atlas |
| 📈 Live Visitor Stats | MongoDB-backed analytics |
| 📄 API Documentation | Swagger UI at `/api/docs` |
| 🚀 Deployment | Vercel (frontend) + Render (backend) |

---

## 🗂 Project Structure

```
team ai/
├── client/            ← React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReflectiveCard.jsx   ← Webcam metallic cards
│   │   │   ├── AIChat.jsx           ← AI chatbot widget
│   │   │   ├── ContactForm.jsx      ← Contact form
│   │   │   ├── TeamGrid.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/Home.jsx
│   │   ├── data/team.js
│   │   └── hooks/useScrollReveal.js
│   └── public/images/   ← Team photos
│
└── server/            ← Node.js + Express backend
    ├── config/db.js         ← MongoDB connection
    ├── models/
    │   ├── Contact.js       ← Contact form schema
    │   ├── Visitor.js       ← Visitor analytics
    │   └── ChatLog.js       ← AI chat logs
    ├── routes/
    │   ├── team.js          GET  /api/team
    │   ├── contact.js       POST /api/contact
    │   ├── chat.js          POST /api/chat
    │   └── stats.js         GET  /api/stats
    ├── controllers/
    ├── swagger.js           ← API docs
    └── index.js             ← Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- OpenAI API key (optional — fallback chatbot works without it)

### 1. Clone & Install

```bash
# Backend
cd server
npm install
cp .env.example .env   # fill in MONGO_URI and OPENAI_API_KEY

# Frontend
cd ../client
npm install
```

### 2. Configure Environment

**`server/.env`**
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/teamai?...
OPENAI_API_KEY=sk-...        # optional
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```
VITE_API_URL=http://localhost:5000
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd server
npm run dev    # http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev    # http://localhost:5173
```

### 4. View API Documentation
Open http://localhost:5000/api/docs (Swagger UI)

---

## 📡 API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/team` | All team member data |
| `GET` | `/api/team/:id` | Single member by ID |
| `POST` | `/api/contact` | Submit contact message |
| `GET` | `/api/contact` | View all messages (admin) |
| `POST` | `/api/chat` | Chat with AI assistant |
| `GET` | `/api/stats` | Visitor & message stats |
| `GET` | `/health` | Server health check |
| `GET` | `/api/docs` | Swagger UI |

---

## 🌍 Deployment

### Frontend → Vercel
```bash
cd client
npm run build
# Push to GitHub → connect repo in vercel.com
# Set Environment Variable: VITE_API_URL=https://your-render-url.onrender.com
```

### Backend → Render
1. Go to https://render.com → New Web Service
2. Connect GitHub repo, set Root Directory to `server`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add Environment Variables from `server/.env`

### Custom Domain
In Vercel dashboard → Settings → Domains → Add your domain.

---

## 👥 Team Members

| # | Name | Role | Portfolio |
|---|---|---|---|
| 01 | **Sudharsan R V** | Data Analyst | [sudharsanrv.vercel.app](https://sudharsanrv.vercel.app) |
| 02 | **Praveen Kumar B** | Data Analyst | [praveennkumar.vercel.app](https://praveennkumar.vercel.app) |
| 03 | **Nissanth S P** | AI/ML Engineer | [nissanth.vercel.app](https://nissanth.vercel.app) |
| 04 | **Narendra A** | AI/ML & VR Engineer | [narendra-portfolio-six.vercel.app](https://narendra-portfolio-six.vercel.app) |

---

## 🏫 About

**K.S. Rangasamy College of Technology (KSRCT)**
B.E. — Artificial Intelligence & Machine Learning

*Built with ❤️ by Team AI*
