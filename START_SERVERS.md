# Quick Start Guide - CodeQuest Servers

## Starting the Servers

### Option 1: Manual Start (Recommended for Development)

**Terminal 1 - Backend Server:**
\`\`\`powershell
npm start
\`\`\`

**Terminal 2 - Frontend Server:**
\`\`\`powershell
cd frontend
npm run dev
\`\`\`

### Option 2: Using PowerShell Scripts

**Start Backend:**
\`\`\`powershell
.\start-backend.ps1
\`\`\`

**Start Frontend:**
\`\`\`powershell
.\start-frontend.ps1
\`\`\`

## Verification

### Check Backend:
- Open browser: http://localhost:3000
- Should see static files or API response
- Check terminal for: `🚀 CodeQuest Server running at http://localhost:3000`

### Check Frontend:
- Open browser: http://localhost:5173
- Should see the CodeQuest homepage
- Check terminal for: `Local: http://localhost:5173`

## Troubleshooting

### Backend won't start:
1. Check MongoDB is running: `Get-Service -Name "*mongo*"`
2. Check .env file exists and has correct values
3. Check port 3000 is not in use: `Test-NetConnection -ComputerName localhost -Port 3000`
4. Check console for error messages

### Frontend won't start:
1. Check backend is running first
2. Check port 5173 is not in use
3. Verify frontend dependencies: `cd frontend && npm list --depth=0`
4. Check console for error messages

### Connection Issues:
- Ensure both servers are running
- Check CORS settings in server.js
- Verify FRONTEND_URL in .env matches frontend URL
- Check browser console for WebSocket errors

## Stopping Servers

Press `Ctrl+C` in each terminal to stop the servers.

Or kill all Node processes:
\`\`\`powershell
taskkill /F /IM node.exe
\`\`\`
