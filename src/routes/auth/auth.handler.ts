import { deleteCookie, setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import db from "@/db";
import { user } from "@/db/schema";
import type { AppRoutehandler } from "@/lib/types";
import type { Login, LogoutUser, Register } from "@/routes/auth/auth.route";
import env from "@/utils/env";
import * as HTTPStatusCodes from "@/utils/http-status-codes";
import { TokenService } from "@/utils/token";

export const registerUser: AppRoutehandler<Register> = async (c) => {
	const { name, email, password, phone } = c.req.valid("json");

	const existingUser = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.email, email),
	});

	if (existingUser)
		throw new HTTPException(HTTPStatusCodes.BAD_REQUEST, {
			message: "User already exists",
		});

	const hashedPassword = await TokenService.hashPassword(password);

	const [userData] = await db
		.insert(user)
		.values({
			name,
			email,
			password: hashedPassword,
			emailVerified: false,
			phone,
			phoneVerified: false,
		})
		.returning({ id: user.id, name: user.name, email: user.email });

	const token = await TokenService.createToken({
		sub: userData,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
	});

	setCookie(c, env.AUTH_COOKIE_NAME, token, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7,
	});

	return c.json(
		{ message: "User registered successfully", data: userData },
		HTTPStatusCodes.CREATED,
	);
};

export const loginUser: AppRoutehandler<Login> = async (c) => {
	const { email, password } = c.req.valid("json");

	const existingUser = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.email, email),
	});

	if (!existingUser)
		throw new HTTPException(HTTPStatusCodes.UNAUTHORIZED, {
			message: "User does not exist",
		});

	const isPasswordValid = await TokenService.verifyPassword(
		password,
		existingUser.password,
	);

	if (!isPasswordValid)
		throw new HTTPException(HTTPStatusCodes.UNAUTHORIZED, {
			message: "Invalid email or password",
		});

	const token = await TokenService.createToken({
		sub: existingUser.id,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
	});

	setCookie(c, env.AUTH_COOKIE_NAME, token, {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7,
	});

	return c.json(
		{
			message: "Login successful",
			data: {
				id: existingUser.id,
				name: existingUser.name,
				email: existingUser.email,
			},
		},
		HTTPStatusCodes.OK,
	);
};

export const logoutUser: AppRoutehandler<LogoutUser> = async (c) => {
	deleteCookie(c, env.AUTH_COOKIE_NAME);
	return c.json({ message: "Logout successful" }, HTTPStatusCodes.OK);
};
