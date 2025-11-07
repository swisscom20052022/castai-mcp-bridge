# CAST AI MCP Bridge

> OpenAPI bridge for CAST AI Model Context Protocol (MCP) server - Connect CAST AI to ChatGPT Actions and other OpenAPI clients

This bridge exposes the CAST AI MCP server as a standard REST API with OpenAPI 3.1.0 specification, enabling integration with ChatGPT Actions, custom GPTs, and any OpenAPI-compatible tool.

## 🎯 Features

- ✅ **OpenAPI 3.1.0 Compliant** - Standard REST API with full specification
- ✅ **ChatGPT Actions Ready** - Import directly into ChatGPT GPT Builder
- ✅ **300+ CAST AI Endpoints** - Full platform access through clean REST interface
- ✅ **Cost Optimization** - Cluster cost reports, savings recommendations, workload costs
- ✅ **Security & Compliance** - Vulnerability scanning, best practices, attack paths
- ✅ **Workload Management** - Efficiency tracking, autoscaling, unscheduled pods
- ✅ **Node Operations** - Cluster nodes, problematic nodes, node configurations
- ✅ **Docker Ready** - Production-ready container with health checks
- ✅ **TypeScript** - Fully typed for reliability and maintainability

## 📋 Prerequisites

- Node.js 18+ (or Docker)
- CAST AI account with API key ([Get one here](https://console.cast.ai))
- (Optional) ChatGPT Plus account for GPT Actions

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone and Setup**

```powershell
cd openapi-bridge
npm install
```

2. **Configure Environment**

```powershell
cp .env.example .env
```

Edit `.env` and add your CAST AI API key:

```env
CASTAI_API_KEY=your-cast-ai-api-key-here
CASTAI_API_BASE=https://api.cast.ai
PORT=3000
```

3. **Run Development Server**

```powershell
npm run dev
```

The bridge will be available at `http://localhost:3000`

### Option 2: Docker

1. **Build and Run with Docker Compose**

```powershell
# Create .env file with your API key
cp .env.example .env

# Edit .env and add your CAST AI API key

# Start the container
docker-compose up -d
```

2. **Check Status**

```powershell
docker-compose ps
docker-compose logs -f castai-bridge
```

The bridge will be available at `http://localhost:3000`

## 📊 Available Endpoints

### Core Resources

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/organizations` | GET | List user organizations |
| `/clusters` | GET | List all clusters |
| `/clusters/{id}` | GET | Get cluster details |
| `/clusters/{id}/summary` | GET | Get cluster summary (cost, nodes, efficiency) |

### Cost Optimization

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/clusters/{id}/cost-report` | GET | Cluster cost breakdown |
| `/clusters/{id}/estimated-savings` | GET | Available savings recommendations |
| `/clusters/{id}/workload-costs` | GET | Cost by workload |
| `/organization/daily-cost` | GET | Organization-wide daily costs |

### Security

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/security/images` | GET | List container images with vulnerabilities |
| `/security/images/{tagId}/vulnerabilities` | GET | Detailed vulnerabilities for an image |
| `/security/best-practices` | GET | Latest compliance report |
| `/security/overview` | GET | Security overview (vulnerabilities, best practices, attack paths) |

### Workloads

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/clusters/{id}/workloads` | GET | List cluster workloads |
| `/clusters/{id}/workload-efficiency` | GET | Workload efficiency metrics |
| `/clusters/{id}/unscheduled-pods` | GET | Pods that cannot be scheduled |

### Nodes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/clusters/{id}/nodes` | GET | List cluster nodes |
| `/clusters/{id}/problematic-nodes` | GET | Nodes with issues |

### MCP Tools (Advanced)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mcp/specs` | GET | List all MCP API specifications |
| `/mcp/endpoints` | GET | List endpoints for a spec |
| `/mcp/endpoint-details` | POST | Get detailed endpoint info |
| `/mcp/search` | GET | Search across all specs |
| `/mcp/execute` | POST | Execute direct MCP API call |

### System

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check endpoint |
| `/openapi.json` | GET | OpenAPI 3.1.0 specification |

## 🔐 Authentication

All endpoints require CAST AI API authentication. Provide your API key in one of these headers:

```http
X-CASTAI-API-Key: your-api-key-here
```

Or:

```http
X-API-Key: your-api-key-here
```

Or:

```http
Authorization: Bearer your-api-key-here
```

## 🧪 Testing the Bridge

### 1. Health Check

```powershell
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-07T10:00:00.000Z",
  "castaiBase": "https://api.cast.ai"
}
```

### 2. List Organizations

```powershell
curl -H "X-CASTAI-API-Key: YOUR_KEY" http://localhost:3000/organizations
```

### 3. Get Cluster Summary

```powershell
curl -H "X-CASTAI-API-Key: YOUR_KEY" http://localhost:3000/clusters/YOUR_CLUSTER_ID/summary
```

### 4. Get Cost Report

```powershell
$startTime = "2025-11-01T00:00:00Z"
$endTime = "2025-11-07T23:59:59Z"
curl -H "X-CASTAI-API-Key: YOUR_KEY" "http://localhost:3000/clusters/YOUR_CLUSTER_ID/cost-report?startTime=$startTime&endTime=$endTime"
```

## 🤖 Connecting to ChatGPT Actions

See the detailed guide in [CHATGPT_INTEGRATION.md](./CHATGPT_INTEGRATION.md) for step-by-step instructions.

### Quick Summary:

1. **Deploy the bridge** to a publicly accessible URL (or use ngrok for testing)
2. **Open ChatGPT** and create a new GPT
3. **Add Action** → Import from URL → `https://your-bridge.example.com/openapi.json`
4. **Configure Authentication** → API Key → Header name: `X-CASTAI-API-Key`
5. **Test** your GPT with queries like:
   - "What clusters do I have?"
   - "Show me the cost report for cluster X"
   - "What are the estimated savings for my clusters?"

## 🏗️ Project Structure

```
openapi-bridge/
├── src/
│   └── server.ts          # Main Express server with all routes
├── openapi-spec.yaml      # OpenAPI 3.1.0 specification
├── package.json           # Node.js dependencies
├── tsconfig.json          # TypeScript configuration
├── Dockerfile             # Docker container definition
├── docker-compose.yml     # Docker Compose configuration
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `CASTAI_API_BASE` | CAST AI API base URL | `https://api.cast.ai` |
| `CASTAI_API_KEY` | Your CAST AI API key | Required |
| `LOG_LEVEL` | Logging level | `info` |
| `RATE_LIMIT` | Requests per minute | `100` |

### CAST AI Regions

- **US**: `https://api.cast.ai`
- **EU**: `https://api.eu.cast.ai`

Update `CASTAI_API_BASE` in your `.env` file accordingly.

## 🚢 Deployment

### Option 1: Cloud Platform (Recommended for Production)

#### Deploy to Render.com (Free Tier Available)

1. Push code to GitHub
2. Connect Render.com to your repository
3. Configure as Web Service
4. Set environment variables (especially `CASTAI_API_KEY`)
5. Deploy!

#### Deploy to Railway.app

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Deploy to Heroku

```powershell
heroku create castai-mcp-bridge
heroku config:set CASTAI_API_KEY=your-key-here
git push heroku main
```

### Option 2: Self-Hosted VPS

```bash
# SSH into your server
ssh user@your-server.com

# Clone and setup
git clone <your-repo>
cd openapi-bridge
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start dist/server.js --name castai-bridge
pm2 save
pm2 startup
```

### Option 3: Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: castai-mcp-bridge
spec:
  replicas: 2
  selector:
    matchLabels:
      app: castai-bridge
  template:
    metadata:
      labels:
        app: castai-bridge
    spec:
      containers:
      - name: bridge
        image: castai-mcp-bridge:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: CASTAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: castai-secret
              key: api-key
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 30
```

## 🛠️ Development

### Build TypeScript

```powershell
npm run build
```

### Run in Development Mode (with hot reload)

```powershell
npm run dev
```

### Lint Code

```powershell
npm run lint
```

### Docker Development

```powershell
# Build image
docker build -t castai-mcp-bridge .

# Run container
docker run -p 3000:3000 --env-file .env castai-mcp-bridge

# View logs
docker logs -f <container-id>
```

## 📝 API Examples

### Get Organization Costs for Last 7 Days

```javascript
const axios = require('axios');

const response = await axios.get('http://localhost:3000/organization/daily-cost', {
  headers: {
    'X-CASTAI-API-Key': 'your-key-here'
  },
  params: {
    startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date().toISOString()
  }
});

console.log('Total Cost:', response.data.totalCost);
```

### Get Security Images with Critical Vulnerabilities

```python
import requests

response = requests.get(
    'http://localhost:3000/security/images',
    headers={'X-CASTAI-API-Key': 'your-key-here'},
    params={'severityThreshold': 'CRITICAL'}
)

for image in response.json():
    print(f"{image['name']}: {image['criticalVulnerabilities']} critical CVEs")
```

### Get Unscheduled Pods

```bash
curl -H "X-CASTAI-API-Key: your-key" \
  http://localhost:3000/clusters/YOUR_CLUSTER_ID/unscheduled-pods | jq
```

## 🔍 Troubleshooting

### Bridge won't start

- ✅ Check that port 3000 is available
- ✅ Verify `.env` file exists with valid `CASTAI_API_KEY`
- ✅ Check Node.js version (must be 18+)
- ✅ Run `npm install` to ensure dependencies are installed

### API returns 401 Unauthorized

- ✅ Verify API key is correct in `.env`
- ✅ Check that API key has not expired
- ✅ Ensure you're using the correct CAST AI region (US vs EU)

### API returns 404 Not Found

- ✅ Verify cluster ID exists in your CAST AI account
- ✅ Check that the endpoint path is correct
- ✅ Ensure you have access to the requested resource

### Docker container fails health check

- ✅ Check container logs: `docker-compose logs castai-bridge`
- ✅ Verify environment variables are set correctly
- ✅ Ensure CAST AI API is accessible from container

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🔗 Resources

- [CAST AI Documentation](https://docs.cast.ai)
- [CAST AI Console](https://console.cast.ai)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0)
- [ChatGPT Actions Guide](https://platform.openai.com/docs/actions)

## 💡 Use Cases

### FinOps Automation
Connect CAST AI cost data to ChatGPT for natural language cost analysis and optimization recommendations.

### Security Monitoring
Create a GPT that monitors container vulnerabilities and provides remediation advice.

### Cluster Management
Build conversational interfaces for managing Kubernetes clusters through ChatGPT.

### Report Generation
Automatically generate cost, efficiency, and security reports on demand.

### Workflow Integration
Connect CAST AI to Zapier, Make.com, or custom workflows via standard REST API.

## 🎓 Next Steps

1. ✅ [Connect to ChatGPT Actions](./CHATGPT_INTEGRATION.md)
2. ✅ Explore the [OpenAPI Spec](./openapi-spec.yaml)
3. ✅ Check out [Example Queries](./EXAMPLES.md)
4. ✅ Join the [CAST AI Community](https://community.cast.ai)

---

**Built with ❤️ for the CAST AI community**

Need help? [Open an issue](https://github.com/your-repo/issues) or reach out to [CAST AI Support](https://docs.cast.ai)
