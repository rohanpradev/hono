import { createRouter } from "@/lib/create-app";
import * as handlers from "@/routes/auth/auth.handler";
import * as routes from "@/routes/auth/auth.route";

const router = createRouter()
	.openapi(routes.register, handlers.registerUser)
	.openapi(routes.login, handlers.loginUser)
	.openapi(routes.logout, handlers.logoutUser);

export default router;
