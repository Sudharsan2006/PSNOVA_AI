#!/bin/bash
# Render Deployment Automation Script
# This script automatically deploys the backend to Render using the API

set -e

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║         🚀 RENDER BACKEND DEPLOYMENT AUTOMATION                   ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Require environment variables
if [ -z "$RENDER_API_KEY" ]; then
    echo "❌ ERROR: RENDER_API_KEY not set"
    echo ""
    echo "Get your API key from: https://dashboard.render.com/account/api-tokens"
    echo ""
    echo "Usage:"
    echo "  export RENDER_API_KEY='your-api-token-here'"
    echo "  bash deploy-render.sh"
    exit 1
fi

GITHUB_REPO="Sudharsan2006/PSNOVA_AI"
SERVICE_NAME="team-ai-backend"
ROOT_DIR="server"
BUILD_CMD="npm install"
START_CMD="npm start"

echo "📋 Configuration:"
echo "   Repository: $GITHUB_REPO"
echo "   Service: $SERVICE_NAME"
echo "   Root: $ROOT_DIR"
echo ""

echo "🔗 Creating service on Render..."
echo ""

# Create the web service
RESPONSE=$(curl -s -X POST https://api.render.com/v1/services \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "web_service",
    "name": "'$SERVICE_NAME'",
    "ownerId": null,
    "repo": "https://github.com/'$GITHUB_REPO'",
    "branch": "master",
    "buildFilter": {
      "paths": ["server/**"]
    },
    "rootDir": "'$ROOT_DIR'",
    "envVars": [
      {
        "key": "MONGO_URI",
        "value": "mongodb+srv://teamai-admin:TeamAI%402024Secure@teamai-cluster.lgbumug.mongodb.net/teamai?retryWrites=true&w=majority&appName=teamai-cluster"
      },
      {
        "key": "OPENAI_API_KEY",
        "value": "sk-REPLACE_WITH_YOUR_KEY"
      },
      {
        "key": "CLIENT_URL",
        "value": "https://psnovaai.sudharsanrv.dev"
      },
      {
        "key": "NODE_ENV",
        "value": "production"
      },
      {
        "key": "PORT",
        "value": "5000"
      }
    ],
    "buildCommand": "'$BUILD_CMD'",
    "startCommand": "'$START_CMD'",
    "plan": "free"
  }')

echo "$RESPONSE" | jq .

SERVICE_ID=$(echo "$RESPONSE" | jq -r '.service.id // empty')

if [ -z "$SERVICE_ID" ]; then
    echo ""
    echo "❌ Failed to create service. Check your API key and try again."
    exit 1
fi

echo ""
echo "✅ Service created! ID: $SERVICE_ID"
echo ""
echo "⏳ Deployment starting... (This may take 5-10 minutes)"
echo ""
echo "📊 Monitor deployment at:"
echo "   https://dashboard.render.com/services/$SERVICE_ID"
echo ""
echo "✨ Once complete, your backend URL will be:"
echo "   https://$SERVICE_NAME-xxxxx.onrender.com"
echo ""
