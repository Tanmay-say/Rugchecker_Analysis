const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const RUGCHECK_BASE_URL = 'https://api.rugcheck.xyz/v1';

// Helper function to make API calls to RugCheck
async function callRugCheckAPI(endpoint, method = 'GET', requiresAuth = false) {
  try {
    console.log('Making API call to:', `${RUGCHECK_BASE_URL}${endpoint}`);
    const headers = {
      'Content-Type': 'application/json'
    };

    // Only add authentication for endpoints that require it
    if (requiresAuth) {
      headers['Authorization'] = 'tanmay1say@2828';  // Using the auth API key from Swagger UI
    }

    const response = await axios({
      method,
      url: `${RUGCHECK_BASE_URL}${endpoint}`,
      headers
    });
    return response.data;
  } catch (error) {
    console.error('RugCheck API Error:', error.response?.data || error.message);
    throw error;
  }
}

app.post('/execute', async (req, res) => {
  try {
    const { action, token_id } = req.body;

    switch (action) {
      case 'get_verified_stats':
        // Stats endpoint doesn't require authentication
        const stats = await callRugCheckAPI('/stats/verified', 'GET', false);
        return res.json(stats);

      case 'get_token_report':
        if (!token_id) {
          return res.status(400).json({ error: 'token_id is required for get_token_report action' });
        }
        console.log('Getting report for token:', token_id);
        // Token report endpoint requires authentication
        const report = await callRugCheckAPI(`/tokens/${token_id}/report`, 'GET', true);
        return res.json(report);

      default:
        return res.status(400).json({ error: 'Invalid action. Use get_verified_stats or get_token_report' });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to execute RugCheck API request',
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RugCheck Tool running on port ${PORT}`);
}); 