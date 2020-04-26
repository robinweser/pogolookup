export default function formatPercent(value) {
  return Math.floor(value * 10000) / 100 + '%'
}
