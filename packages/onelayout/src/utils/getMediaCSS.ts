import { breakpoints } from "../constants.js";

export function getMediaCSS(bp: string, content: string): string {
  return `
    @media screen and (min-width: ${breakpoints[bp]}px) {
      ${content}
    }
  `;
}
