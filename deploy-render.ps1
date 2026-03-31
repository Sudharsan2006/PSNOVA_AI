# Render Deployment Automation Script (PowerShell)
# Automatically deploys the backend to Render using the API

Write-Host "`n╔════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         🚀 RENDER BACKEND DEPLOYMENT AUTOMATION                   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n"

# Check for API key
$apiKey = $env:RENDER_API_KEY
if ([string]::IsNullOrEmpty($apiKey)) {
    Write-Host "❌ ERROR: RENDER_API_KEY environment variable not set" -ForegroundColor Red
    Write-Host "`nGet your API key from: https://dashboard.render.com/account/api-tokens"
    Write-Host "`nUsage:"
    Write-Host "  `$env:RENDER_API_KEY = 'your-api-token-here'"
    Write-Host "  . .\deploy-render.ps1"
    exit 1
}

$GitHubRepo = "Sudharsan2006/PSNOVA_AI"
$ServiceName = "team-ai-backend"
$RootDir = "server"
$BuildCmd = "npm install"
$StartCmd = "npm start"

Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "   Repository: $GitHubRepo"
Write-Host "   Service: $ServiceName"
Write-Host "   Root Directory: $RootDir"
Write-Host "`n"

Write-Host "🔗 Creating service on Render..." -ForegroundColor Green
Write-Host ""

# Build request body as raw JSON string to avoid PowerShell parsing issues
$mongoUri = 'mongodb+srv://teamai-admin:TeamAI%402024Secure@teamai-cluster.lgbumug.mongodb.net/teamai?retryWrites=true&w=majority&appName=teamai-cluster'

$body = @"
{
  "type": "web_service",
  "name": "$ServiceName",
  "repo": "https://github.com/$GitHubRepo",
  "branch": "master",
  "rootDir": "$RootDir",
  "envVars": [
    {
      "key": "MONGO_URI",
      "value": "$mongoUri"
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
  "buildCommand": "$BuildCmd",
  "startCommand": "$StartCmd",
  "plan": "free"
}
"@

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

try {
    Write-Host "Sending request to Render API..." -ForegroundColor Cyan
    
    $response = Invoke-WebRequest -Uri "https://api.render.com/v1/services" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -UseBasicParsing

    $jsonResponse = $response.Content | ConvertFrom-Json
    
    Write-Host "`n✅ Response received:" -ForegroundColor Green
    Write-Host ($response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10)

    if ($jsonResponse.service) {
        $serviceId = $jsonResponse.service.id
        
        Write-Host "`n✅ Service created successfully!" -ForegroundColor Green
        Write-Host "   Service ID: $serviceId"
        Write-Host "`n⏳ Deployment starting... (This may take 5-15 minutes)" -ForegroundColor Cyan
        Write-Host "`n📊 Monitor deployment at:" -ForegroundColor Yellow
        Write-Host "   https://dashboard.render.com/services/$serviceId"
        Write-Host "`n✨ Your backend URL will be:" -ForegroundColor Magenta
        Write-Host "   https://$ServiceName-xxxxx.onrender.com"
        Write-Host "`n"
        Write-Host "⏳ Waiting for service to become active..." -ForegroundColor Cyan
        Write-Host "   (Check dashboard for real-time status)`n"
    }
    elseif ($jsonResponse.errors) {
        Write-Host "`n⚠️  API returned errors:" -ForegroundColor Yellow
        Write-Host ($jsonResponse.errors | ConvertTo-Json)
        exit 1
    }
    else {
        Write-Host "`n❌ Unexpected response:" -ForegroundColor Red
        Write-Host $response.Content
        exit 1
    }
}
catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
    Write-Host "Check your API key and try again" -ForegroundColor Yellow
    exit 1
}
