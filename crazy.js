async function startBot() {
  const session = document.getElementById("session").value;
  const status = document.getElementById("status");

  if (!session) {
    status.textContent = "❌ Session manquante";
    return;
  }

  status.textContent = "⏳ Démarrage du bot...";

  try {
    const res = await fetch("/api/bots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session }),
    });

    const data = await res.json();
    if (res.ok) {
      status.textContent = `✅ Bot démarré ! (Sessions actives: ${data.sessions})`;
    } else {
      status.textContent = "❌ Erreur: " + data.error;
    }
  } catch (err) {
    console.error(err);
    status.textContent = "⚠️ Impossible de lancer le bot.";
  }
}
