@echo off
chcp 65001 >nul
echo Укажите публичный HTTPS-адрес сайта перед запуском.
set /p MAX_WEBHOOK_URL=Webhook URL (https://site.ru/api/max/webhook): 
set /p MAX_WEBHOOK_SECRET=Секрет webhook (необязательно): 
set MAX_WEBHOOK_URL=%MAX_WEBHOOK_URL%
set MAX_WEBHOOK_SECRET=%MAX_WEBHOOK_SECRET%
node max-subscribe.js
pause
