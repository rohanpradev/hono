import configureOpenAPI from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";
import aiRouter from "@/routes/ai/ai.index";
import authRouter from "@/routes/auth/auth.index";
import indexRouter from "@/routes/index.route";
import restaurantsRouter from "@/routes/restaurants/restaurant.index";

const app = createApp();

const routes = [indexRouter, authRouter, restaurantsRouter, aiRouter];

configureOpenAPI(app);

routes.forEach((route) => app.route("/", route));

export default app;
