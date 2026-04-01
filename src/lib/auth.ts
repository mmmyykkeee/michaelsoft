import { betterAuth } from "better-auth";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    // Ensure you provide the connection snippet for Better Auth based on your DB!
    // Since you are using Supabase you can pipe the Postgres URL here:
    // database: process.env.DATABASE_URL
    // Or check out Better Auth Supabase Plugin/Adapter if you prefer Native Supabase sync.
});
