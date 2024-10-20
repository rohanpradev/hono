import { createRoute } from "@hono/zod-openapi";

import { createRouter } from "@/lib/create-app";
import jsonContent from "@/lib/openapi/helpers/json-content";
import createMessageObjectSchema from "@/lib/openapi/schemas/create-message-object";
import * as HttpStatusCodes from "@/utils/http-status-codes";

const tags = ["Index"];

const router = createRouter().openapi(createRoute({
  method: "get",
  path: "/",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      createMessageObjectSchema("Index route"),
      "API Index",
    ),
  },

}), c => c.json({ message: "Index route" }, HttpStatusCodes.OK));

export default router;
