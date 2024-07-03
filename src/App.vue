<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute();

const links = ref([
  { text: 'Products', route: '/' },
  { text: 'Promotions', route: '/promotions' },
  { text: 'Blog', route: '/blog' }
])

const cartItems = ref([]);

const isActive = (path) => {
  return route.path === path;
}
</script>

<template>
  <v-app>
    <v-app-bar absolute :elevation="0" color="primary">
      <v-container>
        <v-row align="center" justify="space-between">
          <!-- Logo on the left -->
          <v-col cols="auto" style="display: grid; align-content: center;">
            <div class="text-h5 font-weight-medium">
              Petshop
            </div>
          </v-col>

          <!-- Links in the center -->
          <v-col cols="auto" class="d-none d-md-flex">
            <v-btn variant="text" v-for="link in links" :active="isActive(link.route)" :key="link.text"
              :to="link.route">{{ link.text
              }}</v-btn>
          </v-col>

          <!-- Buttons on the right -->
          <v-col cols="auto" class="text-right">
            <v-btn prepend-icon="mdi-cart-outline" variant="outlined">
              Cart ({{ cartItems.length }})
            </v-btn>
            <v-btn variant="outlined ms-3">Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
    <v-footer color="primary-light">
      <v-container>
        <v-row>
          <v-col>
            <div class="text-h4 text-primary font-weight-bold">Petshop</div>
          </v-col>
          <v-col>
            <h5 class="text-h6">Petshop</h5>
          </v-col>
          <v-col>
            <h5 class="text-h6">Links</h5>
          </v-col>
          <v-col>
            <h5 class="text-h6">Links</h5>
          </v-col>
          <v-col>
            <h5 class="text-h6">Links</h5>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>
