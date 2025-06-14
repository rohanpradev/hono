import type { DbType } from "@/db";

import { state } from "@/db/schema";
import states from "@/db/seeds/data/states.json";

export default async function seed(db: DbType) {
	await db.insert(state).values(states);
}
