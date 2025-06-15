import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import env from "@/utils/env";

const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
	},
	schema,
	casing: "snake_case",
	logger: true,
});

export type DbType = typeof db;

export default db;
