import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

import menuItem from "@/db/schema/menu-item";
import order from "@/db/schema/order";

const orderMenuItem = pgTable("order_menu_item", {
	id: serial().primaryKey(),
	orderId: integer()
		.notNull()
		.references(() => order.id),
	menuItemId: integer()
		.notNull()
		.references(() => menuItem.id),
	quantity: integer().notNull(),
	itemPrice: numeric({ precision: 12, scale: 2 }).notNull(),
	price: numeric({ precision: 12, scale: 2 }).notNull(),
	comment: text(),
});

export const orderMenuItemRelations = relations(orderMenuItem, ({ one }) => ({
	order: one(order, {
		fields: [orderMenuItem.orderId],
		references: [order.id],
	}),
	menuItem: one(menuItem, {
		fields: [orderMenuItem.menuItemId],
		references: [menuItem.id],
	}),
}));

export default orderMenuItem;
