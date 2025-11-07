# ChatGPT Integration Guide

> Step-by-step guide to connect your CAST AI MCP Bridge to ChatGPT Actions

## 🎯 Overview

This guide will show you how to create a custom ChatGPT that can interact with your CAST AI infrastructure through natural language.

### What You'll Build

A ChatGPT-powered assistant that can:
- 💰 Analyze cluster costs and provide savings recommendations
- 🔒 Monitor security vulnerabilities and compliance
- ⚙️ Manage workloads and nodes
- 📊 Generate reports and dashboards
- 🤖 Answer questions about your Kubernetes infrastructure

## 📋 Prerequisites

1. ✅ CAST AI account with API key
2. ✅ ChatGPT Plus subscription (required for GPT Actions)
3. ✅ CAST AI MCP Bridge deployed and accessible via HTTPS

## 🚀 Deployment Options

### Option A: Quick Testing with ngrok (Recommended for Testing)

**Perfect for:** Local development and quick testing

```powershell
# 1. Start your bridge locally
cd openapi-bridge
npm install
npm run dev

# 2. In a new terminal, install and run ngrok
# Download from: https://ngrok.com/download
ngrok http 3000

# 3. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
```

⚠️ **Note:** ngrok free URLs change on every restart. For production, use a proper deployment.

### Option B: Deploy to Cloud (Recommended for Production)

#### Deploy to Render.com (Free Tier)

1. **Push to GitHub**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `castai-mcp-bridge`
     - **Environment:** `Node`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `node dist/server.js`
     - **Plan:** Free

3. **Add Environment Variables**
   ```
   CASTAI_API_KEY=your-cast-ai-api-key
   CASTAI_API_BASE=https://api.cast.ai
   NODE_ENV=production
   ```

4. **Deploy** and copy your service URL (e.g., `https://castai-mcp-bridge.onrender.com`)

#### Deploy to Railway.app

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Add environment variables
railway variables set CASTAI_API_KEY=your-key
railway variables set CASTAI_API_BASE=https://api.cast.ai

# Get your URL
railway domain
```

## 🤖 Create Your ChatGPT

### Step 1: Access GPT Builder

1. Go to [chat.openai.com](https://chat.openai.com)
2. Click on your profile → **"My GPTs"**
3. Click **"Create a GPT"**

### Step 2: Configure Your GPT

#### **Configure Tab:**

**Name:**
```
CAST AI Assistant
```

**Description:**
```
Expert assistant for managing Kubernetes infrastructure with CAST AI. Provides cost optimization, security monitoring, workload management, and infrastructure insights.
```

**Instructions:**
```
You are an expert CAST AI assistant that helps users manage their Kubernetes clusters.

Your capabilities:
- Analyze cluster costs and provide savings recommendations
- Monitor container security vulnerabilities
- Track workload efficiency and resource usage
- Manage nodes and troubleshoot issues
- Generate reports and dashboards
- Answer questions about Kubernetes infrastructure

Guidelines:
1. Always ask for cluster ID if not provided
2. Present cost data in clear, formatted tables
3. Highlight critical security issues immediately
4. Provide actionable recommendations
5. Explain technical concepts in simple terms
6. Use emojis for better readability (💰 for costs, 🔒 for security, ⚙️ for operations)

When analyzing costs:
- Show both absolute numbers and trends
- Compare current vs. potential savings
- Recommend specific optimization actions

When discussing security:
- Prioritize critical and high vulnerabilities
- Explain CVE severity and impact
- Suggest remediation steps

Always be professional, helpful, and concise.
```

**Conversation Starters:**
```
1. What clusters do I have in my organization?
2. Show me the cost report for my clusters
3. What are the estimated savings opportunities?
4. Are there any security vulnerabilities I should know about?
5. Show me unscheduled pods in my cluster
```

### Step 3: Add Actions

1. **Click "Create new action"**

2. **Authentication**
   - Select **"API Key"**
   - **Auth Type:** `Custom`
   - **Custom Header Name:** `X-CASTAI-API-Key`
   - **API Key:** Your CAST AI API key from [console.cast.ai](https://console.cast.ai)

3. **Schema**
   - Select **"Import from URL"**
   - **URL:** `https://your-bridge-url.com/openapi.json`
   - Or paste the contents of `openapi-spec.yaml`
   - Click **"Import"**

4. **Available Actions** (verify these were imported):
   - ✅ listOrganizations
   - ✅ listClusters
   - ✅ getClusterSummary
   - ✅ getClusterCostReport
   - ✅ getEstimatedSavings
   - ✅ getWorkloadCosts
   - ✅ listSecurityImages
   - ✅ getSecurityOverview
   - ✅ listWorkloads
   - ✅ getUnscheduledPods
   - ✅ listClusterNodes
   - ✅ getProblematicNodes

5. **Click "Update" then "Confirm"**

### Step 4: Test Your GPT

Click **"Preview"** and try these queries:

#### Test 1: List Organizations
```
What organizations do I have access to?
```

Expected: List of your CAST AI organizations with IDs and names

#### Test 2: Get Clusters
```
Show me all my Kubernetes clusters
```

Expected: Table with cluster names, IDs, regions, and status

#### Test 3: Cost Analysis
```
What's the cost report for cluster <cluster-id> for the last 7 days?
```

Expected: Cost breakdown with on-demand, spot, and total costs

#### Test 4: Savings Opportunities
```
What are the estimated savings for cluster <cluster-id>?
```

Expected: Detailed savings recommendations with potential monthly savings

#### Test 5: Security Check
```
Show me security vulnerabilities across my clusters
```

Expected: Security overview with critical issues highlighted

### Step 5: Publish Your GPT

1. Click **"Save"** in the top right
2. Choose **"Only me"** (private) or **"Anyone with a link"** (share with team)
3. Click **"Confirm"**

## 💬 Example Conversations

### Conversation 1: Cost Optimization

**You:**
> What's my current cloud spend on Kubernetes?

**CAST AI Assistant:**
> Let me check your clusters and their costs... 
> 
> 💰 **Current Kubernetes Spend (Last 7 Days)**
> 
> | Cluster | Region | Current Cost | On-Demand | Spot | Efficiency |
> |---------|--------|--------------|-----------|------|------------|
> | prod-us-east | us-east-1 | $1,245 | $890 | $355 | 78% |
> | staging-eu | eu-west-1 | $423 | $310 | $113 | 71% |
> 
> **Total:** $1,668 | **Potential Savings:** $284/week
> 
> Would you like me to analyze specific savings opportunities?

**You:**
> Yes, what can we optimize?

**CAST AI Assistant:**
> Based on your cluster analysis, here are the top savings opportunities:
> 
> 🎯 **Top 3 Optimizations:**
> 
> 1. **Increase Spot Usage** (Save $150/week)
>    - Current spot: 28%
>    - Recommended: 65%
>    - Action: Enable CAST AI autoscaler policies
> 
> 2. **Rightsize Workloads** (Save $89/week)
>    - 12 workloads overprovisioned by 40%+
>    - Action: Apply recommended resource limits
> 
> 3. **Remove Idle Resources** (Save $45/week)
>    - 3 volumes attached but unused
>    - Action: Review and detach idle disks
> 
> Would you like me to generate a detailed optimization plan?

### Conversation 2: Security Monitoring

**You:**
> Are there any critical security issues in my clusters?

**CAST AI Assistant:**
> 🔒 **Security Overview**
> 
> ⚠️ **Critical Issues Found:** 3
> 
> 1. **nginx:1.19** (prod-us-east)
>    - CVE-2021-23017 (CRITICAL)
>    - DNS resolver buffer overflow
>    - Fix: Upgrade to nginx:1.21+
> 
> 2. **postgres:12.3** (staging-eu)
>    - CVE-2021-32027 (HIGH)
>    - Buffer overflow vulnerability
>    - Fix: Upgrade to postgres:12.8+
> 
> 3. **redis:5.0** (prod-us-east)
>    - CVE-2021-32625 (HIGH)
>    - Integer overflow vulnerability
>    - Fix: Upgrade to redis:6.2+
> 
> Would you like detailed remediation steps for any of these?

### Conversation 3: Troubleshooting

**You:**
> Why are pods failing to schedule in my production cluster?

**CAST AI Assistant:**
> Let me check for unscheduled pods...
> 
> ⚠️ **Found 5 Unscheduled Pods in prod-us-east**
> 
> | Pod | Namespace | Reason |
> |-----|-----------|--------|
> | ml-worker-7 | ml-jobs | Insufficient GPU (requested: 2, available: 0) |
> | ml-worker-8 | ml-jobs | Insufficient GPU (requested: 2, available: 0) |
> | api-backend-3 | production | Insufficient memory (requested: 16Gi, available: 12Gi) |
> | cache-redis-2 | production | Insufficient CPU (requested: 4, available: 2) |
> | worker-queue-5 | jobs | Node affinity not satisfied |
> 
> **Recommendations:**
> 1. Add GPU nodes for ml-worker pods
> 2. Scale up memory capacity for api-backend
> 3. Review node affinity rules for worker-queue
> 
> Would you like me to check for problematic nodes?

### Conversation 4: Reporting

**You:**
> Generate a weekly infrastructure report

**CAST AI Assistant:**
> 📊 **Weekly Infrastructure Report**
> *November 1-7, 2025*
> 
> **💰 Cost Summary**
> - Total Spend: $1,668
> - Trend: ↓ 12% vs last week
> - Savings Realized: $284
> 
> **⚙️ Cluster Health**
> - Total Clusters: 2
> - Healthy: 2 ✅
> - Total Nodes: 47
> - Problematic Nodes: 0
> 
> **🔒 Security Posture**
> - Critical Vulnerabilities: 3 ⚠️
> - High Vulnerabilities: 12
> - Compliance Score: 87%
> - Best Practices Pass Rate: 92%
> 
> **📈 Efficiency Metrics**
> - Average CPU Utilization: 64%
> - Average Memory Utilization: 71%
> - Spot Instance Coverage: 28%
> - Overall Efficiency: 75%
> 
> **🎯 Top Actions**
> 1. Patch 3 critical CVEs
> 2. Increase spot usage to 65%
> 3. Rightsize 12 overprovisioned workloads
> 
> Would you like details on any section?

## 🎨 Customization Ideas

### Add Custom Prompts

Modify the Instructions section to specialize your GPT:

**For FinOps Teams:**
```
Focus on cost optimization and budget tracking. Always present costs in relation to budget. Highlight anomalies and trends. Suggest specific cost-saving actions with ROI calculations.
```

**For Security Teams:**
```
Prioritize security vulnerabilities and compliance. Always check for critical CVEs first. Provide CVE details, CVSS scores, and remediation steps. Track security trends over time.
```

**For DevOps Teams:**
```
Focus on operational health and performance. Monitor node health, pod scheduling, and resource utilization. Provide troubleshooting steps and best practices.
```

### Advanced Actions

Add these custom endpoints to your bridge for more capabilities:

1. **Auto-remediation**: Execute fixes directly
2. **Alerting**: Set up webhook notifications
3. **Reporting**: Generate and email reports
4. **Integration**: Connect to Slack, Teams, PagerDuty

## 🔒 Security Best Practices

1. **Never share your API key**
   - Use separate API keys for different GPTs
   - Rotate keys regularly
   - Set minimal required permissions

2. **Restrict GPT access**
   - Keep GPT private or share only with trusted users
   - Monitor API usage
   - Set up audit logging

3. **Validate bridge security**
   - Use HTTPS only
   - Enable rate limiting
   - Implement request validation
   - Monitor for unusual activity

## 🐛 Troubleshooting

### GPT can't connect to actions

**Problem:** "Error calling action"

**Solutions:**
- ✅ Verify bridge is publicly accessible
- ✅ Check API key is correct in ChatGPT settings
- ✅ Ensure OpenAPI spec URL is reachable
- ✅ Test endpoints directly with `curl`

### API returns 401 Unauthorized

**Problem:** "Unauthorized" error

**Solutions:**
- ✅ Re-enter API key in ChatGPT Actions settings
- ✅ Verify API key hasn't expired
- ✅ Check CAST AI console for key validity

### Actions are slow or timeout

**Problem:** Requests take too long

**Solutions:**
- ✅ Check bridge server performance
- ✅ Optimize database queries
- ✅ Add caching layer
- ✅ Increase server resources

### GPT gives incorrect information

**Problem:** Response doesn't match actual data

**Solutions:**
- ✅ Verify bridge is calling correct CAST AI endpoints
- ✅ Check API response format matches OpenAPI spec
- ✅ Review GPT instructions for clarity
- ✅ Test endpoints directly to validate data

## 📱 Mobile Access

Your ChatGPT works on mobile too!

1. Open ChatGPT mobile app
2. Navigate to **"My GPTs"**
3. Select your **CAST AI Assistant**
4. Use voice or text to interact

Perfect for:
- Quick cost checks
- Security alerts on-the-go
- Emergency troubleshooting
- Status updates for stakeholders

## 🎓 Next Steps

1. ✅ **Experiment** with different prompts
2. ✅ **Share** your GPT with team members
3. ✅ **Monitor** API usage and costs
4. ✅ **Iterate** on instructions based on feedback
5. ✅ **Automate** regular reporting tasks

## 💡 Pro Tips

- **Use specific cluster names** instead of IDs for easier conversations
- **Set up recurring queries** by asking GPT to remind you
- **Combine multiple questions** in one message for comprehensive analysis
- **Export conversations** for documentation and knowledge sharing
- **Create multiple specialized GPTs** for different teams/purposes

## 🤝 Sharing Your GPT

### Share with Team

1. In GPT settings, select **"Anyone with a link"**
2. Copy the share link
3. Send to team members
4. They'll need ChatGPT Plus to use it

### Share Publicly

1. Select **"Everyone"** in GPT settings
2. Your GPT will appear in GPT Store
3. Others can discover and use it
4. You can monetize popular GPTs

## 📊 Metrics to Track

Monitor these metrics for your GPT:

- **Usage:** How many queries per day?
- **Response time:** Are actions fast enough?
- **Accuracy:** Do responses match reality?
- **User satisfaction:** Are users finding it helpful?
- **API costs:** What's the cost per query?

## 🔗 Additional Resources

- [OpenAI Actions Documentation](https://platform.openai.com/docs/actions)
- [GPT Best Practices](https://platform.openai.com/docs/guides/gpt-best-practices)
- [CAST AI API Documentation](https://docs.cast.ai)
- [Model Context Protocol](https://modelcontextprotocol.io)

---

**Need Help?**

- 💬 [CAST AI Community](https://community.cast.ai)
- 📧 [CAST AI Support](https://docs.cast.ai/support)
- 🐛 [Report Issues](https://github.com/your-repo/issues)

**Happy Building! 🚀**
