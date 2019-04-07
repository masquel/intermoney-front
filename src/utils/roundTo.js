export default function roundTo(digit, decimals){
  if(!digit) return undefined;
  return Math.round(digit * Math.pow(10, decimals)) / Math.pow(10, decimals);
}