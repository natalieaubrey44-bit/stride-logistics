export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  // A simple way to strip HTML tags
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}
