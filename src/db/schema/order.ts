import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import address from "@/db/schema/address";
import driver from "@/db/schema/driver";
import orderStatus from "@/db/schema/order-status";
import restaurant from "@/db/schema/restaurant";
import user from "@/db/schema/user";

const order = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurantId: integer("restaurant_id")
    .notNull()
    .references(() => restaurant.id),
  estimatedDeliveryTime: timestamp("estimated_delivery_time", {
    mode: "string",
  }).notNull(),
  actualDeliveryTime: timestamp("actual_delivery_time", { mode: "string" }),
  deliveryAddressId: integer("delivery_address_id")
    .notNull()
    .references(() => address.id),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  driverId: integer("driver_id").references(() => driver.id),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 12, scale: 2 }).notNull(),
  finalPrice: numeric("final_price", { precision: 12, scale: 2 }).notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).$onUpdate(() => new Date().toISOString()),
});

export const orderRelations = relations(order, ({ one, many }) => ({
  restaurant: one(restaurant, {
    fields: [order.restaurantId],
    references: [restaurant.id],
  }),
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  driver: one(driver, {
    fields: [order.driverId],
    references: [driver.id],
  }),
  address: one(address, {
    fields: [order.deliveryAddressId],
    references: [address.id],
  }),
  orderStatuses: many(orderStatus),
}));

export default order;
