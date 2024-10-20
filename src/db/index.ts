import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import env from "@/utils/env";

const isSeeding = !!Bun.env.DB_SEEDING;

const db = drizzle(!isSeeding ? env.DATABASE_URL_POOL! : env.DATABASE_URL, {
  logger: isSeeding,
  schema,
});

export type DbType = typeof db;

export default db;
