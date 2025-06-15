import { z } from "zod/v4";

const EnvSchema = z.object({
	NODE_ENV: z.string().default("development"),
	PORT: z.coerce.number().default(9999),
	LOG_LEVEL: z.enum([
		"fatal",
		"error",
		"warn",
		"info",
		"debug",
		"trace",
		"silent",
	]),
	DATABASE_URL: z.url(),
	AUTH_COOKIE_NAME: z.string().optional().default("token"),
	JWT_SECRET: z.string({ error: "JWT secret is required for authentication" }),
});

export type Env = NonNullable<z.infer<typeof EnvSchema>>;

const { data: env, error } = EnvSchema.safeParse(Bun.env);

if (error) {
	console.error("❌ Invalid env:");
	console.error(z.prettifyError(error));
	process.exit(1);
}

export default env as Env;
