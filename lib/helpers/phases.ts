import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creditsConsumed">;

export function getPhasesTotalCost(phases: Phase[]) {
  return phases.reduceRight(
    (total, phase) => total + (phase?.creditsConsumed || 0),
    0,
  );
}
