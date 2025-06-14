import { z } from "@hono/zod-openapi";

export function idParamsSchema(
	name = "id",
	description = "id of the document",
) {
	return z.object({
		id: z.coerce.number().openapi({
			param: {
				name,
				in: "path",
			},
			required: ["id"],
			description,
			example: 17,
		}),
	});
}
