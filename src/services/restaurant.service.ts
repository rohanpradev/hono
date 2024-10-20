import { createSelectSchema } from "drizzle-zod";

import db from "@/db";
import { city, restaurant, state } from "@/db/schema";

export const RestaurantService = {
  getRestaurant(offset: number, limit: number) {
    return db.query.restaurant.findMany({
      offset,
      limit,
      with: {
        city: {
          columns: {
            name: true,
          },
          with: {
            state: {
              columns: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });
  },
};

export const GetRestaurantWithCityAndState = createSelectSchema(restaurant).merge(
  createSelectSchema(city).omit({ id: true, stateId: true })
    .merge(createSelectSchema(state).omit({ id: true })),
);
