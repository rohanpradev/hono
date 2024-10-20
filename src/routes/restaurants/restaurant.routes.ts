import { createRoute, z } from "@hono/zod-openapi";

import jsonContent from "@/lib/openapi/helpers/json-content";
import { paginationQuerySchema } from "@/lib/openapi/schemas/pagination-schema";
import { GetRestaurantWithCityAndState } from "@/services/restaurant.service";
import * as HttpStatusCodes from "@/utils/http-status-codes";

const tags = ["Restaurant"];

export const get = createRoute({
  path: "/restaurants",
  method: "get",
  tags,
  request: {
    query: paginationQuerySchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(GetRestaurantWithCityAndState), "Restautant details list"),
  },
});

export type GetRestaurant = typeof get;
