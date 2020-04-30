export default function padLeft(value, length, pad) {
  return pad.repeat(length - value.length) + value
}
