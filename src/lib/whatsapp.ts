/**
 * Builds a wa.me link that opens a chat with a pre-filled message.
 * `phone` must include country and area code; any non-digit is stripped.
 */
export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
