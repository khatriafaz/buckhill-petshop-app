<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import categoryApi from '@/api/category';
import { useRoute } from 'vue-router';
import type Category from '@/models/category';
import productApi from '@/api/product';
import type Product from '@/models/product';

import ProductSearch from '@/components/ProductSearch.vue';
import ProductCard from '@/components/ProductCard.vue';
import brandApi from '@/api/brand';
import type Brand from '@/models/brand';

const route = useRoute();

const category = ref<Category | null>();
const loading = ref(false);
const loadingProducts = ref(false);

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const brands = ref<Brand[]>([]);

const selectedBrand = ref<string | null>(null)

const updateBrand = (brand: Brand) => {
    if (brand.uuid === selectedBrand.value) {
        selectedBrand.value = null
    } else {
        selectedBrand.value = brand.uuid;
    }

    loadProducts();
}

const loadData = async () => {
    loading.value = true;

    const loadCategory = categoryApi.fetch(<string>route.params.uuid);
    const loadCategories = categoryApi.list();
    const loadBrands = brandApi.list();

    const [cat, cats, brnds] = await Promise.all([loadCategory, loadCategories, loadBrands, loadProducts()]);

    category.value = cat;
    categories.value = cats;
    brands.value = brnds;

    loading.value = false;
}

const loadProducts = async () => {
    loadingProducts.value = true;
    const prods = await productApi.list({ category: route.params.uuid as string, limit: 15, brand: selectedBrand.value });

    products.value = prods;
    loadingProducts.value = false;
}

onMounted(() => {
    loadData();
});

watch(() => route.params.uuid, () => {
    selectedBrand.value = null;
    loadData();
})
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
                <v-list lines="one">
                    <v-list-group value="Categories">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" prepend-icon="mdi-filter-outline">
                                <template v-slot:title>
                                    <v-list-item-title class="font-weight-bold">Category</v-list-item-title>
                                </template>
                            </v-list-item>
                        </template>
                        <v-list-item :to="{ name: 'category', params: { uuid: category.uuid } }"
                            v-for="category of categories" :key="category.uuid" :value="category.uuid">
                            <template v-slot:title>
                                <v-list-item-title class="text-capitalize">{{ category.title }}</v-list-item-title>
                            </template>
                        </v-list-item>
                    </v-list-group>
                </v-list>

                <v-list lines="one">
                    <v-list-group value="Brands">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" prepend-icon="mdi-filter-outline">
                                <template v-slot:title>
                                    <v-list-item-title class="font-weight-bold">Brands</v-list-item-title>
                                </template>
                            </v-list-item>
                        </template>
                        <v-list-item @click="updateBrand(brand)" :active="selectedBrand === brand.uuid" color="info"
                            v-for="brand of brands" :key="brand.uuid" :value="brand.uuid">
                            <template v-slot:title>
                                <v-list-item-title class="text-capitalize">{{ brand.title }}</v-list-item-title>
                            </template>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-col>
            <v-col cols="10">
                <div class="mb-12">
                    <h2 class="text-h2 text-capitalize text-primary text-decoration-none mb-6">{{ category.title }}</h2>
                    <v-breadcrumbs class="text-capitalize"
                        :items="['Homepage', 'Categories', category.title]"></v-breadcrumbs>
                </div>

                <div class="text-center" v-if="loadingProducts">
                    <v-progress-circular color="primary" indeterminate></v-progress-circular>
                </div>
                <div class="text-center" v-else-if="!products.length">
                    <p>No products available based on your filters.</p>
                </div>
                <v-row v-else>
                    <v-col v-for="product of products" :key="product.uuid" cols="3">
                        <ProductCard :product="product" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </section>
</template>