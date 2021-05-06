export const state = () => ({
  company: {
    id: undefined,
  },
  brand: {
    id: undefined,
  }
})

export const mutations = {
  SET_COMPANY_ID(state, id) {
    state.company.id = id
  },
  SET_BRAND_ID(state, id) {
    state.brand.id = id
  }
}

export const actions = {
  setCompanyId({ commit }, id) {
    commit('SET_COMPANY_ID', id)
  },
  setBrandId({ commit }, id) {
    commit('SET_BRAND_ID', id)
  },
}

export const getters = {
  getCompanyId: (state) => state.company.id,
  getBrandId: (state) => state.brand.id
}
