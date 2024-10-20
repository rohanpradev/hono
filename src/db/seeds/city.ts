import { eq } from "drizzle-orm";

import type { DbType } from "@/db";

import { city, state } from "@/db/schema";
import cities from "@/db/seeds/data/cities.json";

export default async function seed(db: DbType) {
  const insertable = await Promise.all(
    cities.map(async (city) => {
      const foundState = await db.query.state.findFirst({
        where: eq(state.name, city.stateName),
      });
      if (!foundState) {
        throw new Error(`No state found with name: ${city.stateName}`);
      }
      return {
        ...city,
        stateId: foundState.id,
      };
    }),
  );
  await db.insert(city).values(insertable);
}
