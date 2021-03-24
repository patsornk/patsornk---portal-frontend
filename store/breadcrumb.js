export const state = () => ({
  breadcrumbs: [],
  pageTitle: ''
})

export const mutations = {
  SET_BREADCRUMB(state, data) {
    state.breadcrumbs = data
  },
  SET_PAGETITLE(state, name) {
    state.pageTitle = name
  }
}

export const actions = {
  setBreadcrumb({ commit }, data) {
    commit('SET_BREADCRUMB', data)
  },
  setPageTitle({ commit }, name) {
    commit('SET_PAGETITLE', name)
  }
}

export const getters = {
  breadcrumbs: (state) => state.breadcrumbs,
  pageTitle: (state) => state.pageTitle
}
