import axios from 'axios'
import Cookies from 'js-cookie'

export const state = () => ({
  user: null,
  token: null,
})

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  check: (state) => state.user !== null,
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  fetchUserSuccess(state, user) {
    state.user = user
  },

  fetchUserFailure(state) {
    state.token = null
  },

  logout(state) {
    state.user = null
    state.token = null
  },

  setUser(state, { user }) {
    state.user = user
  },
}

// actions
export const actions = {
  saveToken({ commit, dispatch }, { token, remember }) {
    commit('setToken', token)

    Cookies.set('token', token, { expires: remember ? 365 : null })
  },

  async fetchUser({ commit }) {
    try {
      const { data } = await axios.get('/user')

      commit('fetchUserSuccess', data)
    } catch (e) {
      Cookies.remove('token')

      commit('fetchUserFailure')
    }
  },

  updateUser({ commit }, payload) {
    commit('setUser', payload)
  },

  async logout({ commit }) {
    try {
      await axios.post('/logout')
    } catch (e) {}

    Cookies.remove('token')

    commit('logout')
  },

  async fetchOauthUrl(ctx, { provider }) {
    const { data } = await axios.post(`/oauth/${provider}`)

    return data.url
  },
}
