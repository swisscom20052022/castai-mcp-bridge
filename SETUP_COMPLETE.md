# 🎉 CAST AI MCP Bridge - Complete Setup

## ✅ What We Built

A production-ready **OpenAPI bridge** that exposes your CAST AI MCP server as a standard REST API, enabling integration with ChatGPT Actions and any OpenAPI-compatible tool.

---

## 📦 Project Structure

```
openapi-bridge/
├── 📄 openapi-spec.yaml          # Complete OpenAPI 3.1.0 specification
├── 📦 package.json                # Node.js dependencies & scripts
├── ⚙️ tsconfig.json               # TypeScript configuration
├── 🐳 Dockerfile                  # Production container image
├── 🐳 docker-compose.yml          # Easy deployment config
├── 📝 .env.example                # Environment variables template
├── 🚫 .gitignore                  # Git ignore rules
│
├── src/
│   └── 🟦 server.ts               # Express server (450+ lines)
│
├── 📖 README.md                   # Complete documentation
├── 🤖 CHATGPT_INTEGRATION.md      # ChatGPT setup guide
└── 💡 EXAMPLES.md                 # API examples & use cases
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```powershell
cd openapi-bridge
npm install
```

### 2. Configure API Key

```powershell
# Copy the example environment file
cp .env.example .env

# Edit .env and add your CAST AI API key
notepad .env
```

**Required in `.env`:**
```env
CASTAI_API_KEY=your-cast-ai-api-key-here
CASTAI_API_BASE=https://api.cast.ai
PORT=3000
```

### 3. Run the Bridge

**Development mode (with hot reload):**
```powershell
npm run dev
```

**Production mode:**
```powershell
npm run build
npm start
```

**Docker:**
```powershell
docker-compose up -d
```

### 4. Test the Bridge

```powershell
# Health check
curl http://localhost:3000/health

# List organizations (replace YOUR_KEY)
curl -H "X-CASTAI-API-Key: YOUR_KEY" http://localhost:3000/organizations

# Get OpenAPI spec
curl http://localhost:3000/openapi.json
```

---

## 🎯 Key Features

### ✅ OpenAPI 3.1.0 Compliant REST API

20+ endpoints covering:

**Organizations & Clusters**
- List organizations
- List/get clusters
- Get cluster summaries

**Cost Optimization**
- Cluster cost reports
- Estimated savings
- Workload costs
- Organization-wide costs

**Security & Compliance**
- Container image vulnerabilities
- Security best practices
- Compliance reports
- Security overview

**Workload Management**
- List workloads
- Workload efficiency
- Unscheduled pods

**Node Operations**
- List nodes
- Problematic nodes

**MCP Tools (Advanced)**
- List API specs
- Search endpoints
- Execute raw MCP calls

### ✅ Production-Ready

- **TypeScript** - Fully typed for reliability
- **Docker** - Containerized with health checks
- **Security** - Helmet, CORS, input validation
- **Logging** - Morgan HTTP request logging
- **Error Handling** - Comprehensive error responses
- **Health Checks** - `/health` endpoint for monitoring

---

## 🤖 Connect to ChatGPT

### Step 1: Deploy (Choose One)

**Option A: Quick Testing with ngrok**
```powershell
npm run dev
# In new terminal:
ngrok http 3000
# Copy the HTTPS URL
```

**Option B: Deploy to Render.com (Free)**
1. Push to GitHub
2. Connect Render.com to repo
3. Set environment variables
4. Deploy!

**Option C: Deploy to Railway.app**
```powershell
npm install -g @railway/cli
railway login
railway init
railway up
```

### Step 2: Create ChatGPT GPT

1. Go to [chat.openai.com](https://chat.openai.com)
2. Click profile → **"My GPTs"** → **"Create a GPT"**

3. **Configure:**
   - **Name:** CAST AI Assistant
   - **Description:** Expert assistant for managing Kubernetes with CAST AI
   - **Instructions:** (See CHATGPT_INTEGRATION.md for full prompt)

4. **Add Actions:**
   - Click **"Create new action"**
   - **Authentication:** API Key → Custom → Header: `X-CASTAI-API-Key`
   - **Schema:** Import from URL → `https://your-bridge-url.com/openapi.json`
   - Add your CAST AI API key

5. **Test & Publish:**
   - Try: "What clusters do I have?"
   - Try: "Show me cost report for cluster X"
   - Click **"Save"** and choose visibility

### Step 3: Start Chatting!

```
You: What's my current Kubernetes spend?

CAST AI Assistant: Let me check your clusters...
💰 Current Spend (Last 7 Days): $1,668
   • prod-us-east: $1,245
   • staging-eu: $423
   
🎯 Potential Savings: $284/week
Would you like to see optimization recommendations?
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Complete project documentation, API reference, deployment guides |
| [CHATGPT_INTEGRATION.md](./CHATGPT_INTEGRATION.md) | Step-by-step ChatGPT setup, example conversations, customization |
| [EXAMPLES.md](./EXAMPLES.md) | API examples, Python/PowerShell scripts, use cases |
| [openapi-spec.yaml](./openapi-spec.yaml) | OpenAPI 3.1.0 specification for all endpoints |

---

## 🔐 Security

### API Key Management

```env
# .env file (NEVER commit to git)
CASTAI_API_KEY=your-key-here
```

### Authentication Methods

The bridge supports three authentication headers:

```http
X-CASTAI-API-Key: your-key
# OR
X-API-Key: your-key
# OR
Authorization: Bearer your-key
```

### Best Practices

- ✅ Use separate API keys for different environments
- ✅ Rotate keys regularly
- ✅ Set minimal required permissions
- ✅ Monitor API usage
- ✅ Enable HTTPS in production
- ✅ Use secrets management (AWS Secrets Manager, etc.)

---

## 📊 Available Endpoints

### Core Resources

| Endpoint | Description |
|----------|-------------|
| `GET /organizations` | List user organizations |
| `GET /clusters` | List all clusters |
| `GET /clusters/{id}` | Get cluster details |
| `GET /clusters/{id}/summary` | Cluster summary with cost & efficiency |

### Cost Optimization

| Endpoint | Description |
|----------|-------------|
| `GET /clusters/{id}/cost-report` | Detailed cost breakdown |
| `GET /clusters/{id}/estimated-savings` | Savings recommendations |
| `GET /clusters/{id}/workload-costs` | Cost by workload |
| `GET /organization/daily-cost` | Organization-wide costs |

### Security

| Endpoint | Description |
|----------|-------------|
| `GET /security/images` | Container images with vulnerabilities |
| `GET /security/images/{id}/vulnerabilities` | Detailed vulnerabilities |
| `GET /security/best-practices` | Compliance report |
| `GET /security/overview` | Security overview dashboard |

### Workloads & Nodes

| Endpoint | Description |
|----------|-------------|
| `GET /clusters/{id}/workloads` | List workloads |
| `GET /clusters/{id}/workload-efficiency` | Efficiency metrics |
| `GET /clusters/{id}/unscheduled-pods` | Pods that can't schedule |
| `GET /clusters/{id}/nodes` | List cluster nodes |
| `GET /clusters/{id}/problematic-nodes` | Nodes with issues |

### System

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /openapi.json` | OpenAPI specification |

---

## 🧪 Testing

### Basic Tests

```powershell
# Health check
curl http://localhost:3000/health

# List organizations
curl -H "X-CASTAI-API-Key: YOUR_KEY" http://localhost:3000/organizations

# Get cluster cost
curl -H "X-CASTAI-API-Key: YOUR_KEY" "http://localhost:3000/clusters/CLUSTER_ID/cost-report?startTime=2025-11-01T00:00:00Z&endTime=2025-11-07T23:59:59Z"
```

### Python Example

```python
import requests

headers = {"X-CASTAI-API-Key": "your-key"}
response = requests.get("http://localhost:3000/clusters", headers=headers)
print(response.json())
```

### PowerShell Example

```powershell
$headers = @{"X-CASTAI-API-Key" = "your-key"}
Invoke-RestMethod -Uri "http://localhost:3000/clusters" -Headers $headers
```

---

## 🚢 Deployment

### Local Development
```powershell
npm run dev  # Hot reload enabled
```

### Docker
```powershell
docker-compose up -d
```

### Cloud Platforms

**Render.com (Free)**
- Push to GitHub
- Connect repository
- Set environment variables
- Deploy automatically

**Railway.app**
```powershell
railway login
railway init
railway up
```

**Heroku**
```powershell
heroku create castai-bridge
heroku config:set CASTAI_API_KEY=your-key
git push heroku main
```

**AWS/GCP/Azure**
- Use Docker image
- Deploy to ECS, Cloud Run, or Container Apps
- Configure load balancer with HTTPS
- Set environment variables

---

## 🎯 Use Cases

### 1. **FinOps Automation**
Connect CAST AI cost data to ChatGPT for natural language cost analysis:
- "What's my monthly Kubernetes spend?"
- "Show me the most expensive workloads"
- "How much can I save by increasing spot usage?"

### 2. **Security Monitoring**
Create a GPT that monitors vulnerabilities:
- "Are there any critical CVEs I should patch?"
- "Show me compliance status"
- "Which images need updating?"

### 3. **Incident Response**
Quick troubleshooting through chat:
- "Why are pods failing to schedule?"
- "Show me problematic nodes"
- "What's causing the cost spike?"

### 4. **Report Generation**
Automated reporting:
- Daily cost emails
- Weekly security audits
- Monthly efficiency reports

### 5. **Workflow Integration**
Connect to automation tools:
- Zapier workflows
- Make.com scenarios
- Custom CI/CD pipelines
- Slack/Teams notifications

---

## 🔧 Customization

### Add New Endpoints

Edit `src/server.ts`:

```typescript
app.get('/custom/endpoint', async (req, res, next) => {
  try {
    const apiKey = getApiKey(req);
    const data = await callCastAI('/v1/your-endpoint', 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
```

### Update OpenAPI Spec

Edit `openapi-spec.yaml`:

```yaml
paths:
  /custom/endpoint:
    get:
      operationId: customOperation
      summary: Your custom endpoint
      # ... rest of spec
```

### Add Middleware

```typescript
// Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## 📈 Monitoring

### Health Checks

```bash
curl http://localhost:3000/health
```

### Logging

The server logs all HTTP requests with Morgan:

```
GET /clusters 200 245ms - 1234 bytes
POST /mcp/execute 200 567ms - 890 bytes
```

### Docker Logs

```powershell
docker-compose logs -f castai-bridge
```

### Metrics

Extend the bridge to expose Prometheus metrics:

```typescript
import promClient from 'prom-client';

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});
```

---

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Change port in .env
PORT=3001
```

### API Key Issues
- ✅ Check key is valid in CAST AI console
- ✅ Verify correct region (US vs EU)
- ✅ Ensure key has required permissions

### CORS Errors
```typescript
// Allow specific origins
app.use(cors({
  origin: ['https://chatgpt.com', 'https://chat.openai.com']
}));
```

### Docker Build Fails
```powershell
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up
```

---

## 🤝 Next Steps

1. ✅ **Test Locally** - Verify all endpoints work
2. ✅ **Deploy** - Choose a cloud platform
3. ✅ **Connect to ChatGPT** - Create your GPT
4. ✅ **Customize** - Add your own endpoints
5. ✅ **Monitor** - Set up logging and alerts
6. ✅ **Share** - Let your team use it!

---

## 📖 Additional Resources

- [CAST AI Documentation](https://docs.cast.ai)
- [CAST AI Console](https://console.cast.ai)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0)
- [ChatGPT Actions](https://platform.openai.com/docs/actions)

---

## 💡 Pro Tips

1. **Use ngrok for quick testing** before deploying
2. **Create multiple GPTs** for different teams (FinOps, Security, DevOps)
3. **Set up monitoring** to track API usage and costs
4. **Rotate API keys** regularly for security
5. **Cache responses** for frequently accessed data
6. **Add rate limiting** to prevent abuse
7. **Use HTTPS** always in production

---

## 🎓 What You Learned

✅ How to build an OpenAPI bridge for MCP servers  
✅ How to expose MCP tools as REST endpoints  
✅ How to integrate with ChatGPT Actions  
✅ How to deploy Node.js/TypeScript apps  
✅ How to work with Docker containers  
✅ How to authenticate API requests  
✅ How to create ChatGPT custom GPTs  

---

## 🎉 Success!

You now have a **production-ready OpenAPI bridge** that:

- ✅ Exposes 20+ CAST AI endpoints as REST API
- ✅ Works with ChatGPT Actions
- ✅ Supports cost, security, workload, and node operations
- ✅ Is containerized and ready to deploy
- ✅ Has comprehensive documentation
- ✅ Includes Python and PowerShell examples
- ✅ Follows security best practices

**Start chatting with your infrastructure through ChatGPT! 🚀**

---

## 📞 Support

Need help?
- 📖 Check the [README](./README.md)
- 💬 [CAST AI Community](https://community.cast.ai)
- 📧 [CAST AI Support](https://docs.cast.ai/support)

---

**Built with ❤️ for the CAST AI community**
