import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // API key from Vercel environment variables
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Or "gpt-3.5-turbo"
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch AI response",
      details: error.response?.data || error.message,
    });
  }
}
