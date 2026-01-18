import { intervalToDuration } from "date-fns";

type DateInput = Date | null | undefined;

export function datesToDurationString(end: DateInput, start: DateInput) {
  if (!start || !end) return null;

  const timeElapsed = end.getTime() - start.getTime();

  if (timeElapsed < 1000) {
    return `${timeElapsed} ms`;
  }

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
}
