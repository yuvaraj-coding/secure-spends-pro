import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import updateProfileTool from "./tools/update-profile";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "finwise-mcp",
  title: "FinWise",
  version: "0.1.0",
  instructions:
    "Tools for FinWise, a personal finance app. Use `get_profile` to read the signed-in user's financial profile and `update_profile` to change profile details.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getProfileTool, updateProfileTool],
});
