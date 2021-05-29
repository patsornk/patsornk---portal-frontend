// States
export const state = () => ({
  companyStatus: ''
})

// mutations
export const mutations = {
  SET_COMPANY_STATUS(state, data) {
    state.companyStatus = data
  }
}

// actions
export const actions = {
  setCompanyStatus({ commit }, data) {
    commit('SET_COMPANY_STATUS', data)
  }
}

// Getters
export const getters = {
  companyStatus: (state) => state.companyStatus
}
