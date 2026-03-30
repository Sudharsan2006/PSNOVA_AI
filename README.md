<div align="center">

# 🤖 PSNOVA AI — Team Portfolio

### *Data & ML Innovators from KSRCT*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-psnova--ai.vercel.app-black?style=for-the-badge)](https://psnova-ai.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Sudharsan2006%2FPSNOVA__AI-181717?style=for-the-badge&logo=github)](https://github.com/Sudharsan2006/PSNOVA_AI)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://psnova-ai.vercel.app)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

> **4 engineers. 20+ projects. One vision.**  
> A full-stack AI team portfolio built with React, Node.js, Express & MongoDB — featuring a live contact system, AI chatbot, visitor analytics, and stunning UI effects.

</div>

---

## 🌐 Live Site

| URL | Description |
|-----|-------------|
| **https://psnova-ai.vercel.app** | 🚀 Production Frontend |
| `http://localhost:5173` | 💻 Local Frontend (dev) |
| `http://localhost:5000` | ⚙️ Local Backend (dev) |
| `http://localhost:5000/api/docs` | 📄 Swagger API Docs |

---

## ✨ Features

| Feature | Description | Tech |
|---------|-------------|------|
| 🎴 **Reflective Team Cards** | Webcam-backed metallic SVG cards with live reflections | CSS SVG Filters |
| 🤖 **AI Chat Assistant** | Floating chatbot powered by OpenAI GPT-4o mini | OpenAI API |
| 📩 **Contact Form** | Form submissions saved to MongoDB Atlas in real-time | Express + MongoDB |
| 📊 **Live Visitor Stats** | Real-time visitor tracking and analytics | MongoDB Aggregation |
| 🎠 **Circular Gallery** | 3D rotating team gallery | Custom JS/CSS |
| ✨ **Scroll Animations** | Smooth reveal animations on scroll | IntersectionObserver |
| 📄 **API Documentation** | Interactive Swagger UI at `/api/docs` | swagger-ui-express |
| 🔒 **Rate Limiting** | Contact form protected against spam | express-rate-limit |

---

## 🗂️ Project Structure

```
PSNOVA_AI/
├── 📁 client/                    ← React + Vite Frontend
│   ├── 📁 public/
│   │   └── 📁 images/            ← Team photos & project images
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Hero.jsx           ← Landing hero section
│   │   │   ├── Navbar.jsx         ← Navigation bar
│   │   │   ├── TeamGrid.jsx       ← Team member grid
│   │   │   ├── TeamSlideshow.jsx  ← Animated team slideshow
│   │   │   ├── ReflectiveCard.jsx ← Webcam metallic effect cards
│   │   │   ├── CircularGallery.jsx← 3D rotating gallery
│   │   │   ├── AboutSection.jsx   ← About the team
│   │   │   ├── Projects.jsx       ← Projects showcase
│   │   │   ├── MarqueeSection.jsx ← Scrolling marquee
│   │   │   ├── ContactForm.jsx    ← Contact form → MongoDB
│   │   │   ├── AIChat.jsx         ← AI chat widget
│   │   │   ├── Footer.jsx         ← Site footer
│   │   │   └── ...
│   │   ├── 📁 pages/
│   │   │   └── Home.jsx           ← Main page
│   │   ├── 📁 data/
│   │   │   └── team.js            ← Team member data
│   │   ├── 📁 hooks/
│   │   │   └── useScrollReveal.js ← Scroll animation hook
│   │   └── index.css              ← Global styles
│   ├── vercel.json                ← Vercel deployment config
│   └── package.json
│
├── 📁 server/                    ← Node.js + Express Backend
│   ├── 📁 config/
│   │   └── db.js                 ← MongoDB connection + DNS fix
│   ├── 📁 models/
│   │   ├── Contact.js            ← Contact form schema
│   │   ├── Visitor.js            ← Visitor analytics schema
│   │   └── ChatLog.js            ← AI chat logs schema
│   ├── 📁 routes/
│   │   ├── team.js               ← GET /api/team
│   │   ├── contact.js            ← POST/GET /api/contact
│   │   ├── chat.js               ← POST /api/chat
│   │   └── stats.js              ← GET /api/stats
│   ├── 📁 controllers/
│   │   ├── contactController.js
│   │   ├── chatController.js
│   │   └── statsController.js
│   ├── swagger.js                ← Swagger/OpenAPI config
│   ├── index.js                  ← Server entry point
│   ├── .env.example              ← Environment variable template
│   └── package.json
│
├── start.bat                     ← 🪟 Windows one-click launcher
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)
- [OpenAI API Key](https://platform.openai.com/api-keys) *(optional — fallback chatbot works without it)*

---

### 1. Clone the Repository

```bash
git clone https://github.com/Sudharsan2006/PSNOVA_AI.git
cd PSNOVA_AI
```

---

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/teamai?retryWrites=true&w=majority
OPENAI_API_KEY=sk-...          # Optional — AI chat feature
CLIENT_URL=http://localhost:5173
```

> **Note:** If you face MongoDB DNS resolution errors, the `config/db.js` already includes a Google DNS fix (`dns.setServers(['8.8.8.8', '8.8.4.4'])`).

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

### 4. Run the Application

**Option A — One-Click (Windows only):**
```
Double-click start.bat in the project root
```

**Option B — Manual (all platforms):**

```bash
# Terminal 1 — Backend
cd server
node index.js
# → Running at http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev
# → Running at http://localhost:5173
```

---

## 📡 API Reference

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/health` | Server health check | None |
| `GET` | `/api/team` | Get all team members | None |
| `GET` | `/api/team/:id` | Get single team member | None |
| `POST` | `/api/contact` | Submit contact message | None |
| `GET` | `/api/contact` | List all messages (admin) | None |
| `PATCH` | `/api/contact/:id/read` | Mark message as read | None |
| `POST` | `/api/chat` | Chat with AI assistant | None |
| `GET` | `/api/stats` | Visitor & message counts | None |
| `GET` | `/api/docs` | Swagger UI documentation | None |

### Example — Contact Form Request

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Collaboration",
    "message": "Hi team! Would love to work with you."
  }'
```

```json
{
  "success": true,
  "message": "Message received! We will get back to you soon. 🙌",
  "data": {
    "id": "69ca384eee16279e820e65e5",
    "name": "Jane Smith",
    "createdAt": "2026-03-30T08:46:06.280Z"
  }
}
```

---

## 🌍 Deployment

### Frontend — Vercel

The frontend is deployed at **https://psnova-ai.vercel.app**

To redeploy manually:

```bash
cd client
npx vercel --prod --token <your-token> --scope <your-scope>
```

> **Root Directory** must be set to `client` in Vercel project settings.  
> The `client/vercel.json` handles build config and SPA routing automatically.

### Backend — Render (Recommended)

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect repo: `Sudharsan2006/PSNOVA_AI`
3. Set **Root Directory** → `server`
4. **Build Command** → `npm install`
5. **Start Command** → `node index.js`
6. Add **Environment Variables** from `server/.env`
7. After deploy, copy the Render URL and update `VITE_API_URL` in Vercel

### Environment Variables for Production

| Variable | Where | Value |
|----------|-------|-------|
| `MONGO_URI` | Render | Your MongoDB Atlas URI |
| `OPENAI_API_KEY` | Render | Your OpenAI key |
| `CLIENT_URL` | Render | `https://psnova-ai.vercel.app` |
| `VITE_API_URL` | Vercel | `https://your-backend.onrender.com` |

---

## 👥 Team

| # | Name | Role | Portfolio | LinkedIn |
|---|------|------|-----------|----------|
| 01 | **Sudharsan R V** | Data Analyst | [sudharsanrv.vercel.app](https://sudharsanrv.vercel.app) | [LinkedIn](https://www.linkedin.com/in/sudharsan-r-v/) |
| 02 | **Praveen Kumar B** | Data Analyst | [praveennkumar.vercel.app](https://praveennkumar.vercel.app) | [LinkedIn](https://www.linkedin.com/in/praveennkumar/) |
| 03 | **Nissanth S P** | AI/ML Engineer | [nissanth.vercel.app](https://nissanth.vercel.app) | [LinkedIn](https://www.linkedin.com/in/nissanth-s-p-041b94289/) |
| 04 | **Narendra A** | AI/ML & VR Engineer | [narendra-portfolio-six.vercel.app](https://narendra-portfolio-six.vercel.app) | [LinkedIn](https://www.linkedin.com/in/narendra-anbazhagan) |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?logo=css3&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-v24-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-AA2929)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o_mini-412991?logo=openai&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?logo=swagger&logoColor=black)

### DevOps
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&logoColor=white)

---

## 📊 Stats

- 📁 **75 files** committed
- 🧩 **489 modules** transformed at build
- 📦 **430 KB** JS bundle (gzipped: 140 KB)
- ⚡ **533ms** Vite build time
- 🗄️ **3 MongoDB collections** (contacts, visitors, chatlogs)

---

## 🔑 Environment Variables Reference

### `server/.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/teamai
OPENAI_API_KEY=sk-...
CLIENT_URL=http://localhost:5173
```

### `client/.env`
```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files.** Both are in `.gitignore`.  
> Use `.env.example` as a template.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is for educational and portfolio purposes.  
Built with ❤️ by **Team PSNOVA AI** — KSRCT, B.E. Artificial Intelligence & Machine Learning.

---

<div align="center">

**[🌐 Visit Live Site](https://psnova-ai.vercel.app)** · **[📄 API Docs](http://localhost:5000/api/docs)** · **[💼 GitHub](https://github.com/Sudharsan2006/PSNOVA_AI)**

*K.S. Rangasamy College of Technology · B.E. AI & ML*

</div>
