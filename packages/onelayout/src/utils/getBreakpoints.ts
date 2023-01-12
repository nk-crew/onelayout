import { breakpoints, BreakpointsTypes } from "../constants";
import { getNormalizedBreakpointName } from "./getNormalizedBreakpointName";

export function getBreakpoints(
  from: "first" | "last" | BreakpointsTypes = "first",
  to: "first" | "last" | BreakpointsTypes = "last"
): BreakpointsTypes[] {
  const result: BreakpointsTypes[] = [];
  const fromNormal = getNormalizedBreakpointName(from);
  const toNormal = getNormalizedBreakpointName(to);

  let save = false;

  Object.keys(breakpoints).forEach((bp) => {
    if (save || bp === fromNormal) {
      save = true;
      result.push(bp);
    }
    if (bp === toNormal) {
      save = false;
    }
  });

  return result;
}
