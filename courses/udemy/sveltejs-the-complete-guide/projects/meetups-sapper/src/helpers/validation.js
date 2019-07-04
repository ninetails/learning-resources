export function notEmpty(val) {
  return val.trim().length
}

export function isValidEmail(val) {
  return val.includes('@')
}
