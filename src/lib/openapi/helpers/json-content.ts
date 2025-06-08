import type { ZodType } from "zod/v4";

import { toJSONSchema } from "zod/v4";

const jsonContent = <T extends ZodType>(schema: T) => toJSONSchema(schema);

export default jsonContent;
