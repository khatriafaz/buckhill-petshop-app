<script setup lang="ts">
import { ref } from 'vue';
import Product from '@/models/product';
import productApi from '@/api/product';

const loading = ref(false);
const results = ref<Product[]>([])

const search = (query: string) => {
    if (query.length < 2) {
        results.value = [];
        return;
    }

    loading.value = true

    productApi.list({ title: query, limit: 5 })
        .then(products => results.value = products)
        .finally(() => {
            loading.value = false;
        })
}
</script>

<template>
    <div class="d-flex justify-center">
        <v-autocomplete style="max-width: 50%;" label="Search products" color="primary" prepend-inner-icon="mdi-magnify"
            @update:search="search" :items="results" :loading="loading" variant="outlined"></v-autocomplete>
    </div>
</template>