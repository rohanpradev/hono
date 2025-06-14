import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import category from "@/db/schema/category";
import restaurant from "@/db/schema/restaurant";

const menuItem = pgTable("menu_item", {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	restaurantId: integer("restaurant_id")
		.notNull()
		.references(() => restaurant.id),
	categoryId: integer()
		.notNull()
		.references(() => category.id),
	description: text().notNull(),
	ingredients: text().notNull(),
	price: numeric({ precision: 12, scale: 2 }).notNull(),
	active: boolean().notNull(),
	createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
	updatedAt: timestamp({ mode: "string" }).$onUpdate(() =>
		new Date().toISOString(),
	),
});

export const menuItemRelations = relations(menuItem, ({ one }) => ({
	restaurant: one(restaurant, {
		fields: [menuItem.restaurantId],
		references: [restaurant.id],
	}),
	category: one(category, {
		fields: [menuItem.categoryId],
		references: [category.id],
	}),
}));

export default menuItem;
