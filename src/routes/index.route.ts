import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/lib/create-app";
import * as HttpStatusCodes from "@/utils/http-status-codes";

const tags = ["Index"];

const router = createRouter().openapi(
	createRoute({
		method: "get",
		path: "/",
		tags,
		responses: {
			[HttpStatusCodes.OK]: {
				description: "Index route",
				content: {
					"application/json": {
						schema: z.object({
							message: z.string().openapi({
								description: "Welcome message",
								example: "Welcome to the API!",
							}),
						}),
					},
				},
			},
		},
	}),
	(c) => c.json({ message: "Index route" }, HttpStatusCodes.OK),
);

export default router;
