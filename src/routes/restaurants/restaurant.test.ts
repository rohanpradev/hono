import { describe, expect, it } from "bun:test";
import { testClient } from "hono/testing";

import { createApp } from "@/lib/create-app";
import router from "@/routes/restaurants/restaurant.index";
import * as HttpStatusCodes from "@/utils/http-status-codes";

describe("Restaurant API get", () => {
  it("Responds with an array", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.restaurants.$get({ query: { pageNum: "1", pageSize: "10" } });
    expect(response.status).toBe(HttpStatusCodes.OK);
    const result = await response.json();
    expect(result).toBeArray();
  });
});
