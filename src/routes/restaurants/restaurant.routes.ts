import { createRoute } from "@hono/zod-openapi";

import { idParamsSchema } from "@/lib/openapi/schemas/id-schema";
import { paginationQuerySchema } from "@/lib/openapi/schemas/pagination-schema";

// import { GetRestaurantWithCityAndState } from "@/services/restaurant.service";
// import * as HttpStatusCodes from "@/utils/http-status-codes";
// import * as HttpStatusPhrases from "@/utils/http-status-phrases";

const tags = ["Restaurant"];

export const get = createRoute({
	path: "/restaurants",
	method: "get",
	tags,
	request: {
		query: paginationQuerySchema,
	},
	responses: {
		// [HttpStatusCodes.OK]: jsonContent(z.array(GetRestaurantWithCityAndState)),
	},
});

export type GetRestaurant = typeof get;

export const getById = createRoute({
	path: "/restaurants/{id}",
	method: "get",
	tags,
	request: {
		params: idParamsSchema("id", "The id of the restaurant"),
	},
	responses: {
		//   [HttpStatusCodes.OK]: jsonContent(GetRestaurantWithCityAndState, "Single Restautant details"),
		//   [HttpStatusCodes.NOT_FOUND]: jsonContent(
		//     createMessageObjectSchema(`Data ${HttpStatusPhrases.NOT_FOUND}`),
		//     "No data dound for the requested id",
		//   ),
	},
});

export type GetRestaurantById = typeof getById;
