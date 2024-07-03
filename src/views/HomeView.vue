<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Category from '@/models/category';
import categoryApi from '@/api/category'
import productApi from '@/api/product';
import HomeImageContent from '@/components/HomeImageContent.vue';
import ProductSearch from '@/components/ProductSearch.vue';
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
  <section class="my-8">
    <ProductSearch />
  </section>
  <section class="position-relative section-gap">
    <img class="w-100" src="/images/hero-image.png" />

    <div class="hero-sale-text d-flex flex-column align-start">
      <div class="hero-text text-h2 text-white pa-4">Up to 30% sale</div>
      <div class="hero-text text-subtitle-1 text-white pa-2 mt-2">On select dog food and toys</div>
    </div>
  </section>
  <CategorySlider class="section-gap" v-if="featuredCategories[0]" :category="featuredCategories[0]"></CategorySlider>
  <HomeImageContent class="section-gap" image="/images/home-image-1.png" title="Treat your pup"
    action-text="Discover our dog treat selection" />
  <CategorySlider class="section-gap" v-if="featuredCategories[1]" :category="featuredCategories[1]"></CategorySlider>
  <HomeImageContent class="section-gap" image="/images/home-image-2.png" title="Get the best tips"
    action-text="Read our blog" :text-first="true" />
</template>

<style>
.hero-sale-text {
  position: absolute;
  top: 100px;
  left: 100px;
}

.section-gap {
  padding-bottom: 100px;
}

.hero-text {
  background-color: rgba(34, 34, 34, .3);
}
</style>