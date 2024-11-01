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
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  phone: varchar("contact_phone", { length: 255 }).notNull().unique(),
  phoneVerified: boolean().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: boolean().notNull(),
  confirmationCode: varchar({ length: 255 }),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "string" }).notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  addresses: many(address),
  orders: many(order),
}));

export default user;
