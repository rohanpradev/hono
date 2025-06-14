import { createSelectSchema } from "drizzle-zod";

import db from "@/db";
import { city, restaurant, state } from "@/db/schema";

export const RestaurantService = {
	getRestaurant(offset: number, limit: number) {
		return db.query.restaurant.findMany({
			offset,
			limit,
			with: {
				city: {
					columns: {
						name: true,
					},
					with: {
						state: {
							columns: {
								name: true,
								code: true,
							},
						},
					},
				},
			},
		});
	},
	getRestaurantById(id: number) {
		return db.query.restaurant.findFirst({
			where(fields, operators) {
				return operators.eq(fields.id, id);
			},
			with: {
				city: {
					columns: { name: true },
					with: { state: { columns: { name: true, code: true } } },
				},
			},
		});
	},
};

export const GetRestaurantWithCityAndState = createSelectSchema(restaurant)
	.and(createSelectSchema(city).omit({ id: true, stateId: true }))
	.and(createSelectSchema(state).omit({ id: true }));
