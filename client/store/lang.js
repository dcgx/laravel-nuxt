import Cookies from 'js-cookie'

// state
export const state = () => ({
  locale: process.env.appLocale,
  locales: {
    en: 'EN',
    es: 'ES',
  },
})

// getters
export const getters = {
  locale: (state) => state.locale,
  locales: (state) => state.locales,
}

// mutations
export const mutations = {
  setLocale(state, { locale }) {
    state.locale = locale
  },
}

// actions
export const actions = {
  setLocale({ commit }, { locale }) {
    commit('setLocale', { locale })

    Cookies.set('locale', locale, { expires: 365 })
  },
}
