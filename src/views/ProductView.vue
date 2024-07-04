<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import productApi from '@/api/product';
import type Product from '@/models/product';

import { VNumberInput } from 'vuetify/labs/VNumberInput'
import ProductSearch from '@/components/ProductSearch.vue';
import { useCurrencyStore } from '@/stores/currency';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const currency = useCurrencyStore();
const cart = useCartStore();

const product = ref<Product>();
const loading = ref(false);

const loadData = async () => {
    loading.value = true;
    product.value = await productApi.fetch(route.params.uuid as string);
    loading.value = false;
}

const productQuantity = computed({
    get() {
        return cart.productCountInCart(product.value?.uuid as string)
    },

    set(value) {
        if (value === 0) {
            cart.remove(product.value?.uuid as string)
        } else {
            cart.add(product.value?.uuid as string, value)
        }
    }
});

onMounted(() => {
    loadData()
})
</script>

<template>
    <section class="my-8">
        <ProductSearch />
    </section>
    <template v-if="product">
        <div style="max-width: 1200px; margin-left: auto; margin-right: auto;">
            <v-breadcrumbs class="text-capitalize"
                :items="['Homepage', product.category.title, product.title]"></v-breadcrumbs>
            <v-row class="my-12 align-center">
                <v-col class="text-center">
                    <img :src="product.image" />
                </v-col>
                <v-col>
                    <h1 class="text-h3 text-capitalize mb-4">{{ product.brand?.title }}</h1>
                    <h3 class="text-h5 text-disabled mb-8">{{ product.title }}</h3>

                    <div class="text-h3 mb-4">{{ currency.format(product.price) }}</div>

                    <v-number-input v-if="cart.exists(product.uuid)" control-variant="split"
                        v-model:model-value="productQuantity" :width="150" variant="outlined"></v-number-input>
                    <v-btn v-else @click="cart.add(product.uuid)" prepend-icon="mdi-cart" color="primary" size="large"
                        text="Add to cart"></v-btn>
                </v-col>
            </v-row>

            <div class="text-body-1 mb-12">{{ product.description }}</div>
        </div>
    </template>
</template>