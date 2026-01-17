const axios = require('axios');

const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '1331538818msh94e20c66f87ea29p1905fcjsnf6c4c3ee1062';
const JUDGE0_HOST = process.env.JUDGE0_HOST || 'judge0-ce.p.rapidapi.com';
const JUDGE0_BASE = `https://${JUDGE0_HOST}`;

// Language IDs mapping
const LANGUAGE_IDS = {
  python: 71,
  javascript: 63,
  java: 62,
  cpp: 54,
  c: 50
};

async function submitToJudge0({ source_code, language_id, stdin, expected_output, time_limit = 2 }) {
  try {
    const postResp = await axios.post(`${JUDGE0_BASE}/submissions`, {
      source_code,
      language_id,
      stdin,
      expected_output,
      cpu_time_limit: time_limit
    }, {
      headers: {
        'X-RapidAPI-Key': JUDGE0_API_KEY,
        'X-RapidAPI-Host': JUDGE0_HOST,
        'Content-Type': 'application/json'
      }
    });

    const token = postResp.data.token;
    
    // Polling loop (max 20 attempts = 20 seconds)
    for (let tries = 0; tries < 20; tries++) {
      await new Promise(r => setTimeout(r, 1000));
      
      const res = await axios.get(`${JUDGE0_BASE}/submissions/${token}`, {
        headers: {
          'X-RapidAPI-Key': JUDGE0_API_KEY,
          'X-RapidAPI-Host': JUDGE0_HOST
        },
        params: { base64_encoded: 'false', fields: '*' }
      });
      
      if (res.data && res.data.status && res.data.status.id >= 3) {
        return {
          ...res.data,
          correct: res.data.status.id === 3 && res.data.stdout && res.data.stdout.trim() === (expected_output || '').trim()
        };
      }
    }
    
    return { 
      status: { id: 4, description: 'Time limit waiting for Judge0' },
      correct: false 
    };
  } catch (err) {
    console.error('Judge0 error:', err.message || err);
    throw err;
  }
}

module.exports = { submitToJudge0, LANGUAGE_IDS };
