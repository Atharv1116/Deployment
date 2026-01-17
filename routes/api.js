const express = require('express');
const User = require('../models/User');
const Question = require('../models/Question');
const Match = require('../models/Match');
const router = express.Router();

// Leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { type = 'global', college = '' } = req.query;

    let query = {};
    if (type === 'college' && college) {
      query.college = college;
    }

    const players = await User.find(query)
      .select('username rating wins losses matches level xp college')
      .sort({ rating: -1 })
      .limit(100);

    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User stats
router.get('/user/:id/stats', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('practiceRecommendations', 'title difficulty tags');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Match history
router.get('/user/:id/matches', async (req, res) => {
  try {
    const matches = await Match.find({
      players: req.params.id
    })
      .populate('question', 'title difficulty')
      .populate('players', 'username')
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Questions
router.get('/questions', async (req, res) => {
  try {
    const { difficulty, tags } = req.query;
    let query = {};

    if (difficulty) query.difficulty = difficulty;
    if (tags) query.tags = { $in: tags.split(',') };

    const questions = await Question.find(query).limit(100);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get question by ID
router.get('/questions/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
