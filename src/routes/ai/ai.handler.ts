import { azure } from "@ai-sdk/azure";
import { generateText } from "ai";
import type { AppRoutehandler } from "@/lib/types";
import type { AskAI } from "@/routes/ai/ai.route";
import * as HTTPStatusCodes from "@/utils/http-status-codes";

export const aiGenerateText: AppRoutehandler<AskAI> = async (c) => {
	const { prompt } = c.req.valid("json");

	const { text } = await generateText({
		prompt,
		model: azure("o4-mini"),
	});

	return c.json(
		{
			message: "Generated answer successfully",
			data: text,
		},
		HTTPStatusCodes.OK,
	);
};
