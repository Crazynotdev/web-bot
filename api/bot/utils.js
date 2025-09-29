export function formatDate(date) {
  return new Date(date).toLocaleString("fr-FR", { timeZone: "Africa/Libreville" });
}
