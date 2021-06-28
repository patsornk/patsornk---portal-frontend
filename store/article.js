export const state = () => ({
  isError: false,
  isCreateNewArticle: false,
  isDisabled: 'disabled',
  isHaveNormalTitle: false,
  isSubmit: false,
  isCategorySelected: false,
  isTopicSelected: false
})

export const actions = {
  setIsError({ commit }, data) {
    commit('SET_ISERROR', data)
  },
  setIsCreateNewArticle({ commit }, name) {
    commit('SET_ISCREATENEWARTICLE', name)
  },
  setIsDisabled({ commit }, isDisabled) {
    commit('SET_ISDISABLED', isDisabled)
  },
  setIsHaveNormalTitle({ commit }, isHave) {
    commit('SET_ISHAVENORMALTITLE', isHave)
  },
  setIsSubmit({ commit }, isSubmit) {
    commit('SET_ISSUBMIT', isSubmit)
  },
  setIsCategorySelected({ commit }, isSubmit) {
    commit('SET_ISCATEGORYSELECTED', isSubmit)
  },
  setIsTopicSelected({ commit }, isSubmit) {
    commit('SET_ISTOPICSELECTED', isSubmit)
  }
}

export const mutations = {
  SET_ISERROR(state, data) {
    state.isError = data
  },
  SET_ISCREATENEWARTICLE(state, isCreateNewArticle) {
    state.isCreateNewArticle = isCreateNewArticle
  },
  SET_ISDISABLED(state, isDisabled) {
    state.isDisabled = isDisabled
  },
  SET_ISHAVENORMALTITLE(state, isHave) {
    state.isHaveNormalTitle = isHave
  },
  SET_ISSUBMIT(state, isSubmit) {
    state.isSubmit = isSubmit
  },
  SET_ISCATEGORYSELECTED(state, isSubmit) {
    state.isCategorySelected = isSubmit
  },
  SET_ISTOPICSELECTED(state, isSubmit) {
    state.isTopicSelected = isSubmit
  }
}

export const getters = {
  isError: (state) => state.isError,
  isCreateNewArticle: (state) => state.isCreateNewArticle,
  isDisabled: (state) => state.isDisabled,
  isHaveNormalTitle: (state) => state.isHaveNormalTitle,
  isSubmit: (state) => state.isSubmit,
  isCategorySelected: (state) => state.isCategorySelected,
  isTopicSelected: (state) => state.isTopicSelected
}

