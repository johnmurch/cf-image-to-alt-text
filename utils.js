import { Ai } from "@cloudflare/ai";

export async function generateAltText(url, env) {
  try {
    const ai = new Ai(env.AI);
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const arr = Array.from(new Uint8Array(arrayBuffer));

    // allows you to switch and test other models
    const model = "@cf/llava-hf/llava-1.5-7b-hf";
    // const model = '@cf/unum/uform-gen2-qwen-500m';

    // you can also customize the prompt below
    const input = {
      image: arr,
      prompt:
        "Provide a one sentence description of the image to be used as website alt text. Try to really describe the image for those who are seeing impaired",
      max_tokens: 256
    };

    let aiResponse;
    aiResponse = await ai.run(model, input);
    // console.log('aiResponse', aiResponse);

    if (!aiResponse || !aiResponse.description) {
      throw new Error("Failed to generate alt text");
    }

    return aiResponse.description;
  } catch (error) {
    console.log("error", error);
    console.error("Error generating alt text:", error);
    return "Error generating alt text for the image.";
  }
}

export async function downloadImage(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error("Failed to download image");
  }
  const contentType = response.headers.get("Content-Type");
  const imageBuffer = await response.arrayBuffer(); // Get image as binary data
  return { imageBuffer, contentType };
}
