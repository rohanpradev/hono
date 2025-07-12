import { sign } from "hono/jwt";

import env from "@/utils/env";

export const createToken = (payload: Record<string, any>): Promise<string> =>
	sign(payload, env.JWT_SECRET);

export const hashPassword = (pass: string): Promise<string> =>
	Bun.password.hash(pass);

export const verifyPassword = (
	pass: string,
	hashed: string,
): Promise<boolean> => Bun.password.verify(pass, hashed);
