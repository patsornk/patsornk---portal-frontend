// States
export const state = () => ({
  status: ''
})

// mutations
export const mutations = {
  SET_STATUS(state, data) {
    state.status = data
  }
}

// actions
export const actions = {
  setStatus({ commit }, data) {
    commit('SET_STATUS', data)
  }
}

// Getters
export const getters = {
  status: (state) => state.status
}
