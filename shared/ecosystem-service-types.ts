import { z } from "zod";

export const canonicalServiceTypes = [
  "residential",
  "commercial",
  "deep_clean",
  "move_out",
  "post_construction",
  "regular_maintenance",
] as const;

export const canonicalServiceTypeSchema = z.enum(canonicalServiceTypes);
export type CanonicalServiceType = z.infer<typeof canonicalServiceTypeSchema>;
