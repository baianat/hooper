export function getInRange (value, min, max) {
  return Math.max(Math.min(value, max), min)
}

export function now () {
  return Date.now();
}