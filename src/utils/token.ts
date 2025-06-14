import { sign } from "hono/jwt";

import env from "@/utils/env";

export class TokenService {
	static async createToken(payload: Record<string, any>): Promise<string> {
		return sign(payload, env.JWT_SECRET);
	}

	static async hashPassword(pass: string): Promise<string> {
		return Bun.password.hash(pass);
	}

	static async verifyPassword(pass: string, hashed: string): Promise<boolean> {
		return Bun.password.verify(pass, hashed);
	}
}
