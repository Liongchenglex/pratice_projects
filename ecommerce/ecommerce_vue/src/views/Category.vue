<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
            </div>

            <ProductBox
                v-for='product in category.products' 
                :key="product.id"
                :product='product'
            />

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import ProductBox from '@/components/ProductBox'

export default {
    name: 'Category',
    components: {
        ProductBox
    },
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    mounted() {
        this.getCategory()
    },
    // refresh getCategory when a new Category route is selected
    watch: {
        $route(to, from) {
            // use if statement so that the function will be called only when changing between categories
            if (to.name === 'Category'){
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory() {

            const category_slug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/api/v1/products/${ category_slug }/`)
                .then(response => {
                    this.category = response.data

                    document.title = this.category.name + ' | ecommerce'
                })
                .catch(error => {
                    console.log(error)
                    toast({
                        message: 'Something went wrong. Please try again',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })

            this.$store.commit('setIsLoading', false)

        }
    }
}
</script>