export default function formatPercent(value, digits = 2) {
  if (digits === 0) {
    return Math.floor(value * 100) + '%'
  }

  return Math.floor(value * Math.pow(100, digits)) / Math.pow(10, digits) + '%'
}
