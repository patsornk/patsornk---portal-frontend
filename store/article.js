export const state = () => ({
  isError: false,
  isCreateNewArticle: false,
  isDisabled: 'disabled',
  isHaveNormalTitle: false,
  isSubmit: false,
  isCategorySelected: false,
  isTopicSelected: false,
  isHavePublish: true,
  isHaveExpire: true,
  isHaveAuthor: false,
  isHaveThumbnail: false
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
  },
  setIsHavePublish({ commit }, isPublish) {
    commit('SET_ISHAVEPUBLISH', isPublish)
  },
  setIsHaveExpire({ commit }, isExpire) {
    commit('SET_ISHAVEEXPIRE', isExpire)
  },
  setIsHaveAuthor({ commit }, isHaveAuthor) {
    commit('SET_ISHAVEAUTHOR', isHaveAuthor)
  },
  setIsHaveThumbnail({ commit }, isHaveThumbnail) {
    commit('SET_ISHAVETHUMBNAIL', isHaveThumbnail)
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
  },
  SET_ISHAVEPUBLISH(state, isPublish) {
    state.isHavePublish = isPublish
  },
  SET_ISHAVEEXPIRE(state, isExpire) {
    state.isHaveExpire = isExpire
  },
  SET_ISHAVEAUTHOR(state, isHaveAuthor) {
    state.isHaveAuthor = isHaveAuthor
  },
  SET_ISHAVETHUMBNAIL(state, isHaveThumbnail) {
    state.isHaveThumbnail = isHaveThumbnail
  }
}

export const getters = {
  isError: (state) => state.isError,
  isCreateNewArticle: (state) => state.isCreateNewArticle,
  isDisabled: (state) => state.isDisabled,
  isHaveNormalTitle: (state) => state.isHaveNormalTitle,
  isSubmit: (state) => state.isSubmit,
  isCategorySelected: (state) => state.isCategorySelected,
  isTopicSelected: (state) => state.isTopicSelected,
  isHavePublish: (state) => state.isHavePublish,
  isHaveExpire: (state) => state.isHaveExpire,
  isHaveAuthor: (state) => state.isHaveAuthor,
  isHaveThumbnail: (state) => state.isHaveThumbnail
}

