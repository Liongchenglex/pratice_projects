import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },

  // functions used to change state
  mutations: {
    // to allow stroing at the local storage of the browser
    initializeStore(state){
      // check if local storage for cart exist
      if (localStorage.getItem('cart')){
      // use JSON.pars to convert JSON string to JSON object
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        // stringify converts JSON object into strings
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      // check if token exist in local storage
      if(localStorage.getItem('token')){
        state.token =localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },

    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)

      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        // push all the information from get into the cart if item not in cart
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status){
      state.isLoading = status
    },
    // initialize token for log in
    setToken(state, token){
      state.token  = token
      state.isAuthenticated = true
    },
    removeToken(state){
      state.token = ''
      state.isAuthenticated = false
    },
    clearCart(state){
      // set items list to empty
      state.cart = {items: []}
      // remove from local storage
      localStorage.setItem('cart', JSON.stringify(state.cart))

    }

  },
  actions: {
  },
  modules: {
  }
})
