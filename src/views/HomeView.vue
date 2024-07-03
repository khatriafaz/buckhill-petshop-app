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
  <section class="position-relative">
    <img class="w-100 my-12" src="/images/hero-image.png" />

    <div class="hero-sale-text d-flex flex-column align-start">
      <div class="hero-text text-h2 text-white pa-4">Up to 30% sale</div>
      <div class="hero-text text-subtitle-1 text-white pa-2 mt-2">On select dog food and toys</div>
    </div>
  </section>
  <CategorySlider v-if="featuredCategories[0]" :category="featuredCategories[0]"></CategorySlider>
  <CategorySlider v-if="featuredCategories[1]" :category="featuredCategories[1]"></CategorySlider>
</template>

<style>
.hero-sale-text {
  position: absolute;
  top: 150px;
  left: calc(150px - 48px);
}

.hero-text {
  background-color: rgba(34, 34, 34, .3);
}
</style>