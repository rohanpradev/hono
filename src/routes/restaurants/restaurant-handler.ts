import type { AppRoutehandler } from "@/lib/types";
import type { GetRestaurant } from "@/routes/restaurants/restaurant.routes";

import { RestaurantService } from "@/services/restaurant.service";

export const getRestaurant: AppRoutehandler<GetRestaurant> = async (c) => {
  const pageNum = c.req.valid("query").pageNum;
  const pageSize = c.req.valid("query").pageSize;
  const restaurantsList = await RestaurantService.getRestaurant((pageNum - 1) * pageSize, pageSize);
  const flattenedData = restaurantsList.map(
    ({ city, ...rest }) => ({
      ...rest,
      city: city.name,
      state: city.state.name,
      code: city.state.code,
    }),
  );
  return c.json(flattenedData);
};
