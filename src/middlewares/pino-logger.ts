import { logger } from "hono-pino";
import crypto from "node:crypto";
import pino from "pino";
import pretty from "pino-pretty";

import env from "@/utils/env";

export function pinoLogger() {
  return logger({
    pino: pino({
      level: env.LOG_LEVEL,
    }, env.NODE_ENV === "production" ? undefined : pretty()),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}