import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: '',
      username: ''
    },
    isAuthenticated: false,
    token: ''
  },
  // mutation to change the state
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')){
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('userid')
      } else {
        state.user.id = ''
        state.user.username = ''
        state.token = ''
        state.isAuthenticated = false
      }
    },
    // set token when login
    setToken(state, token){
      state.token = token
      state.isAuthenticated = true
    },
    // when logging out
    removeToken(state) {
      state.user.id = ''
      state.user.username = ''
      state.token =''
      state.isAuthenticated = false
    },
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
