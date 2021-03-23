export function isRequiredEmpty(value) {
  return (
    value === '' ||
    value === 0 ||
    value === null ||
    value === undefined
  )
}
