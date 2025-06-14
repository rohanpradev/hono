import type { AppRoutehandler } from "@/lib/types";
import type {
	GetRestaurant,
	GetRestaurantById,
} from "@/routes/restaurants/restaurant.routes";

import { RestaurantService } from "@/services/restaurant.service";
import * as HttpStatusCodes from "@/utils/http-status-codes";
import * as HttpStatusPhrases from "@/utils/http-status-phrases";

export const getRestaurant: AppRoutehandler<GetRestaurant> = async (c) => {
	const pageNum = c.req.valid("query").pageNum;
	const pageSize = c.req.valid("query").pageSize;
	const restaurantsList = await RestaurantService.getRestaurant(
		(pageNum - 1) * pageSize,
		pageSize,
	);
	const flattenedData = restaurantsList.map(({ city, ...rest }) => ({
		...rest,
		city: city.name,
		state: city.state.name,
		code: city.state.code,
	}));
	return c.json(flattenedData);
};

export const getRestaurantById: AppRoutehandler<GetRestaurantById> = async (
	c,
) => {
	const id = c.req.valid("param").id;
	const restaurantsData = await RestaurantService.getRestaurantById(id);
	if (!restaurantsData)
		return c.json(
			{ message: `Data ${HttpStatusPhrases.NOT_FOUND}` },
			HttpStatusCodes.NOT_FOUND,
		);
	const { city, ...rest } = restaurantsData;
	return c.json(
		{ ...rest, city: city.name, state: city.state.name, code: city.state.code },
		HttpStatusCodes.OK,
	);
};
