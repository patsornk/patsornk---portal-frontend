export const state = () => ({
  user: {
    name: '',
    roles: ['bu']
  }
})

export const mutations = {
  SET_USER(state, userData) {
    state.user = userData
  },
  SET_ROLES(state, roles) {
    state.user.roles = roles
  }
}

export const actions = {
  setUser({ commit }, userData) {
    commit('SET_USER', userData)
  },
  setRole({ commit }, roles) {
    commit('SET_ROLES', roles)
  }
}

export const getters = {
  roles: (state) => state.user.roles
}
