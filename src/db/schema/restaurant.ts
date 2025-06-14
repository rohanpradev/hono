import { relations } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import city from "@/db/schema/city";
import menuItem from "@/db/schema/menu-item";
import order from "@/db/schema/order";

const restaurant = pgTable(
	"restaurant",
	{
		id: serial().primaryKey(),
		name: varchar({ length: 255 }).notNull(),
		streetAddress: varchar({ length: 255 }).notNull(),
		zipCode: varchar({ length: 16 }).notNull(),
		cityId: integer()
			.notNull()
			.references(() => city.id),
		createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
		updatedAt: timestamp({ mode: "string" }).$onUpdate(() =>
			new Date().toISOString(),
		),
	},
	(table) => ({
		nameIndex: index().on(table.name),
	}),
);

export const restaurantRelations = relations(restaurant, ({ one, many }) => ({
	city: one(city, {
		fields: [restaurant.cityId],
		references: [city.id],
	}),
	menuItems: many(menuItem),
	orders: many(order),
}));

export default restaurant;
