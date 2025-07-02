# Mosaia RugCheck Tool

A Mosaia tool for interacting with the RugCheck API to analyze Solana tokens and domains.

## Features

- Get verified token statistics
- Get new and trending tokens
- Get token summaries and voting statistics
- Manage .token domains
- View leaderboard rankings
- Check service status

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory:
```env
PORT=3000
```

## Local Development

Run the tool locally:
```bash
npm run start:dev
```

## Deploying to Mosaia

To deploy this tool to Mosaia:

1. Push your code to a GitHub repository
2. Contact the Mosaia team to add your repository as a tool
3. The tool will be available in the Mosaia marketplace once approved

## Available Endpoints

All endpoints are accessed via POST requests to `/execute` with an `action` parameter:

### Token Information
- `get_verified_stats`: Get list of verified tokens
- `get_new_tokens`: Get recently detected tokens
- `get_trending_tokens`: Get most voted tokens in 24h
- `get_recent_tokens`: Get most viewed tokens in 24h
- `get_token_summary`: Get token report summary
- `get_token_votes`: Get token voting statistics

### Domain Services
- `get_domains`: Get registered .token domains (supports pagination)
- `get_domains_csv`: Get registered domains in CSV format
- `lookup_domain`: Get domain address by name
- `get_domain_records`: Get domain records by name

### General Services
- `get_leaderboard`: Get user leaderboard rankings (supports pagination)
- `check_maintenance`: Check service status

## Example Usage

Get verified tokens:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"action": "get_verified_stats"}' \
  http://localhost:3000/execute
```

Get token summary:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"action": "get_token_summary", "token_id": "YOUR_TOKEN_ID"}' \
  http://localhost:3000/execute
```

Get domains with pagination:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"action": "get_domains", "params": {"page": 0, "limit": 50, "verified": true}}' \
  http://localhost:3000/execute
```

## License

Apache License 