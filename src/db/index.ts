import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import env from "@/utils/env";

const isSeeding = !!Bun.env.DB_SEEDING;

const db = drizzle({
	connection: {
		connectionString: isSeeding ? env.DATABASE_URL : env.DATABASE_URL_POOL!,
	},
	schema,
	casing: "snake_case",
	logger: true,
});

export type DbType = typeof db;

export default db;
