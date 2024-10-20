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
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    streetAddress: varchar("street_address", { length: 255 }).notNull(),
    zipCode: varchar("zip_code", { length: 16 }).notNull(),
    cityId: integer("city_id")
      .notNull()
      .references(() => city.id),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .$onUpdate(() => new Date().toISOString()),
  },
  table => ({
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
