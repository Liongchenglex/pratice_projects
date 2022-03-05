import { createRouter, createWebHistory } from 'vue-router'

// be sure to import to use meta dat requiredLogin
import store from '../store'

import Home from '../views/Home.vue'

import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import CheckOut from '../views/Checkout.vue'
import success from '../views/success.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/cart/checkout',
    name: 'CheckOut',
    component: CheckOut,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/cart/success',
    name: 'success',
    component: success
  },
  {
    // path is obtained from "view details" button from Home.vue
    // make sure to import Product
    // can change category_slug to play with variables
    path: '/:category_slug/:product_slug',
    name: 'Product',
    component: Product
  },
  {
    path: '/:category_slug',
    name: 'Category',
    component: Category
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// meta data setting
// to allow the usage of meta data requireLogin
// needed for the authentication
// to is the route we going to; from is the route we are from; next is the next route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next ({ name: 'LogIn', query: { to: to.path} });
  } else {
    next ()
  }
})

export default router
