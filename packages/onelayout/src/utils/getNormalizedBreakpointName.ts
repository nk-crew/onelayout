import { breakpoints, BreakpointsTypes } from "../constants";

export function getNormalizedBreakpointName(
  name: "first" | "last" | BreakpointsTypes = "sm"
): BreakpointsTypes {
  let result;

  if (name === "first") {
    [result] = Object.keys(breakpoints);
  } else if (name === "last") {
    result = Object.keys(breakpoints)[Object.keys(breakpoints).length - 1];
  } else {
    result = name;
  }

  return result as BreakpointsTypes;
}
