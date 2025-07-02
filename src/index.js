const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const RUGCHECK_BASE_URL = 'https://api.rugcheck.xyz/v1';

// Helper function to make API calls to RugCheck
async function callRugCheckAPI(endpoint, method = 'GET', body = null, params = null) {
  try {
    console.log('Making API call to:', `${RUGCHECK_BASE_URL}${endpoint}`);
    const headers = {
      'Content-Type': 'application/json'
    };

    const config = {
      method,
      url: `${RUGCHECK_BASE_URL}${endpoint}`,
      headers
    };

    if (body) {
      config.data = body;
    }

    if (params) {
      config.params = params;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('RugCheck API Error:', error.response?.data || error.message);
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw error;
  }
}

app.post('/execute', async (req, res) => {
  try {
    const { action, token_id, params = {} } = req.body;

    switch (action) {
      case 'get_verified_stats':
        const stats = await callRugCheckAPI('/stats/verified', 'GET');
        return res.json(stats);

      case 'get_new_tokens':
        const newTokens = await callRugCheckAPI('/stats/new_tokens', 'GET');
        return res.json(newTokens);

      case 'get_trending_tokens':
        const trendingTokens = await callRugCheckAPI('/stats/trending', 'GET');
        return res.json(trendingTokens);

      case 'get_recent_tokens':
        const recentTokens = await callRugCheckAPI('/stats/recent', 'GET');
        return res.json(recentTokens);

      case 'get_token_summary':
        if (!token_id) {
          return res.status(400).json({ error: 'token_id is required for get_token_summary action' });
        }
        console.log('Getting summary for token:', token_id);
        const summary = await callRugCheckAPI(`/tokens/${token_id}/report/summary`, 'GET');
        return res.json(summary);

      case 'get_token_votes':
        if (!token_id) {
          return res.status(400).json({ error: 'token_id is required for get_token_votes action' });
        }
        console.log('Getting votes for token:', token_id);
        const votes = await callRugCheckAPI(`/tokens/${token_id}/votes`, 'GET');
        return res.json(votes);

      case 'get_domains':
        // Optional parameters: page, limit, verified
        const domains = await callRugCheckAPI('/domains', 'GET', null, params);
        return res.json(domains);

      case 'get_domains_csv':
        // Optional parameter: verified
        const domainsCSV = await callRugCheckAPI('/domains/data.csv', 'GET', null, params);
        return res.json(domainsCSV);

      case 'lookup_domain':
        if (!token_id) {
          return res.status(400).json({ error: 'token_id (domain name) is required for lookup_domain action' });
        }
        const domainAddress = await callRugCheckAPI(`/domains/lookup/${token_id}`, 'GET');
        return res.json(domainAddress);

      case 'get_domain_records':
        if (!token_id) {
          return res.status(400).json({ error: 'token_id (domain name) is required for get_domain_records action' });
        }
        const domainRecords = await callRugCheckAPI(`/domains/records/${token_id}`, 'GET');
        return res.json(domainRecords);

      case 'get_leaderboard':
        // Optional parameters: page, limit
        const leaderboard = await callRugCheckAPI('/leaderboard', 'GET', null, params);
        return res.json(leaderboard);

      case 'check_maintenance':
        const maintenance = await callRugCheckAPI('/maintenance', 'GET');
        return res.json(maintenance);

      default:
        return res.status(400).json({ 
          error: 'Invalid action',
          validActions: [
            'get_verified_stats',
            'get_new_tokens',
            'get_trending_tokens',
            'get_recent_tokens',
            'get_token_summary',
            'get_token_votes',
            'get_domains',
            'get_domains_csv',
            'lookup_domain',
            'get_domain_records',
            'get_leaderboard',
            'check_maintenance'
          ]
        });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(error.response?.status || 500).json({
      error: 'Failed to execute RugCheck API request',
      details: error.message,
      status: error.response?.status
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RugCheck Tool running on port ${PORT}`);
  console.log('Available actions:');
  console.log('- get_verified_stats: Get list of verified tokens');
  console.log('- get_new_tokens: Get list of recently detected tokens');
  console.log('- get_trending_tokens: Get most voted tokens in last 24h');
  console.log('- get_recent_tokens: Get most viewed tokens in last 24h');
  console.log('- get_token_summary: Get token report summary');
  console.log('- get_token_votes: Get token voting statistics');
  console.log('- get_domains: Get registered .token domains (supports pagination)');
  console.log('- get_domains_csv: Get registered domains in CSV format');
  console.log('- lookup_domain: Get domain address by name');
  console.log('- get_domain_records: Get domain records by name');
  console.log('- get_leaderboard: Get user leaderboard rankings (supports pagination)');
  console.log('- check_maintenance: Check if the service is up and running');
});
