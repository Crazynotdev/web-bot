export function handleCommand(sock, msg, text) {
  const jid = msg.key.remoteJid;

  switch (text.toLowerCase()) {
    case "ping":
      sock.sendMessage(jid, { text: "🏓 Pong!" });
      break;

    case "menu":
      sock.sendMessage(jid, {
        text: `📋 *Crazy Web Bot Commands*:
        
!ping - Test bot
!menu - Show commands
!help - Info
!sticker - Convert image to sticker`,
      });
      break;

    case "!help":
      sock.sendMessage(jid, {
        text: "ℹ️ Crazy Web Bot est en ligne.\nColle ta session sur le site pour déployer 🚀",
      });
      break;

    case "!sticker":
      sock.sendMessage(jid, { text: "📸 Envoie une image avec !sticker en légende." });
      break;

    default:
      if (text.startsWith(".")) {
        sock.sendMessage(jid, {
          text: "❌ Commande inconnue. Tape *!menu* pour voir la liste.",
        });
      }
      break;
  }
}
