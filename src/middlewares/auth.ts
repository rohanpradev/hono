import { jwt } from "hono/jwt";

import env from "@/utils/env";

export const authMiddleware = jwt({ secret: env.JWT_SECRET, cookie: env.AUTH_COOKIE_NAME });
