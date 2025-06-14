import { createRoute, z } from "@hono/zod-openapi";

import createMessageObjectSchema from "@/lib/openapi/schemas/create-message-object";
import { authMiddleware } from "@/middlewares/auth";
import * as HttpStatusCodes from "@/utils/http-status-codes";

const tags = ["Auth"];

export const register = createRoute({
	path: "/register",
	method: "post",
	summary: "User Registration",
	description: "Endpoint for user registration",
	tags,
	request: {
		body: {
			content: {
				"application/json": {
					schema: z
						.object({
							name: z.string().min(1).max(30),
							email: z.string().email(),
							password: z.string().min(6).max(100),
							phone: z.string().min(10).max(15),
						})
						.openapi({
							title: "User Registration",
							description: "Schema for user registration",
							example: {
								name: "John Doe",
								email: "john.doe@example.com",
								password: "password123",
								phone: "1234567890",
							},
						}),
				},
			},
		},
	},
	responses: {
		[HttpStatusCodes.CREATED]: {
			description: "User registered successfully",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						data: z
							.object({
								id: z.number(),
								name: z.string().min(1).max(30),
								email: z.string().email(),
							})
							.openapi({
								title: "User Data",
								description: "Data of the registered user",
								example: {
									id: 1,
									name: "John Doe",
									email: "john.doe@example.com",
								},
							}),
					}),
				},
			},
		},
		[HttpStatusCodes.BAD_REQUEST]: {
			description: "User already exists or invalid input",
			content: {
				"application/json": {
					schema: createMessageObjectSchema("Invalid input data"),
				},
			},
		},
	},
});

export type Register = typeof register;

export const login = createRoute({
	path: "/login",
	method: "post",
	summary: "User Login",
	description: "Endpoint for user login",
	tags,
	request: {
		body: {
			content: {
				"application/json": {
					schema: z
						.object({
							email: z.string().email(),
							password: z.string().min(6).max(100),
						})
						.openapi({
							title: "User Login",
							description: "Schema for user login",
							example: {
								email: "john.doe@example.com",
								password: "password123",
							},
						}),
				},
			},
		},
	},
	responses: {
		[HttpStatusCodes.OK]: {
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
						data: z
							.object({
								id: z.number(),
								name: z.string().min(1).max(30),
								email: z.string().email(),
							})
							.openapi({
								title: "User Data",
								description: "Data of the logged-in user",
								example: {
									id: 1,
									name: "John Doe",
									email: "john.doe@example.com",
								},
							}),
					}),
				},
			},
			description: "User logged in successfully",
		},
		[HttpStatusCodes.UNAUTHORIZED]: {
			description: "Invalid credentials",
			content: {
				"application/json": {
					schema: createMessageObjectSchema("Invalid email or password"),
				},
			},
		},
	},
});

export type Login = typeof login;

export const logout = createRoute({
	path: "/logout",
	method: "get",
	summary: "User Logout",
	description: "Endpoint for user logout",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: {
			content: {
				"application/json": {
					schema: z
						.object({
							message: z.string(),
						})
						.openapi({
							title: "Logout Response",
							description: "Response after successful logout",
							example: {
								message: "User logged out successfully",
							},
						}),
				},
			},
			description: "User logged in successfully",
		},
		[HttpStatusCodes.UNAUTHORIZED]: {
			description: "Unauthorized access",
			content: {
				"application/json": {
					schema: createMessageObjectSchema("Missing authorization token"),
				},
			},
		},
	},
});

export type LogoutUser = typeof logout;
