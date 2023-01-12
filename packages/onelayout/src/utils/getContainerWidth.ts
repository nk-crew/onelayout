import { containerMaxWidths } from "../constants";
import { getNormalizedBreakpointName } from "./getNormalizedBreakpointName";

export function getContainerWidth(bp: string): string | number {
  let bpNormal = getNormalizedBreakpointName(bp);

  return typeof bpNormal !== "undefined" &&
    typeof containerMaxWidths[bpNormal] !== "undefined"
    ? `${containerMaxWidths[bpNormal]}px`
    : 0;
}
