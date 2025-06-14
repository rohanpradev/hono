import type { DbType } from "@/db";

import { category } from "@/db/schema";
import categories from "@/db/seeds/data/categories.json";

export default async function seed(db: DbType) {
	await db.insert(category).values(categories);
}
