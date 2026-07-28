@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js не найден. Установите Node.js и повторите запуск.
  pause
  exit /b 1
)
echo Проверяю последнее сообщение в MAX и подключаю получателя...
node max-connect.js
echo.
pause
