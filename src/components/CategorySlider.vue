<script setup lang="ts">
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { RouterLink } from 'vue-router';
import Category from '@/models/category'
import ProductCard from './ProductCard.vue';

const swiperModules = [Navigation, Autoplay];

defineProps({
    category: {
        type: Category,
        required: true
    }
});
</script>

<template>
    <section v-bind="$attrs">
        <RouterLink :to="{ name: 'category', params: { uuid: category.uuid } }"
            class="text-h4 text-capitalize text-primary text-decoration-none mb-8">{{ category.title }}</RouterLink>

        <Swiper :modules="swiperModules" :slides-per-view="5" navigation loop>
            <SwiperSlide v-for="product of category.products" :key="product.uuid" class="my-4">
                <ProductCard :product="product" />
            </SwiperSlide>
        </Swiper>
    </section>
</template>