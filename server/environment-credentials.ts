/** Read a complete credential group without falling back to Replit on Vercel. */
export function environmentCredentials(names: readonly string[]): string[] | null {
  const values = names.map(name => process.env[name]?.trim() || "");
  if (values.every(Boolean)) return values;
  if (process.env.VERCEL === "1" || values.some(Boolean)) {
    const missing = names.filter((_, index) => !values[index]);
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
  return null;
}
