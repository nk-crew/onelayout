import { getNormalizedBreakpointName } from "./getNormalizedBreakpointName";

export function getContainerWidth(
  bp: string,
  containerMaxWidths: any,
  breakpoints: any
): string | number {
  let bpNormal = getNormalizedBreakpointName(breakpoints, bp);

  return typeof bpNormal !== "undefined" &&
    typeof containerMaxWidths[bpNormal] !== "undefined"
    ? containerMaxWidths[bpNormal]
    : 0;
}
