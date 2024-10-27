import { createRouter } from "@/lib/create-app";
import * as handlers from "@/routes/restaurants/restaurant-handler";
import * as routes from "@/routes/restaurants/restaurant.routes";

const router = createRouter()
  .openapi(routes.get, handlers.getRestaurant)
  .openapi(routes.getById, handlers.getRestaurantById);

export default router;
