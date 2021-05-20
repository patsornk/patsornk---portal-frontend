export function getImagePath(value: String) {
  return `${process.env.PORTAL_HOST}${value}`
}

export function getAssetsPath(name: String) {
  return `${process.env.PORTAL_HOST}/assets/${name}`
}