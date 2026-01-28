
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    // Use the URI from .env
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas successfully!");
    
    const users = await User.find({}, 'username email');
    console.log(`\nFound ${users.length} users in the database:`);
    users.forEach(u => console.log(`- ${u.username} (${u.email})`));
    
    if (users.length === 0) {
      console.log("\n⚠️ The database is empty! This explains why login fails - no users exist.");
    }

  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    if (error.code === '8000') {
      console.log("Hint: This might be an IP Whitelist issue. Check MongoDB Atlas Network Access.");
    }
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

checkDB();
