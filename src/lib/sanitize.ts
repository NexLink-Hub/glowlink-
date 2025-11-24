// Very small sanitizer - this removes tags. For production use DOMPurify on the server or a well-tested library.
export function sanitizeInput(input: string): string {
  if (!input) return input;
  return input.replace(/<[^>]*>?/gm, "");
}
