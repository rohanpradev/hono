import { eq } from "drizzle-orm";

import type { DbType } from "@/db";

import * as schema from "@/db/schema";
import users from "@/db/seeds/data/users.json";

async function getCityId(db: DbType, cityName: string) {
	const city = await db.query.city.findFirst({
		where: eq(schema.city.name, cityName),
	});
	if (!city) {
		throw new Error(`Unknown city name: ${cityName}`);
	}
	return city.id;
}

export default async function seed(db: DbType) {
	await Promise.all(
		users.map(async (user) => {
			const [insertedUser] = await db
				.insert(schema.user)
				.values({
					...user,
					emailVerified: true,
					phoneVerified: true,
					password: await Bun.password.hash(user.password),
				})
				.returning();
			await Promise.all(
				user.addresses.map(async (address) => {
					await db.insert(schema.address).values({
						...address,
						streetAddress1: address.street_address,
						userId: insertedUser.id,
						cityId: await getCityId(db, address.city),
					});
				}),
			);
		}),
	);
}
