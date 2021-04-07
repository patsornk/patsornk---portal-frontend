export default function ({ store, route }) {
  store.dispatch('guard/setPermission', route.fullPath)
  const roles = store.getters['user/roles']
  const permissions = store.state.guard.permissions
  let isRoute = false

  if (permissions.length > 0) {
    roles.forEach((role) => {
      if (permissions.includes(role)) {
        isRoute = true
      }
    })
  } else {
    isRoute = true
  }
  
  !isRoute && window.history.back()
}
