@echo off
title PSNOVA AI — Starting Servers
echo.
echo  ╔══════════════════════════════════════╗
echo  ║     🚀 PSNOVA AI — Starting Up      ║
echo  ╚══════════════════════════════════════╝
echo.

SET NODE="C:\Program Files\nodejs\node.exe"
SET NPM="C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"
SET ROOT=%~dp0

echo [1/2] Starting Backend (Port 5000)...
start "PSNOVA Backend" cmd /k "cd /d "%ROOT%server" && %NODE% index.js"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend (Port 5173)...
start "PSNOVA Frontend" cmd /k "cd /d "%ROOT%client" && %NODE% %NPM% run dev"

timeout /t 4 /nobreak >nul

echo.
echo  ✅ Both servers started!
echo  Frontend : http://localhost:5173
echo  Backend  : http://localhost:5000
echo  API Docs : http://localhost:5000/api/docs
echo.

start http://localhost:5173
