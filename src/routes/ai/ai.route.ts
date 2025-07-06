import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/utils/http-status-codes";

const tags = ["AI"];

export const askAI = createRoute({
	path: "/ask",
	method: "post",
	summary: "AI query",
	description: "Endpoint for getting AI generated response",
	tags,
	request: {
		body: {
			content: {
				"application/json": {
					schema: z
						.object({
							prompt: z.string(),
						})
						.openapi({
							title: "Input prompt to the LLM",
							description: "prompt to be provided to the LLM",
							example: {
								prompt: "Hi how are you feeling today",
							},
						}),
				},
			},
		},
	},
	responses: {
		[HttpStatusCodes.OK]: {
			description: "Response generated successfully",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						data: z.string().openapi({
							title: "response to the input prompt",
							description: "response of the LLM",
							example: "I am great how about you",
						}),
					}),
				},
			},
		},
	},
});

export type AskAI = typeof askAI;
