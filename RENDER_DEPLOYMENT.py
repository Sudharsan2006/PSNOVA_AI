#!/usr/bin/env python3
"""
Render Backend Deployment Automation Script
Deploys PSNOVA_AI backend to Render.com with all required configurations
"""

import json
import os
import sys
from pathlib import Path

# Configuration
GITHUB_REPO = "Sudharsan2006/PSNOVA_AI"
RENDER_SERVICE_NAME = "team-ai-backend"
ROOT_DIRECTORY = "server"
BUILD_COMMAND = "npm install"
START_COMMAND = "npm start"

ENVIRONMENT_VARIABLES = {
    "MONGO_URI": "mongodb+srv://teamai-admin:TeamAI%402024Secure@teamai-cluster.lgbumug.mongodb.net/teamai?retryWrites=true&w=majority&appName=teamai-cluster",
    "OPENAI_API_KEY": "sk-REPLACE_WITH_YOUR_KEY",
    "CLIENT_URL": "https://psnovaai.sudharsanrv.dev",
    "NODE_ENV": "production",
    "PORT": "5000"
}

MANUAL_STEPS = """
╔════════════════════════════════════════════════════════════════════╗
║         🚀 RENDER DEPLOYMENT - AUTOMATED SETUP GUIDE              ║
╚════════════════════════════════════════════════════════════════════╝

You are now logged into Render Dashboard. Follow these steps:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Click "Create New Service" → "Web Service"
        → "Connect Repository"

STEP 2: Authorize GitHub & Select Repository
   • Click "Connect Account" → "GitHub"
   • Select: Sudharsan2006/PSNOVA_AI
   • Click "Connect"

STEP 3: Configure Service Details
   ┌─────────────────────────────────────────┐
   │ NAME: team-ai-backend                   │
   │ BRANCH: master                          │
   │ ROOT DIRECTORY: server                  │
   │ RUNTIME: Node                           │
   │ BUILD COMMAND: npm install              │
   │ START COMMAND: npm start                │
   │ PLAN: Free (or Starter)                 │
   └─────────────────────────────────────────┘

STEP 4: Add Environment Variables
   Click "Advanced" and add these (Copy-Paste one by one):

   Key: MONGO_URI
   Value: mongodb+srv://teamai-admin:TeamAI%402024Secure@teamai-cluster.lgbumug.mongodb.net/teamai?retryWrites=true&w=majority&appName=teamai-cluster

   Key: OPENAI_API_KEY
   Value: sk-REPLACE_WITH_YOUR_KEY
   (Get real key from: https://platform.openai.com/api-keys)

   Key: CLIENT_URL
   Value: https://psnovaai.sudharsanrv.dev

   Key: NODE_ENV
   Value: production

   Key: PORT
   Value: 5000

STEP 5: Review & Deploy
   • Click "Create Web Service"
   • Wait 3-5 minutes for deployment
   • You'll see a URL like: https://team-ai-backend-xxxxx.onrender.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ NEXT: After deployment completes, reply with:
   "Backend URL: https://team-ai-backend-xxxxx.onrender.com"

I will then:
  1. Update frontend .env variables
  2. Verify database connection
  3. Test all API endpoints
  4. Confirm everything works!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

def print_config():
    """Display configuration for reference"""
    print("\n" + "=" * 70)
    print("DEPLOYMENT CONFIGURATION SUMMARY")
    print("=" * 70)
    print(f"\n📦 Repository: {GITHUB_REPO}")
    print(f"🏗️  Service Name: {RENDER_SERVICE_NAME}")
    print(f"📁 Root Directory: {ROOT_DIRECTORY}")
    print(f"🔨 Build: {BUILD_COMMAND}")
    print(f"▶️  Start: {START_COMMAND}")
    print("\n🔐 Environment Variables:")
    for key, value in ENVIRONMENT_VARIABLES.items():
        if len(value) > 50:
            print(f"   • {key}: {value[:47]}...")
        else:
            print(f"   • {key}: {value}")
    print("\n" + "=" * 70)

def main():
    print_config()
    print(MANUAL_STEPS)

if __name__ == "__main__":
    main()
