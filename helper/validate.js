export function isRequiredEmpty(value) {
  return value === '' || value === 0 || value === null || value === undefined
}

export function validateError(error) {
  let result = true
  for (const [key, value] of Object.entries(error)) {
    if (value || value !== '') result = false
  }

  return result
}

export function validateThaiCharacters(text) {
  const regex = /^[ก-๛0-9\s]*$/ //thai number and whitespace
  return regex.test(text)
}

export function validateEngCharacters(text) {
  const regex = /^[A-Za-z0-9\s]*$/ //eng number and whitespace
  return regex.test(text)
}

export function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export function validateNumber(text) {
  const regex = /^[0-9]*$/
  return regex.test(text)
}
