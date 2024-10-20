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
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => restaurant.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => category.id),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  active: boolean("active").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).$onUpdate(() => new Date().toISOString()),
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
