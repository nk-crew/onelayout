import { BreakpointsTypes } from "../constants";

export default function getNormalizedBreakpointName(
  breakpoints: any,
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
