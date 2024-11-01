import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import user from "@/db/schema/user";

const driver = pgTable(
  "driver",
  {
    id: serial().primaryKey(),
    carMake: varchar({ length: 255 }).notNull(),
    carModel: varchar({ length: 255 }).notNull(),
    carYear: integer().notNull(),
    userId: integer()
      .notNull()
      .references(() => user.id),
    online: boolean().notNull(),
    delivering: boolean().notNull(),
    createdAt: timestamp({ mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ mode: "string" })
      .$onUpdate(() => new Date().toISOString()),
  },
);

export const driverRelations = relations(driver, ({ one }) => ({
  user: one(user, {
    fields: [driver.userId],
    references: [user.id],
  }),
}));

export default driver;
