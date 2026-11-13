export const contactIntents = ["A role or contract", "A consultation", "A partnership", "A speaking invitation", "Something else"];
export function parseContactInput(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const field = (key: string, max: number) => typeof input[key] === "string" && input[key].length <= max ? input[key].trim() : "";
  const name = field("name", 100), email = field("email", 254), message = field("message", 3000), intent = field("intent", 80);
  if (!name || /[\r\n]/.test(name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || (intent && !contactIntents.includes(intent)) || input.website) return null;
  return { name, email, message, intent: intent || "Something else" };
}
