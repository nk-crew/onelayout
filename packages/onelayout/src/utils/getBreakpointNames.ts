import { BreakpointsTypes } from "../constants";
import getNormalizedBreakpointName from "./getNormalizedBreakpointName";

export default function getBreakpointNames(
  breakpoints: any,
  from: "first" | "last" | BreakpointsTypes = "first",
  to: "first" | "last" | BreakpointsTypes = "last"
): BreakpointsTypes[] {
  const result: BreakpointsTypes[] = [];
  const fromNormal = getNormalizedBreakpointName(breakpoints, from);
  const toNormal = getNormalizedBreakpointName(breakpoints, to);

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
