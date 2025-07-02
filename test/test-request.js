const axios = require('axios');

async function testTool() {
  const TEST_URL = 'http://localhost:3000/execute';
  
  try {
    // Test get_verified_stats
    console.log('Testing get_verified_stats...');
    const statsResponse = await axios.post(TEST_URL, {
      action: 'get_verified_stats'
    });
    console.log('Verified Stats Response:', JSON.stringify(statsResponse.data, null, 2));

    if (!Array.isArray(statsResponse.data) || statsResponse.data.length === 0) {
      console.log('No verified tokens found in response');
      return;
    }

    // Get the first token from the verified stats to test the report
    const firstToken = statsResponse.data[0];
    console.log('\nTesting get_token_report with token:', firstToken.mint);
    
    const reportResponse = await axios.post(TEST_URL, {
      action: 'get_token_report',
      token_id: firstToken.mint
    });
    console.log('Token Report Response:', JSON.stringify(reportResponse.data, null, 2));

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