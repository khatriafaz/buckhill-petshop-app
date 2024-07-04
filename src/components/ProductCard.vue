<script setup lang="ts">
import Product from '@/models/product';
import { useCartStore } from '@/stores/cart';
import { useCurrencyStore } from '@/stores/currency';
import type { PropType } from 'vue';

const currency = useCurrencyStore();
const cart = useCartStore();

const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    },

    showAddToCart: {
        type: Boolean,
        default: false
    }
})

const addToCart = () => {
    cart.add(props.product.uuid);
}

const removeFromCart = () => {
    cart.remove(props.product.uuid)
}
</script>

<template>
    <v-card variant="text" hover>
        <div class="pa-8">
            <v-img height="200px" :src="product.image"></v-img>
        </div>

        <v-card-title>{{ product.title }}</v-card-title>

        <v-card-subtitle class="text-capitalize">{{ product.brand?.title }}</v-card-subtitle>
        <v-card-text>
            <div class="text-subtitle-1 font-weight-bold mb-4">{{ currency.format(product.price) }}</div>

            <template v-if="showAddToCart">
                <v-btn v-if="!cart.exists(product.uuid)" @click="addToCart" color="primary" prepend-icon="mdi-cart"
                    text="Add to cart"></v-btn>
                <v-btn v-else @click="removeFromCart" color="red-lighten-2" prepend-icon="mdi-cart"
                    text="Remove from cart"></v-btn>
            </template>
        </v-card-text>
    </v-card>
</template>