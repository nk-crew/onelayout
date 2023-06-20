export default function getMediaCSS(
  bp: string,
  content: string,
  breakpoints: any
): string {
  return `
    @media screen and (min-width: ${breakpoints[bp]}) {
      ${content}
    }
  `;
}
