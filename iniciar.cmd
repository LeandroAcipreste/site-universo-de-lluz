@echo off
cd /d "%~dp0"
start "" http://localhost:8177/
node server.js 8177
