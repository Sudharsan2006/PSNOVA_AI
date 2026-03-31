# 🚀 Deployment Guide for Team AI

## Current Issue

Your website `https://psnovaai.sudharsanrv.dev/` is deployed, but the **database is not working** because:
1. ❌ The **backend server is not deployed** (only frontend on Vercel)
2. ❌ The frontend cannot communicate with the database
3. ❌ Contact forms, chatbot, and visitor stats won't work

---

## Solution: Deploy the Backend

### Option 1: Deploy on Render.com (RECOMMENDED - Free)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy Team AI backend to Render"
git push origin main
```

#### Step 2: Deploy on Render
1. Go to **[render.com](https://render.com)** and sign up
2. Click **"New" → "Web Service"**
3. Connect your GitHub repository
4. Fill in the form:
   - **Name:** `team-ai-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Paid for better uptime)

#### Step 3: Add Environment Variables
In Render dashboard, go to **Environment**:
```
MONGO_URI=mongodb+srv://teamai-admin:TeamAI%402024Secure@teamai-cluster.lgbumug.mongodb.net/teamai?retryWrites=true&w=majority&appName=teamai-cluster

OPENAI_API_KEY=sk-YOUR_ACTUAL_KEY

CLIENT_URL=https://psnovaai.sudharsanrv.dev

NODE_ENV=production

PORT=5000
```

#### Step 4: Deploy
- Render will auto-deploy your service
- You'll get a URL like: `https://team-ai-backend.onrender.com`

---

### Option 2: Deploy on Railway.app

1. Go to **[railway.app](https://railway.app)**
2. Create new project → Deploy from GitHub
3. Select your repository and `server` directory
4. Add environment variables (same as above)
5. Deploy

---

### Option 3: Deploy on Heroku (Paid)

1. Install Heroku CLI
2. Run:
```bash
heroku create team-ai-backend
git push heroku main
heroku config:set MONGO_URI=<your_connection_string>
```

---

## Step 5: Update Your Frontend

After deploying the backend, update the API base URL in your frontend:

#### Edit: `client/src/main.jsx` or create `.env.production`

```javascript
// Add to client/.env.production or vite.config.js
VITE_API_URL=https://your-backend-url.onrender.com
```

#### Update all API calls:
```javascript
// Before (localhost)
const api = axios.create({
  baseURL: 'http://localhost:5000'
});

// After (production)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});
```

---

## Step 6: Update CORS Settings

Edit **`server/index.js`** to add your deployed frontend URL:

```javascript
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'https://teamai.vercel.app',
  'https://psnovaai.sudharsanrv.dev',  // ← Add your domain
];
```

---

## Step 7: Verify MongoDB Connection

Test if your database is working:
```bash
cd server
npm install
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.lgbumug.mongodb.net
```

If you see errors:
- Check MongoDB Atlas credentials at [cloud.mongodb.com](https://cloud.mongodb.com)
- Make sure your IP is whitelisted (Network Access)
- Verify the connection string doesn't have special characters that need encoding

---

## Step 8: Test the API

Once deployed, test these endpoints:

### Health Check
```bash
curl https://your-backend-url/health
```

### Submit Contact Form
```bash
curl -X POST https://your-backend-url/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello!"}'
```

### Get Contact Messages
```bash
curl https://your-backend-url/api/contact
```

---

## Updated Files

✅ **`server/.env`** - Updated with production domain
✅ **`server/.env.production`** - Created for production deployment
✅ **`render.yaml`** - Created for Render deployment

---

## Environment Variables Needed

| Variable | Value |
|----------|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `OPENAI_API_KEY` | Get from [platform.openai.com/api-keys](https://platform.openai.com/api-keys) (Optional - uses fallback if not set) |
| `CLIENT_URL` | `https://psnovaai.sudharsanrv.dev` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

---

## Troubleshooting

### ❌ "MongoDB connection error"
- Check credentials in MONGO_URI
- Verify IP whitelist in MongoDB Atlas
- Test connection locally: `npm run dev`

### ❌ "CORS blocked"
- Add your frontend URL to `allowedOrigins` in `server/index.js`
- Redeploy the backend

### ❌ "Contact form not saving"
- Check if database connection is working
- Look at server logs in Render/Railway dashboard
- Run `npm run dev` locally to test

### ❌ "API requests timing out"
- Free tiers on Render/Railway may sleep
- Upgrade to paid plan or use keep-alive service
- Check deployment platform logs

---

## Next Steps

1. ✅ Deploy backend to Render/Railway/Heroku
2. ✅ Add environment variables in deployment platform
3. ✅ Update frontend `.env` with backend API URL
4. ✅ Test API endpoints
5. ✅ Verify contact form works
6. ✅ Check visitor analytics

Good luck! 🚀
