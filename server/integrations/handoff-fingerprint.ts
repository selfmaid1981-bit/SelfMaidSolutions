import { createHash } from "crypto";

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, canonicalize(child)]),
    );
  }

  return value;
}

/**
 * Produces a deterministic SHA-256 fingerprint for an already-validated handoff.
 * Object key order does not affect the result; array order remains significant.
 */
export function fingerprintHandoffPayload(payload: unknown) {
  const canonicalJson = JSON.stringify(canonicalize(payload));
  return createHash("sha256").update(canonicalJson).digest("hex");
}
