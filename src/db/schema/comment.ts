import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import order from "@/db/schema/order";
import user from "@/db/schema/user";

const comment = pgTable("comment", {
  id: serial().primaryKey(),
  orderId: integer()
    .notNull()
    .references(() => order.id),
  userId: integer()
    .notNull()
    .references(() => user.id),
  commentText: text().notNull(),
  isComplaint: boolean().notNull(),
  isPraise: boolean().notNull(),
  createdAt: timestamp({ mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "string" }).notNull().defaultNow().$onUpdate(() => new Date().toISOString()),
});

export const commentRelations = relations(comment, ({ one }) => ({
  user: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),
  order: one(order, {
    fields: [comment.orderId],
    references: [order.id],
  }),
}));

export default comment;
