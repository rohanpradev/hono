/* eslint-disable node/no-process-env */
import "dotenv/config";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { join } from "node:path";

config({ path: join(__dirname, ".env.local") });

if (!process.env.DATABASE_URL)
  throw new Error("Database connection string missing");

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
