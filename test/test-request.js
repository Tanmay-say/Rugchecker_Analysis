const axios = require('axios');

async function testTool() {
  const TEST_URL = 'http://localhost:3000/execute';
  
  try {
    // Test get_verified_stats
    console.log('\nTesting get_verified_stats...');
    const statsResponse = await axios.post(TEST_URL, {
      action: 'get_verified_stats'
    });
    console.log('Verified Stats Response:', JSON.stringify(statsResponse.data, null, 2));

    // Test get_new_tokens
    console.log('\nTesting get_new_tokens...');
    const newTokensResponse = await axios.post(TEST_URL, {
      action: 'get_new_tokens'
    });
    console.log('New Tokens Response:', JSON.stringify(newTokensResponse.data, null, 2));

    // Test get_trending_tokens
    console.log('\nTesting get_trending_tokens...');
    const trendingResponse = await axios.post(TEST_URL, {
      action: 'get_trending_tokens'
    });
    console.log('Trending Tokens Response:', JSON.stringify(trendingResponse.data, null, 2));

    // Test get_recent_tokens
    console.log('\nTesting get_recent_tokens...');
    const recentResponse = await axios.post(TEST_URL, {
      action: 'get_recent_tokens'
    });
    console.log('Recent Tokens Response:', JSON.stringify(recentResponse.data, null, 2));

    // Get a token ID from verified stats to test other endpoints
    if (Array.isArray(statsResponse.data) && statsResponse.data.length > 0) {
      const testToken = statsResponse.data[0];
      console.log(`\nUsing token for further tests: ${testToken.mint}`);

      // Test get_token_summary
      console.log('\nTesting get_token_summary...');
      const summaryResponse = await axios.post(TEST_URL, {
        action: 'get_token_summary',
        token_id: testToken.mint
      });
      console.log('Token Summary Response:', JSON.stringify(summaryResponse.data, null, 2));

      // Test get_token_report
      console.log('\nTesting get_token_report...');
      try {
        const reportResponse = await axios.post(TEST_URL, {
          action: 'get_token_report',
          token_id: testToken.mint
        });
        console.log('Token Report Response:', JSON.stringify(reportResponse.data, null, 2));
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('Token report requires authentication. Please set RUGCHECK_JWT_TOKEN in .env file.');
        } else {
          throw error;
        }
      }
    }

  } catch (error) {
    console.error('Test Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
    if (error.request) {
      console.error('Request was made but no response received');
    }
  }
}

testTool();
