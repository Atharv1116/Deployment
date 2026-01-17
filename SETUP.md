# CodeQuest Setup Guide

## Quick Start

### 1. Install Dependencies

**Backend:**
\`\`\`bash
npm install
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm install
\`\`\`

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/codequest
JWT_SECRET=your-secret-key-change-in-production-use-a-strong-random-string
JUDGE0_API_KEY=your-judge0-api-key
JUDGE0_HOST=judge0-ce.p.rapidapi.com
OPENAI_API_KEY=your-openai-api-key-optional
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
\`\`\`

### 3. Start MongoDB

Make sure MongoDB is running on your system:

\`\`\`bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Option 1: Start MongoDB service from Services panel
# - Press Win+R, type "services.msc"
# - Find "MongoDB" service
# - Right-click and select "Start"

# Option 2: Start via PowerShell (Run as Administrator)
Start-Service MongoDB

# Option 3: Start via Command Prompt (Run as Administrator)
net start MongoDB

# Verify MongoDB is running:
# Check service status:
Get-Service -Name "*mongo*"

# Test connection (PowerShell):
Test-NetConnection -ComputerName localhost -Port 27017

# If mongosh is installed, test with:
mongosh
# or
mongosh --eval "db.adminCommand('ping')"
\`\`\`

### 4. Initialize Database

**Import Questions:**
\`\`\`bash
node importQuestions.js
\`\`\`
Expected output: `✅ Inserted 3 questions`

**Initialize Badges:**
\`\`\`bash
node scripts/initBadges.js
\`\`\`
Expected output: `✅ Inserted 8 badges`

**Note:** Both scripts will:
- Connect to MongoDB using your `.env` configuration
- Clear existing data (if any) and insert fresh data
- Automatically disconnect when done

**Verify Database:**
You can verify the data was imported by checking MongoDB:
\`\`\`bash
# If mongosh is installed:
mongosh codequest
db.questions.countDocuments()
db.badges.countDocuments()
\`\`\`

### 5. Start Servers

**Terminal 1 - Backend:**
\`\`\`bash
npm start
# or for development (with auto-reload)
npm run dev
\`\`\`

The backend server will start on `http://localhost:3000`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

The frontend will start on `http://localhost:5173`

**Note:** 
- Keep both terminals open while developing
- Backend must be running before frontend can connect
- Check console output for any connection errors

### 6. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API Keys Setup

### Judge0 API

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to Judge0 API
3. Get your API key
4. Add to `.env` file

### OpenAI API (Optional - for AI Tutor)

1. Sign up at [OpenAI](https://platform.openai.com/)
2. Get your API key
3. Add to `.env` file

**Note:** The AI Tutor will work with basic hints even without OpenAI API key, but full features require the API.

## Testing the Application

1. **Register a new account** at http://localhost:5173/register
2. **Login** and go to the Lobby
3. **Join a game mode** (1v1, 2v2, or Battle Royale)
4. **Wait for matchmaking** (you may need multiple browser tabs/windows to test)
5. **Solve the problem** in the code editor
6. **Submit your code** and see the results

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongosh` should connect
- Check connection string in `.env`
- Verify MongoDB is listening on default port 27017

### Socket.IO Connection Issues

- Check CORS settings in `server.js`
- Ensure frontend URL matches `FRONTEND_URL` in `.env`
- Check browser console for connection errors

### Code Evaluation Not Working

- Verify Judge0 API key is correct
- Check API rate limits
- Review server logs for Judge0 errors

### Frontend Build Issues

- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version (v16+ required)
- Verify all dependencies are installed

## Production Deployment

### Environment Variables

Update `.env` for production:
- Use strong `JWT_SECRET`
- Set `NODE_ENV=production`
- Update `FRONTEND_URL` to production domain
- Use production MongoDB URI

### Build Frontend

\`\`\`bash
cd frontend
npm run build
\`\`\`

The built files will be in `frontend/dist/`

### Serve Frontend with Backend

You can serve the built frontend from the Express server by updating `server.js`:

\`\`\`javascript
// Serve React app
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});
\`\`\`

## Database Schema

### Users Collection
- Authentication info
- Rating, wins, losses
- XP, level, coins
- Badges, streaks
- Skills analytics

### Questions Collection
- Problem details
- Test cases
- Difficulty, tags
- Solution

### Matches Collection
- Match type (1v1, 2v2, battle-royale)
- Players, teams
- Results, winner
- Timestamps

### Badges Collection
- Badge definitions
- Requirements
- Rarity levels

## Next Steps

1. Customize questions in `questions.json`
2. Add more badges in `scripts/initBadges.js`
3. Configure AI Tutor prompts in `services/aiTutor.js`
4. Customize UI in `frontend/src/`
5. Add more game modes or features

## Support

For issues or questions, please check:
- Server logs for backend errors
- Browser console for frontend errors
- MongoDB logs for database issues
