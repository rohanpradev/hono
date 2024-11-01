import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";

import restaurant from "@/db/schema/restaurant";
import user from "@/db/schema/user";

const restaurantOwner = pgTable(
  "restaurant_owner",
  {
    id: serial().primaryKey(),
    restaurantId: integer()
      .notNull()
      .references(() => restaurant.id),
    ownerId: integer()
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      unqiueOwner: unique().on(table.restaurantId, table.ownerId),
    };
  },
);

export default restaurantOwner;
