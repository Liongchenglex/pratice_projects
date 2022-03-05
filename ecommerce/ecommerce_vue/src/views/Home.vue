<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Ecommerce
        </p>
        <p class="subtitle">
          The best ecommerice store online
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <ProductBox 
      v-for='product in latestProducts' 
      :key="product.id"
      :product='product'
      />
   
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// component (see above how to use component)
import ProductBox from '@/components/ProductBox'

export default {
  name: 'Home',
  data(){
    return{
      latestProducts: []
    }
  },
  components: {
    ProductBox
  },
  // when code finish mounting/loading call the function below
  mounted() {
    this.getLatestProducts()
    document.title ='Home | ecommerce'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)

      await axios
        // api is for django urls
        .get('/api/v1/latest-products')
        .then(response => {
          this.latestProducts = response.data
        // do a console.log on latest product
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>


