export function isRequiredEmpty(value) {
  return (
    value === '' ||
    value === 0 ||
    value === null ||
    value === undefined
  )
}

export function validateError(error) {
  let result = true
  for (const [key, value] of Object.entries(error)) {
    if (value) result = false
  }

  return result
}
