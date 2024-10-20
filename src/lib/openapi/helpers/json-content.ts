import type { ZodSchema } from "@/lib/openapi/helpers/types";

function jsonContent<
  T extends ZodSchema,
>(schema: T, description: string) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
}

export default jsonContent;
