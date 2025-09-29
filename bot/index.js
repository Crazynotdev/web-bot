import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import { handleCommand } from "./api/bot/commands.js";

export async function startBot(sessionId, sessionData) {
  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${sessionId}`);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true, // utile pour debug
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      console.log(`🔴 Bot ${sessionId} déconnecté`, lastDisconnect);
    } else if (connection === "open") {
      console.log(`🟢 Bot ${sessionId} connecté avec succès`);
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || "";
    handleCommand(sock, msg, text);
  });

  return sock;
}
