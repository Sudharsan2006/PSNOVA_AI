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

# Prepare request body
$body = @{
    type = "web_service"
    name = $ServiceName
    repo = "https://github.com/$GitHubRepo"
    branch = "master"
    rootDir = $RootDir
    envVars = @(
        @{ key = "MONGO_URI"; value = "mongodb+srv://teamai-admin:TeamAI%402024Secure@teamai-cluster.lgbumug.mongodb.net/teamai?retryWrites=true&w=majority&appName=teamai-cluster" },
        @{ key = "OPENAI_API_KEY"; value = "sk-REPLACE_WITH_YOUR_KEY" },
        @{ key = "CLIENT_URL"; value = "https://psnovaai.sudharsanrv.dev" },
        @{ key = "NODE_ENV"; value = "production" },
        @{ key = "PORT"; value = "5000" }
    )
    buildCommand = $BuildCmd
    startCommand = $StartCmd
    plan = "free"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-WebRequest -Uri "https://api.render.com/v1/services" `
        -Method POST `
        -Headers $headers `
        -Body $body -UseBasicParsing

    $jsonResponse = $response.Content | ConvertFrom-Json
    Write-Host $response.Content | ConvertFrom-Json | ConvertTo-Json

    if ($jsonResponse.service) {
        $serviceId = $jsonResponse.service.id
        Write-Host "`n✅ Service created! ID: $serviceId" -ForegroundColor Green
        Write-Host "`n⏳ Deployment starting... (This may take 5-10 minutes)" -ForegroundColor Cyan
        Write-Host "`n📊 Monitor deployment at:" -ForegroundColor Yellow
        Write-Host "   https://dashboard.render.com/services/$serviceId"
        Write-Host "`n✨ Once complete, your backend URL will be:" -ForegroundColor Magenta
        Write-Host "   https://$ServiceName-xxxxx.onrender.com"
        Write-Host "`n"
    }
    else {
        Write-Host "`n❌ Failed to create service. Check your API key and try again." -ForegroundColor Red
        Write-Host "Response: $($response.Content)" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
    exit 1
}
