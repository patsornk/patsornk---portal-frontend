import { feature, member, request } from '~/constants'

// States
export const state = () => ({
  toggleSidebar: false,
  organization: '',
  organizName: '',
  organizNavbarMenu: []
})

// mutations
export const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.toggleSidebar = !state.toggleSidebar
  },
  SET_ORGANIZATION(state, mode) {
    state.organization = mode
  }
}

// actions
export const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setOrganization({ commit }, mode) {
    commit('SET_ORGANIZATION', mode)
  }
}

// Getters
export const getters = {
  toggleSidebar: (state) => state.toggleSidebar,
  organization: (state) => state.organization,
  organizName: (state) => {
    switch (state.organization) {
      case 'FEATURE':
        return 'By feature'
      case 'MEMBER':
        return 'By member'
      case 'REQUEST':
        return 'By request'
      default:
        return 'Menu'
    }
  },
  organizNavbarMenu: (state) => {
    switch (state.organization) {
      case 'FEATURE':
        return feature
      case 'MEMBER':
        return member
      case 'REQUEST':
        return request
      default:
        return []
    }
  }
}
