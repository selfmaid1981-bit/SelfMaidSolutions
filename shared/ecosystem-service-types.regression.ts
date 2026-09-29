import { canonicalServiceTypeSchema, canonicalServiceTypes } from "./ecosystem-service-types";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

for (const serviceType of canonicalServiceTypes) {
  const result = canonicalServiceTypeSchema.safeParse(serviceType);
  assert(result.success, `Expected canonical service type "${serviceType}" to be accepted.`);
}

for (const unsupported of ["airbnb_turnover", "window_only", "unknown", ""]) {
  const result = canonicalServiceTypeSchema.safeParse(unsupported);
  assert(!result.success, `Expected unsupported service type "${unsupported}" to be rejected.`);
}
