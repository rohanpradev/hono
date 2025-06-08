import configureOpenAPI from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import authRouter from "@/routes/auth/auth.index";
import indexRouter from "@/routes/index.route";
import restaurantsRouter from "@/routes/restaurants/restaurant.index";

const app = createApp();

const routes = [indexRouter, authRouter, restaurantsRouter];

configureOpenAPI(app);

routes.forEach(route => app.route("/", route));

export default app;
