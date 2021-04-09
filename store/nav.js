import {
  feature,
  member,
  request,
  accountManagement
} from '~/constants'

// States
export const state = () => ({
  toggleSidebar: false,
  organization:
    window.sessionStorage.getItem('organization') | '',
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
    window.sessionStorage.setItem('organization', mode)
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
    // Magic console.log to make it work!
    console.log(state.organization)
    switch (window.sessionStorage.getItem('organization')) {
      case 'FEATURE':
        return 'By feature'
      case 'MEMBER':
        return 'By member'
      case 'REQUEST':
        return 'By request'
      case 'ACCOUNTMANAGEMENT':
        return 'Account Management'
      default:
        return ''
    }
  },
  organizNavbarMenu: (state) => {
    // Magic console.log to make it work!
    console.log(state.organization)
    switch (window.sessionStorage.getItem('organization')) {
      case 'FEATURE':
        return feature
      case 'MEMBER':
        return member
      case 'REQUEST':
        return request
      case 'ACCOUNTMANAGEMENT':
        return accountManagement
      default:
        return {}
    }
  }
}
