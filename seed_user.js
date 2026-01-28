
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB Atlas successfully!");

        // Check if user exists
        const existing = await User.findOne({ email: 'test@example.com' });
        if (existing) {
            console.log("ℹ️ Test user 'test@example.com' already exists.");
        } else {
            console.log("Creating test user...");
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({
                username: 'TestUser',
                email: 'test@example.com',
                password: hashedPassword,
                college: 'Test University'
            });
            console.log("✅ Created test user: test@example.com / password123");
        }

        // Count users again
        const count = await User.countDocuments();
        console.log(`Total users in database: ${count}`);

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

seedDB();
