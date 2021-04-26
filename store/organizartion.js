export const state = () => ({
    company: {
        id: undefined,
    }
})

export const mutations = {
    SET_COMPANY_ID(state, id) {
        state.company.id = id
    }
}

export const actions = {
    setConpanyId({ commit }, id) {
        commit('SET_COMPANY_ID', id)
    },
}

export const getters = {
    getCompanyId: (state) => state.company.id
}
