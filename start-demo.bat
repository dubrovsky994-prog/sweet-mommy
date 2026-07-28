@echo off
setlocal
set "PROJECT_DIR=%~dp0"
if not exist "%PROJECT_DIR%server.js" if exist "C:\Users\Administrator\Documents\Sweet Mommy\server.js" set "PROJECT_DIR=C:\Users\Administrator\Documents\Sweet Mommy\"
if not exist "%PROJECT_DIR%server.js" (
  echo Could not find server.js.
  echo Please extract the full Sweet Mommy folder and run start-demo.bat from it.
  echo Expected folder: C:\Users\Administrator\Documents\Sweet Mommy
  pause
  exit /b 1
)
cd /d "%PROJECT_DIR%"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js not found. Install Node.js and run this file again.
  pause
  exit /b 1
)

echo Starting Sweet Mommy at http://127.0.0.1:3000/
echo Keep this window open while viewing the website.
node server.js

echo.
echo The server has stopped.
pause
