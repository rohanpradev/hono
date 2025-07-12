import { createRoute, z } from "@hono/zod-openapi";
import { HomePage } from "@/components/homepage";
import { createRouter } from "@/lib/create-app";
import * as HttpStatusCodes from "@/utils/http-status-codes";

const tags = ["Index"];

const router = createRouter()
	.openapi(
		createRoute({
			method: "get",
			path: "/",
			tags,
			responses: {
				[HttpStatusCodes.OK]: {
					description: "Index route",
					content: {
						"text/html": {
							schema: z.string(),
						},
					},
				},
			},
		}),
		(c) => c.html(<HomePage />),
	)
	.openapi(
		createRoute({
			method: "get",
			path: "/health",
			tags,
			responses: {
				[HttpStatusCodes.OK]: {
					description: "Health check route",
					content: {
						"application/json": {
							schema: z.object({
								status: z.string().openapi({
									description: "message",
									example: "Healthy",
								}),
								uptime: z.number().openapi({
									description: "Uptime in seconds",
									example: 12313,
								}),
							}),
						},
					},
				},
			},
		}),
		(c) =>
			c.json(
				{ status: "Healthy", uptime: process.uptime() },
				HttpStatusCodes.OK,
			),
	);

export default router;
