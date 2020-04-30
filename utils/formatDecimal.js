export default function formatDecimal(value, digits = 2) {
  return Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits)
}
