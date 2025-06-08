import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "@/lib/types";

import env from "@/utils/env";

import { version } from "../../package.json";

function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version,
      title: "Tasks API",
    },
  });

  app.openAPIRegistry.registerComponent("securitySchemes", "CookieAuth", {
    type: "apiKey",
    in: "cookie",
    name: env.AUTH_COOKIE_NAME,
    description: "Authentication cookie",
  });

  app.get("/reference", Scalar({
    theme: "kepler",
    layout: "classic",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
    spec: {
      url: "/doc",
    },
  }));
}

export default configureOpenAPI;
