export const state = () => ({
  currentState: 0,
  nextState: 0,
  maxState: 0
})

export const mutations = {
  SET_CURRENT_STATE(state, num) {
    state.currentState = num
  },
  SET_NEXT_STATE(state, num) {
    state.nextState = num
    state.currentState = num
    if (num > state.maxState) {
      state.maxState = num
    }
  },
  SET_MAX_STATE(state, num) {
    state.maxState = num
  }
}

export const actions = {
  setCurrentState({ commit }, data) {
    commit('SET_CURRENT_STATE', data)
  },
  setNextState({ commit }, data) {
    commit('SET_NEXT_STATE', data)
  },
  setMaxState({ commit }, data) {
    commit('SET_MAX_STATE', data)
  }
}
