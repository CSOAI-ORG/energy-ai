/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/energy-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleEnergyAiCompliance } from "./tools/energy-ai-compliance.js";

const server = new McpServer({
  name: "csoai-energy-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const EnergyAiComplianceShape = {
  system_name: z.string().describe("Name of the energy AI system"),
  ai_function: z.string().describe("Function (grid optimization, demand forecasting, smart meter analytics, renewable integration, EV charging)"),
  infrastructure_type: z.string().describe("Infrastructure type (generation, transmission, distribution, retail, storage)"),
  data_types: z.string().describe("Data processed (meter data, grid telemetry, customer usage, weather, market)"),
  jurisdiction: z.string().describe("Operating jurisdiction (EU, US/FERC/NERC, UK/Ofgem, etc.)"),
};

// ─── Tool 1: energy_ai_compliance ───
(server.tool as any)(
  "energy_ai_compliance",
  "Assess regulatory compliance for AI in energy systems. Covers grid management, smart metering, pricing, and critical infrastructure protection.",
  EnergyAiComplianceShape,
  async (args: any) => {
    const result = handleEnergyAiCompliance(args.system_name, args.ai_function, args.infrastructure_type, args.data_types, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
