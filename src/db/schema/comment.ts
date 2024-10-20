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
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => order.id),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
  commentText: text("comment_text").notNull(),
  isComplaint: boolean("is_complaint").notNull(),
  isPraise: boolean("is_praise").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow().$onUpdate(() => new Date().toISOString()),
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
