import { Hono } from "hono";
import { downloadImage, generateAltText } from "./utils";

import jwt from "@tsndr/cloudflare-worker-jwt";

const app = new Hono();

app.post("/api/v1/image", async (c) => {
  try {
    const { url } = await c.req.json();

    // Validate the provided URL
    if (!url || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url)) {
      return c.text(
        "Invalid image URL. Please provide a valid image URL.",
        400
      );
    }

    const altText = await generateAltText(url, c.env);

    return c.json({
      imageUrl: url,
      altText: altText
    });
  } catch (error) {
    console.error("Error processing the image:", error);
    return c.text("Error processing the image.", 500);
  }
});

app.notFound((c) => {
  return c.text("Not Found", 404);
});

export default {
  fetch: app.fetch
};
