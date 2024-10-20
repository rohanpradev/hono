import configureOpenAPI from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import indexRouter from "@/routes/index.route";
import restaurantsRouter from "@/routes/restaurants/restaurant.index";

const app = createApp();

const routes = [indexRouter, restaurantsRouter];

configureOpenAPI(app);

routes.forEach(route => app.route("/", route));

export default app;
