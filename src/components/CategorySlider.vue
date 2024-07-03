<script setup lang="ts">
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

const swiperModules = [Navigation, Autoplay];

import Category from '@/models/category'

defineProps({
    category: {
        type: Category,
        required: true
    }
});
</script>

<template>
    <section v-bind="$attrs">
        <h4 class="text-h4 text-capitalize text-primary mb-8">{{ category.title }}</h4>

        <Swiper :modules="swiperModules" :slides-per-view="5" navigation loop>
            <SwiperSlide v-for="product of category.products" :key="product.uuid" class="my-4">
                <v-card variant="text" hover>
                    <div class="pa-8">
                        <v-img height="200px" :src="product.image"></v-img>
                    </div>

                    <v-card-title>{{ product.title }}</v-card-title>

                    <v-card-subtitle class="text-capitalize">{{ product.brand?.title }}</v-card-subtitle>
                    <v-card-text>
                        <div class="text-subtitle-1 font-weight-bold">{{ product.price }}</div>
                    </v-card-text>
                </v-card>
            </SwiperSlide>
        </Swiper>
    </section>
</template>