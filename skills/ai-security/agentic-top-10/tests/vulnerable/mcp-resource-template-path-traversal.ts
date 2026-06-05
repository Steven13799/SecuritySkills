// VULNERABLE — agentic-top-10 MCP boundary
// Expected: Finding. Two compounding problems:
//   1) Resource URI template "file://{path}" with no normalization, allowlist, or
//      tenant scoping -> path traversal / cross-tenant retrieval; resource contents
//      are returned to the model as trusted context (indirect prompt-injection vector).
//   2) The stdio transport launches an unpinned, mutable package (@latest) over npx
//      with the filesystem root set to "/" -> local execution + supply-chain boundary crossing.
// Maps to: AG02 Tool Misuse, AG06 Exfiltration / indirect prompt injection,
//          AG03 supply chain, AG05 trust boundary, AG10 identity/auth.

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as fs from "node:fs/promises";

const server = new McpServer({ name: "files", version: "0.0.1" });

// No path normalization, no allowlist, no tenant scoping.
server.resource(
  "file",
  new ResourceTemplate("file://{path}", { list: undefined }),
  async (uri, { path }) => ({
    contents: [{ uri: uri.href, text: await fs.readFile(path as string, "utf8") }]
  })
);

// Corresponding launch config (for reference) — unpinned package + broad root:
//   {
//     "mcpServers": {
//       "filesystem": {
//         "transport": "stdio",
//         "command": "npx",
//         "args": ["-y", "@vendor/filesystem-mcp@latest", "/"]
//       }
//     }
//   }

export { server };
