<script setup lang="ts">
import Product from '@/models/product';
import type { PropType } from 'vue';

import { useCurrencyStore } from '@/stores/currency';
const currency = useCurrencyStore();

defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    }
})
</script>

<template>
    <v-card variant="text" hover>
        <div class="pa-8">
            <v-img height="200px" :src="product.image"></v-img>
        </div>

        <v-card-title>{{ product.title }}</v-card-title>

        <v-card-subtitle class="text-capitalize">{{ product.brand?.title }}</v-card-subtitle>
        <v-card-text>
            <div class="text-subtitle-1 font-weight-bold">{{ currency.format(product.price) }}</div>
        </v-card-text>
    </v-card>
</template>