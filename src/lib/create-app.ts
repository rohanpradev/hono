import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "@/lib/types";

import serveEmojiFavicon from "@/middlewares/emoji-favicon";
import notFound from "@/middlewares/not-found";
import onError from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import defaultHook from "@/utils/default-hook";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export function createApp() {
  const app = createRouter();
  app.use(pinoLogger());
  app.use(serveEmojiFavicon("🔥"));

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
