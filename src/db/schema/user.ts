import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import address from "@/db/schema/address";
import order from "@/db/schema/order";

const user = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("contact_phone", { length: 255 }).notNull().unique(),
  phoneVerified: boolean("phone_verified").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  confirmationCode: varchar("confirmation_code", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).$onUpdate(() => new Date().toISOString()),
});

export const userRelations = relations(user, ({ many }) => ({
  addresses: many(address),
  orders: many(order),
}));

export default user;