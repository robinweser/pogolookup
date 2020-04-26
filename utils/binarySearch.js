export default function binarySearch(ar, num) {
  var m = 0
  var n = ar.length - 1
  while (m <= n) {
    var k = (n + m) >> 1
    if (ar[k] < num) {
      m = k + 1
    } else if (ar[k] > num) {
      n = k - 1
    } else {
      return k
    }
  }
  return m - 1
}
