<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <div class="title">Search</div>

                <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
            </div>
        </div>

<!-- :product is for binding prop -->
      <ProductBox 
      v-for='product in products' 
      :key="product.id"
      :product='product'
      />

    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue'

export default {
    name: 'Search',
    components: {
        ProductBox
    },
    data(){
        return {
            products: [],
            query: ''
        }
    },
    mounted(){
        document.title = 'Search | Djackets'

        let url = window.location.search.substring(1)
        let params = new URLSearchParams(url)

        if(params.get('query')){
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods: {
        async performSearch() {
            this.$store.commit('setIsLoading', true)

            await axios
                .post('/api/v1/products/search/', {'query': this.query})
                .then(response => {
                    this.products = response.data
                    console.log(this.products)
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>