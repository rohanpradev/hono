import type { DbType } from "@/db";

import { statusCatalog } from "@/db/schema";
import statusCatalogs from "@/db/seeds/data/status-catalogs.json";

export default async function seed(db: DbType) {
	await db.insert(statusCatalog).values(statusCatalogs);
}
