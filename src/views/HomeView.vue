<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Category from '@/models/category';
import categoryApi from '@/api/category'
import productApi from '@/api/product';
import CategorySlider from '@/components/CategorySlider.vue';

const loading = ref(false);
const categories = ref<Category[]>([]);
const featuredCategories = ref<Category[]>([]);

const loadData = async () => {
  loading.value = true;
  categoryApi.list()
    .then(async (loadedCategories) => {
      categories.value = loadedCategories;
      const filtered = loadedCategories.filter((_, i) => i < 2);

      featuredCategories.value = await Promise.all(filtered.map(async category => {
        category.products = await productApi.list({
          limit: 10,
          category: category.uuid
        });

        return category;
      }))
    })

}

onMounted(() => {
  loadData();
});
</script>

<template>
  <CategorySlider v-if="featuredCategories[0]" :category="featuredCategories[0]"></CategorySlider>
  <CategorySlider v-if="featuredCategories[1]" :category="featuredCategories[1]"></CategorySlider>
</template>
