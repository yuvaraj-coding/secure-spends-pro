// The MCP tools run inside a Deno edge function where `process.env` is polyfilled.
declare const process: { env: Record<string, string | undefined> };
