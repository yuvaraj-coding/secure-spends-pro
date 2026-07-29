import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "./get-profile";

export default defineTool({
  name: "update_profile",
  title: "Update my FinWise profile",
  description:
    "Update fields on the signed-in user's FinWise profile. Only the provided fields are changed.",
  inputSchema: {
    full_name: z.string().trim().nullable().optional().describe("Full name"),
    phone_number: z.string().trim().nullable().optional().describe("Phone number"),
    address: z.string().trim().nullable().optional().describe("Postal address"),
    occupation: z.string().trim().nullable().optional().describe("Occupation"),
    income_range: z.string().trim().nullable().optional().describe("Annual income range, e.g. '5-10 LPA'"),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const updates = Object.fromEntries(
      Object.entries(input).filter(([, value]) => value !== undefined),
    );
    if (Object.keys(updates).length === 0) {
      return { content: [{ type: "text", text: "No fields provided to update." }], isError: true };
    }

    const { data, error } = await supabaseForUser(ctx)
      .from("profiles")
      .update(updates)
      .eq("user_id", ctx.getUserId())
      .select("full_name, phone_number, address, occupation, income_range")
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { profile: data },
    };
  },
});
