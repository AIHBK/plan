import { createStore } from 'vuex'

export default createStore({
  state: {
    userData: {},
  },
  actions: {

  },
  mutations: {
    userData(state, value) {
      state.userData = value
    }
  },
  modules: {

  },
})