export function validateJSON(jsonString: string): boolean {
  if (!jsonString) return true;
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}
