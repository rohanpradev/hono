import { z } from "@hono/zod-openapi";

import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/utils/constants";

export const paginationQuerySchema = z.object({
  pageSize: z.coerce.number().int().min(1).default(DEFAULT_PAGE_SIZE).openapi({
    param: {
      name: "pageSize",
      in: "query",
    },
    example: 100,
    description: "The number of items in a page",
    default: 10,
  }),
  pageNum: z.coerce.number().int().min(1).default(DEFAULT_PAGE_NUMBER).openapi({
    param: {
      name: "pageNum",
      in: "query",
    },
    example: 2,
    description: "The page number",
    default: 1,
  }),
});
