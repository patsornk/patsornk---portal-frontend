export const state = () => ({
  routePermission: [
    {
      path: 'example',
      role: ['bu']
    },
    {
      path: 'accountManagement',
      role: ['admin', 'bu']
    }
  ],
  permissions: []
})

export const mutations = {
  SET_PERMISSION(state, fullPath) {
    let permissions = []
    state.routePermission.forEach((route) => {
      if (fullPath.includes(route.path)) {
        permissions = route.role
      }
    })
    state.permissions = permissions
  }
}

export const actions = {
  setPermission({ commit }, fullPath) {
    commit('SET_PERMISSION', fullPath)
  }
}
