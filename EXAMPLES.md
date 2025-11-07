# API Examples and Use Cases

> Practical examples for using the CAST AI MCP Bridge

## 📚 Table of Contents

- [Quick Start Examples](#quick-start-examples)
- [Cost Optimization](#cost-optimization)
- [Security & Compliance](#security--compliance)
- [Workload Management](#workload-management)
- [Node Operations](#node-operations)
- [Advanced Queries](#advanced-queries)
- [Python SDK Examples](#python-sdk-examples)
- [PowerShell Examples](#powershell-examples)

---

## 🚀 Quick Start Examples

### Health Check

```bash
curl http://localhost:3000/health
```

```json
{
  "status": "ok",
  "timestamp": "2025-11-07T10:00:00.000Z",
  "castaiBase": "https://api.cast.ai"
}
```

### List Organizations

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/organizations
```

### List All Clusters

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/clusters
```

---

## 💰 Cost Optimization

### Get Cluster Cost Report

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  "http://localhost:3000/clusters/CLUSTER_ID/cost-report?startTime=2025-11-01T00:00:00Z&endTime=2025-11-07T23:59:59Z"
```

**Response:**
```json
{
  "clusterId": "abc123",
  "startTime": "2025-11-01T00:00:00Z",
  "endTime": "2025-11-07T23:59:59Z",
  "totalCost": 1245.67,
  "onDemandCost": 890.12,
  "spotCost": 355.55,
  "breakdown": [
    {
      "date": "2025-11-01",
      "cost": 178.10
    }
  ]
}
```

### Get Estimated Savings

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/clusters/CLUSTER_ID/estimated-savings
```

**Response:**
```json
{
  "totalSavings": 284.50,
  "recommendations": [
    {
      "type": "spot_optimization",
      "savings": 150.00,
      "description": "Increase spot instance usage from 28% to 65%"
    },
    {
      "type": "rightsizing",
      "savings": 89.00,
      "description": "Rightsize 12 overprovisioned workloads"
    },
    {
      "type": "idle_resources",
      "savings": 45.50,
      "description": "Remove 3 idle volumes"
    }
  ]
}
```

### Get Workload Costs

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  "http://localhost:3000/clusters/CLUSTER_ID/workload-costs?startTime=2025-11-01T00:00:00Z&endTime=2025-11-07T23:59:59Z"
```

### Organization Daily Cost

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  "http://localhost:3000/organization/daily-cost?startTime=2025-11-01T00:00:00Z&endTime=2025-11-07T23:59:59Z"
```

---

## 🔒 Security & Compliance

### List Container Images with Vulnerabilities

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  "http://localhost:3000/security/images?limit=50&severityThreshold=CRITICAL"
```

**Response:**
```json
[
  {
    "tagId": "img_123",
    "name": "nginx",
    "tag": "1.19",
    "criticalVulnerabilities": 2,
    "highVulnerabilities": 5,
    "mediumVulnerabilities": 12
  }
]
```

### Get Image Vulnerabilities

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/security/images/img_123/vulnerabilities
```

**Response:**
```json
[
  {
    "cveId": "CVE-2021-23017",
    "severity": "CRITICAL",
    "packageName": "nginx",
    "fixAvailable": true,
    "fixVersion": "1.21.0",
    "cvssScore": 9.8,
    "description": "DNS resolver buffer overflow"
  }
]
```

### Get Security Best Practices Report

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  "http://localhost:3000/security/best-practices?clusterId=CLUSTER_ID"
```

### Get Security Overview

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/security/overview
```

**Response:**
```json
{
  "vulnerabilities": {
    "critical": 3,
    "high": 12,
    "medium": 45,
    "low": 89
  },
  "bestPractices": {
    "passed": 87,
    "failed": 8,
    "complianceScore": 92
  },
  "attackPaths": {
    "high": 2,
    "medium": 5,
    "low": 12
  },
  "imageSecure": {
    "imagesScanned": 142,
    "vulnerableImages": 23
  }
}
```

---

## ⚙️ Workload Management

### List Cluster Workloads

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/clusters/CLUSTER_ID/workloads
```

**Response:**
```json
[
  {
    "id": "wl_123",
    "name": "api-backend",
    "namespace": "production",
    "kind": "Deployment",
    "replicas": 5,
    "cost": 234.56
  }
]
```

### Get Workload Efficiency

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/clusters/CLUSTER_ID/workload-efficiency
```

### Get Unscheduled Pods

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/clusters/CLUSTER_ID/unscheduled-pods
```

**Response:**
```json
[
  {
    "name": "ml-worker-7",
    "namespace": "ml-jobs",
    "reason": "Insufficient GPU (requested: 2, available: 0)",
    "age": "2h15m"
  },
  {
    "name": "api-backend-3",
    "namespace": "production",
    "reason": "Insufficient memory (requested: 16Gi, available: 12Gi)",
    "age": "45m"
  }
]
```

---

## 🖥️ Node Operations

### List Cluster Nodes

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/clusters/CLUSTER_ID/nodes
```

**Response:**
```json
[
  {
    "id": "node_123",
    "name": "ip-10-0-1-234",
    "instanceType": "t3.xlarge",
    "status": "Ready",
    "provider": "aws",
    "spot": true,
    "cpu": "4",
    "memory": "16Gi"
  }
]
```

### Get Problematic Nodes

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/clusters/CLUSTER_ID/problematic-nodes
```

**Response:**
```json
[
  {
    "id": "node_456",
    "name": "ip-10-0-2-123",
    "issues": [
      {
        "type": "DiskPressure",
        "severity": "warning",
        "message": "Disk usage at 85%"
      }
    ]
  }
]
```

---

## 🔍 Advanced Queries

### MCP: List Available API Specs

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  http://localhost:3000/mcp/specs
```

### MCP: List Endpoints for a Spec

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  "http://localhost:3000/mcp/endpoints?title=CAST.AI+API+documentation"
```

### MCP: Get Endpoint Details

```bash
curl -X POST \
  -H "X-CASTAI-API-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/v1/organizations",
    "method": "get",
    "title": "CAST.AI API documentation"
  }' \
  http://localhost:3000/mcp/endpoint-details
```

### MCP: Search Specs

```bash
curl -H "X-CASTAI-API-Key: YOUR_KEY" \
  "http://localhost:3000/mcp/search?pattern=cost"
```

---

## 🐍 Python SDK Examples

### Setup

```python
import requests
from datetime import datetime, timedelta

BASE_URL = "http://localhost:3000"
API_KEY = "your-cast-ai-api-key"

headers = {
    "X-CASTAI-API-Key": API_KEY,
    "Content-Type": "application/json"
}
```

### Get Weekly Cost Report

```python
def get_weekly_cost_report(cluster_id):
    end_time = datetime.now()
    start_time = end_time - timedelta(days=7)
    
    response = requests.get(
        f"{BASE_URL}/clusters/{cluster_id}/cost-report",
        headers=headers,
        params={
            "startTime": start_time.isoformat(),
            "endTime": end_time.isoformat()
        }
    )
    
    data = response.json()
    
    print(f"Cluster: {data['clusterId']}")
    print(f"Total Cost: ${data['totalCost']:.2f}")
    print(f"On-Demand: ${data['onDemandCost']:.2f}")
    print(f"Spot: ${data['spotCost']:.2f}")
    print(f"Spot %: {(data['spotCost']/data['totalCost']*100):.1f}%")
    
    return data

# Usage
cost_data = get_weekly_cost_report("your-cluster-id")
```

### Check Critical Security Issues

```python
def check_critical_vulnerabilities():
    response = requests.get(
        f"{BASE_URL}/security/images",
        headers=headers,
        params={"severityThreshold": "CRITICAL"}
    )
    
    images = response.json()
    
    print(f"Found {len(images)} images with critical vulnerabilities:\n")
    
    for img in images:
        print(f"📦 {img['name']}:{img['tag']}")
        print(f"   Critical: {img['criticalVulnerabilities']}")
        print(f"   High: {img['highVulnerabilities']}")
        print()

# Usage
check_critical_vulnerabilities()
```

### Monitor Unscheduled Pods

```python
def monitor_unscheduled_pods(cluster_id):
    response = requests.get(
        f"{BASE_URL}/clusters/{cluster_id}/unscheduled-pods",
        headers=headers
    )
    
    pods = response.json()
    
    if not pods:
        print("✅ All pods are scheduled successfully!")
        return
    
    print(f"⚠️  Found {len(pods)} unscheduled pods:\n")
    
    for pod in pods:
        print(f"Pod: {pod['namespace']}/{pod['name']}")
        print(f"Reason: {pod['reason']}")
        print(f"Age: {pod['age']}")
        print()

# Usage
monitor_unscheduled_pods("your-cluster-id")
```

### Generate Cost Summary Report

```python
def generate_cost_summary():
    response = requests.get(
        f"{BASE_URL}/organization/daily-cost",
        headers=headers,
        params={
            "startTime": (datetime.now() - timedelta(days=30)).isoformat(),
            "endTime": datetime.now().isoformat()
        }
    )
    
    data = response.json()
    
    print("=" * 50)
    print("MONTHLY COST SUMMARY")
    print("=" * 50)
    print(f"\nTotal Spend: ${data['totalCost']:.2f}")
    print(f"\nPer Cluster:")
    
    for cluster in data['clusters']:
        print(f"  • {cluster['clusterId']}: ${cluster['cost']:.2f}")
    
    print("\n" + "=" * 50)

# Usage
generate_cost_summary()
```

---

## 💻 PowerShell Examples

### Setup

```powershell
$baseUrl = "http://localhost:3000"
$apiKey = "your-cast-ai-api-key"
$headers = @{
    "X-CASTAI-API-Key" = $apiKey
    "Content-Type" = "application/json"
}
```

### Get Cluster Summary

```powershell
function Get-ClusterSummary {
    param(
        [string]$ClusterId
    )
    
    $uri = "$baseUrl/clusters/$ClusterId/summary"
    $response = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
    
    Write-Host "`nCluster Summary: $($response.name)" -ForegroundColor Cyan
    Write-Host "Total Nodes: $($response.totalNodes)"
    Write-Host "Total Cost: `$$($response.totalCost)"
    Write-Host "Efficiency: $($response.efficiency)%"
    
    return $response
}

# Usage
Get-ClusterSummary -ClusterId "your-cluster-id"
```

### Check Security Status

```powershell
function Get-SecurityStatus {
    $uri = "$baseUrl/security/overview"
    $response = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
    
    Write-Host "`nSecurity Overview" -ForegroundColor Yellow
    Write-Host "=" * 40
    
    Write-Host "`nVulnerabilities:"
    Write-Host "  Critical: $($response.vulnerabilities.critical)" -ForegroundColor Red
    Write-Host "  High: $($response.vulnerabilities.high)" -ForegroundColor Yellow
    Write-Host "  Medium: $($response.vulnerabilities.medium)"
    
    Write-Host "`nCompliance:"
    Write-Host "  Score: $($response.bestPractices.complianceScore)%"
    Write-Host "  Passed: $($response.bestPractices.passed)"
    Write-Host "  Failed: $($response.bestPractices.failed)" -ForegroundColor Red
    
    return $response
}

# Usage
Get-SecurityStatus
```

### List All Clusters with Cost

```powershell
function Get-AllClustersWithCost {
    $clusters = Invoke-RestMethod -Uri "$baseUrl/clusters" -Headers $headers -Method Get
    
    Write-Host "`nAll Clusters:" -ForegroundColor Green
    Write-Host "=" * 60
    
    foreach ($cluster in $clusters) {
        $summary = Invoke-RestMethod -Uri "$baseUrl/clusters/$($cluster.id)/summary" -Headers $headers -Method Get
        
        Write-Host "`n$($cluster.name) ($($cluster.region))"
        Write-Host "  Status: $($cluster.status)"
        Write-Host "  Cost: `$$($summary.totalCost)"
        Write-Host "  Efficiency: $($summary.efficiency)%"
    }
}

# Usage
Get-AllClustersWithCost
```

### Monitor Workload Efficiency

```powershell
function Get-WorkloadEfficiency {
    param(
        [string]$ClusterId
    )
    
    $uri = "$baseUrl/clusters/$ClusterId/workload-efficiency"
    $workloads = Invoke-RestMethod -Uri $uri -Headers $headers -Method Get
    
    Write-Host "`nWorkload Efficiency Report" -ForegroundColor Cyan
    Write-Host "=" * 60
    
    $inefficient = $workloads | Where-Object { $_.efficiency -lt 70 }
    
    if ($inefficient.Count -gt 0) {
        Write-Host "`n⚠️  Found $($inefficient.Count) inefficient workloads:" -ForegroundColor Yellow
        
        foreach ($wl in $inefficient) {
            Write-Host "`n  $($wl.namespace)/$($wl.name)"
            Write-Host "    Efficiency: $($wl.efficiency)%"
            Write-Host "    Recommendation: $($wl.recommendation)"
        }
    } else {
        Write-Host "`n✅ All workloads are running efficiently!" -ForegroundColor Green
    }
}

# Usage
Get-WorkloadEfficiency -ClusterId "your-cluster-id"
```

---

## 📊 Reporting Scripts

### Daily Cost Email Report

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_daily_cost_report():
    # Get cost data
    response = requests.get(
        f"{BASE_URL}/organization/daily-cost",
        headers=headers,
        params={
            "startTime": (datetime.now() - timedelta(days=1)).isoformat(),
            "endTime": datetime.now().isoformat()
        }
    )
    
    data = response.json()
    
    # Create email
    msg = MIMEMultipart()
    msg['Subject'] = f"Daily CAST AI Cost Report - {datetime.now().strftime('%Y-%m-%d')}"
    msg['From'] = "reports@yourcompany.com"
    msg['To'] = "team@yourcompany.com"
    
    body = f"""
    <h2>Daily Kubernetes Cost Report</h2>
    <p><strong>Total Cost:</strong> ${data['totalCost']:.2f}</p>
    
    <h3>Per Cluster:</h3>
    <ul>
    {"".join([f"<li>{c['clusterId']}: ${c['cost']:.2f}</li>" for c in data['clusters']])}
    </ul>
    """
    
    msg.attach(MIMEText(body, 'html'))
    
    # Send email
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login("your-email@gmail.com", "your-password")
        server.send_message(msg)

# Schedule with cron or Task Scheduler
send_daily_cost_report()
```

---

## 🎯 Common Use Cases

### 1. FinOps Dashboard

Combine multiple endpoints to create a comprehensive dashboard:

```python
def get_finops_dashboard(cluster_id):
    summary = requests.get(f"{BASE_URL}/clusters/{cluster_id}/summary", headers=headers).json()
    savings = requests.get(f"{BASE_URL}/clusters/{cluster_id}/estimated-savings", headers=headers).json()
    costs = requests.get(f"{BASE_URL}/clusters/{cluster_id}/workload-costs", headers=headers).json()
    
    dashboard = {
        "cluster": summary,
        "savings_opportunities": savings,
        "top_expensive_workloads": sorted(costs, key=lambda x: x['cost'], reverse=True)[:10]
    }
    
    return dashboard
```

### 2. Security Audit

```python
def run_security_audit():
    overview = requests.get(f"{BASE_URL}/security/overview", headers=headers).json()
    images = requests.get(f"{BASE_URL}/security/images?severityThreshold=CRITICAL", headers=headers).json()
    best_practices = requests.get(f"{BASE_URL}/security/best-practices", headers=headers).json()
    
    audit_report = {
        "overview": overview,
        "critical_images": images,
        "compliance": best_practices
    }
    
    return audit_report
```

### 3. Capacity Planning

```python
def capacity_planning(cluster_id):
    nodes = requests.get(f"{BASE_URL}/clusters/{cluster_id}/nodes", headers=headers).json()
    unscheduled = requests.get(f"{BASE_URL}/clusters/{cluster_id}/unscheduled-pods", headers=headers).json()
    workloads = requests.get(f"{BASE_URL}/clusters/{cluster_id}/workloads", headers=headers).json()
    
    capacity_report = {
        "current_nodes": len(nodes),
        "unscheduled_pods": len(unscheduled),
        "workload_count": len(workloads),
        "needs_scaling": len(unscheduled) > 0
    }
    
    return capacity_report
```

---

## 🔗 Next Steps

- [Full API Documentation](./README.md)
- [ChatGPT Integration Guide](./CHATGPT_INTEGRATION.md)
- [OpenAPI Specification](./openapi-spec.yaml)

---

**Happy Querying! 🚀**
