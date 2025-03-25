@echo off
echo Starting the project...

:: Navigate to the project directory
cd C:\path\to\your\project

:: Install dependencies (if using npm)
echo Installing dependencies...
npm install || (echo "npm install failed" & pause & exit /b)

:: Start the application
echo Starting the application...
npm start

pause