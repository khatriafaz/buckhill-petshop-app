<script setup lang="ts">
import { onMounted, ref } from 'vue';
import categoryApi from '@/api/category';
import { useRoute } from 'vue-router';
import type Category from '@/models/category';
import productApi from '@/api/product';
import type Product from '@/models/product';

import ProductSearch from '@/components/ProductSearch.vue';
import ProductCard from '@/components/ProductCard.vue';

const route = useRoute();

const category = ref<Category | null>();
const loading = ref(false);

const products = ref<Product[]>([]);

const loadData = async () => {
    loading.value = true;

    const loadCategory = categoryApi.fetch(<string>route.params.uuid);
    const loadProducts = productApi.list({ category: route.params.uuid as string, limit: 15 });

    const [cat, prods] = await Promise.all([loadCategory, loadProducts]);

    category.value = cat;
    products.value = prods;

    loading.value = false;
}

onMounted(() => {
    loadData();
});
</script>

<template>
    <section class="my-8">
        <ProductSearch />
    </section>

    <section v-if="loading" class="text-center">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </section>

    <section v-else-if="category" class="pt-12">
        <v-row>
            <v-col cols="2">

            </v-col>
            <v-col cols="10">
                <div class="mb-12">
                    <h2 class="text-h2 text-capitalize text-primary text-decoration-none mb-6">{{ category.title }}</h2>
                    <v-breadcrumbs class="text-capitalize"
                        :items="['Homepage', 'Categories', category.title]"></v-breadcrumbs>
                </div>

                <v-row>
                    <v-col v-for="product of products" :key="product.uuid" cols="3">
                        <ProductCard :product="product" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </section>
</template>