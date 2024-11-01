import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

import order from "@/db/schema/order";
import statusCatalog from "@/db/schema/status-catalog";

const orderStatus = pgTable("order_status", {
  id: serial().primaryKey(),
  orderId: integer()
    .notNull()
    .references(() => order.id),
  statusCatalogId: integer()
    .notNull()
    .references(() => statusCatalog.id),
  createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
});

export const orderStatusRelations = relations(orderStatus, ({ one }) => ({
  order: one(order, {
    fields: [orderStatus.orderId],
    references: [order.id],
  }),
  statusCatalog: one(statusCatalog, {
    fields: [orderStatus.statusCatalogId],
    references: [statusCatalog.id],
  }),
}));

export default orderStatus;
