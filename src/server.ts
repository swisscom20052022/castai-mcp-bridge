import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CASTAI_API_BASE = process.env.CASTAI_API_BASE || 'https://api.cast.ai';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Error handler type
interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

// Helper function to call CAST AI API
async function callCastAI(
  path: string,
  method: string = 'GET',
  apiKey?: string,
  data?: any,
  query?: Record<string, string>
): Promise<any> {
  const url = new URL(path, CASTAI_API_BASE);
  
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  if (apiKey) {
    headers['X-API-Key'] = apiKey;
  }

  try {
    const response = await axios({
      method,
      url: url.toString(),
      headers,
      data
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw {
        statusCode: error.response?.status || 500,
        message: error.response?.data?.message || error.message,
        details: error.response?.data
      };
    }
    throw error;
  }
}

// Extract API key from request
function getApiKey(req: Request): string | undefined {
  return req.headers['x-castai-api-key'] as string || 
         req.headers['x-api-key'] as string ||
         req.headers['authorization']?.replace('Bearer ', '');
}

// ============================================================
// Organization Management
// ============================================================

app.get('/organizations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = getApiKey(req);
    const data = await callCastAI('/v1/organizations', 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ============================================================
// Cluster Management
// ============================================================

app.get('/clusters', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = getApiKey(req);
    const data = await callCastAI('/v1/kubernetes/external-clusters', 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/clusters/:clusterId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/kubernetes/external-clusters/${clusterId}`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/clusters/:clusterId/summary', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/cost-reports/clusters/${clusterId}/summary`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ============================================================
// Cost Optimization
// ============================================================

app.get('/clusters/:clusterId/cost-report', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const { startTime, endTime } = req.query;
    const apiKey = getApiKey(req);
    
    const query: Record<string, string> = {};
    if (startTime) query.startTime = startTime as string;
    if (endTime) query.endTime = endTime as string;
    
    const data = await callCastAI(`/v1/cost-reports/clusters/${clusterId}/cost`, 'GET', apiKey, undefined, query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/clusters/:clusterId/estimated-savings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/cost-reports/clusters/${clusterId}/estimated-savings`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/clusters/:clusterId/workload-costs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const { startTime, endTime } = req.query;
    const apiKey = getApiKey(req);
    
    const query: Record<string, string> = {};
    if (startTime) query.startTime = startTime as string;
    if (endTime) query.endTime = endTime as string;
    
    const data = await callCastAI(`/v1/cost-reports/clusters/${clusterId}/workload-costs`, 'GET', apiKey, undefined, query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/organization/daily-cost', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startTime, endTime } = req.query;
    const apiKey = getApiKey(req);
    
    const query: Record<string, string> = {};
    if (startTime) query.startTime = startTime as string;
    if (endTime) query.endTime = endTime as string;
    
    const data = await callCastAI('/v1/cost-reports/organization/daily-cost', 'GET', apiKey, undefined, query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ============================================================
// Security
// ============================================================

app.get('/security/images', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, severityThreshold } = req.query;
    const apiKey = getApiKey(req);
    
    const query: Record<string, string> = {};
    if (limit) query.limit = limit as string;
    if (severityThreshold) query.severityThreshold = severityThreshold as string;
    
    const data = await callCastAI('/v1/security/insights/images', 'GET', apiKey, undefined, query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/security/images/:tagId/vulnerabilities', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tagId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/security/insights/images/${tagId}/vulnerabilities`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/security/best-practices', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.query;
    const apiKey = getApiKey(req);
    
    const query: Record<string, string> = {};
    if (clusterId) query.clusterId = clusterId as string;
    
    const data = await callCastAI('/v1/security/insights/best-practices', 'GET', apiKey, undefined, query);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/security/overview', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = getApiKey(req);
    
    // Fetch multiple overview endpoints in parallel
    const [vulnerabilities, bestPractices, attackPaths, imageSecure] = await Promise.all([
      callCastAI('/v1/security/insights/overview/vulnerabilities', 'GET', apiKey),
      callCastAI('/v1/security/insights/overview/best-practices', 'GET', apiKey),
      callCastAI('/v1/security/insights/overview/attack-paths', 'GET', apiKey),
      callCastAI('/v1/security/insights/overview/image-security', 'GET', apiKey)
    ]);
    
    res.json({
      vulnerabilities,
      bestPractices,
      attackPaths,
      imageSecure
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// Workload Optimization
// ============================================================

app.get('/clusters/:clusterId/workloads', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/kubernetes/clusters/${clusterId}/workloads`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/clusters/:clusterId/workload-efficiency', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/cost-reports/clusters/${clusterId}/workload-efficiency`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/clusters/:clusterId/unscheduled-pods', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/kubernetes/clusters/${clusterId}/unscheduled-pods`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ============================================================
// Nodes Management
// ============================================================

app.get('/clusters/:clusterId/nodes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/kubernetes/external-clusters/${clusterId}/nodes`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/clusters/:clusterId/problematic-nodes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { clusterId } = req.params;
    const apiKey = getApiKey(req);
    const data = await callCastAI(`/v1/kubernetes/clusters/${clusterId}/problematic-nodes`, 'GET', apiKey);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ============================================================
// MCP Discovery & Tools (Advanced)
// ============================================================

// Note: These endpoints would require MCP SDK integration
// For now, they're placeholders that demonstrate the concept

app.get('/mcp/specs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // In production, this would call the MCP server's list-specs tool
    res.json([
      { title: "CAST.AI API documentation", description: "Main platform API" },
      { title: "AI Enabler", description: "AI/ML model hosting" },
      { title: "Cluster Autoscaler", description: "Lifecycle management" },
      { title: "Inventory", description: "Asset discovery" },
      { title: "Omni provisioner", description: "Edge computing" },
      { title: "Patching Engine", description: "Workload mutations" },
      { title: "Pricing", description: "Cost management" }
    ]);
  } catch (error) {
    next(error);
  }
});

app.get('/mcp/endpoints', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.query;
    // In production, this would call mcp_castai_list-endpoints
    res.json({
      "/v1/organizations": {
        "get": "List user organizations",
        "post": "Creates an organization"
      },
      "/v1/kubernetes/external-clusters": {
        "get": "Lists clusters",
        "post": "Registers new external cluster"
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post('/mcp/endpoint-details', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { path, method, title } = req.body;
    // In production, this would call mcp_castai_get-endpoint
    res.json({
      path,
      method,
      description: "Endpoint details would be returned here",
      parameters: [],
      responses: {}
    });
  } catch (error) {
    next(error);
  }
});

app.get('/mcp/search', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pattern } = req.query;
    // In production, this would call mcp_castai_search-specs
    res.json({
      pattern,
      results: {
        paths: [],
        operations: [],
        components: []
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post('/mcp/execute', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, url, headers, queryString, postData, title } = req.body;
    // In production, this would call mcp_castai_execute-request
    res.json({
      message: "MCP execute request would be processed here"
    });
  } catch (error) {
    next(error);
  }
});

// ============================================================
// Health Check
// ============================================================

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    castaiBase: CASTAI_API_BASE
  });
});

// Serve OpenAPI spec
app.get('/openapi.json', async (req: Request, res: Response) => {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const yamlContent = await fs.readFile(
      path.join(process.cwd(), 'openapi-spec.yaml'),
      'utf-8'
    );
    // In production, you'd convert YAML to JSON here
    res.type('text/yaml').send(yamlContent);
  } catch (error) {
    res.status(404).json({ error: 'OpenAPI spec not found' });
  }
});

// ============================================================
// Error Handler
// ============================================================

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error('Error:', err);
  
  res.status(statusCode).json({
    error: message,
    details: err.details || undefined,
    path: req.path,
    method: req.method
  });
});

// ============================================================
// Start Server
// ============================================================

app.listen(PORT, () => {
  console.log(`🚀 CAST AI MCP Bridge Server running on port ${PORT}`);
  console.log(`📋 OpenAPI spec available at: http://localhost:${PORT}/openapi.json`);
  console.log(`🏥 Health check at: http://localhost:${PORT}/health`);
  console.log(`🔗 CAST AI API Base: ${CASTAI_API_BASE}`);
  console.log(`\n✨ Ready to bridge MCP to OpenAPI!`);
});

export default app;
