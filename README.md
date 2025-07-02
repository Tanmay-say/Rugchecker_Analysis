# RugCheck Token Analyzer - Mosaia Tool

A Mosaia tool for analyzing and verifying tokens using the RugCheck API.

## Features

- Get statistics about verified tokens
- Retrieve detailed token reports by ID

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your RugCheck API key:
   ```
   RUGCHECK_API_KEY=your_api_key_here
   ```
4. Install the GitHub app by clicking the "Launch App" button on: https://mosaia.ai/org/mosaia/app/github

## Local Development

1. Start the development server:
   ```bash
   npm run start:dev
   ```

2. In a separate terminal, run the test script:
   ```bash
   npm run test:request
   ```

## Tool Parameters

The tool accepts the following parameters:

- `action`: Either 'get_verified_stats' or 'get_token_report'
- `token_id`: (Required for get_token_report) The ID of the token to analyze

## Example Usage

```javascript
// Get verified token stats
{
  "action": "get_verified_stats"
}

// Get token report
{
  "action": "get_token_report",
  "token_id": "your_token_id"
}
```

## Integration with Mosaia

This tool can be integrated with Mosaia AI agents for automated token analysis and verification. Follow the Mosaia documentation for agent integration steps.

## License

MIT 