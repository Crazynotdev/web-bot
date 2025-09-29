import { startBot } from "../bot/index.js";

let bots = {};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { session } = req.body;

    if (!session) {
      return res.status(400).json({ error: "Session is required" });
    }

    const sessionId = Date.now().toString();

    try {
      const sock = await startBot(sessionId, session);
      bots[sessionId] = sock;

      return res.status(200).json({
        message: "Bot started!",
        sessions: Object.keys(bots).length,
        id: sessionId,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to start bot" });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json({ sessions: Object.keys(bots).length });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
