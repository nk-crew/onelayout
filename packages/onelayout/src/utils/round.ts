export default function round(num: number, to: number = 2): number {
  const pw = 10 ** to;
  return Math.round((num + Number.EPSILON) * pw) / pw;
}
