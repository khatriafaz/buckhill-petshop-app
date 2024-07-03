import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import './assets/main.css'

const theme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#4EC690',
    'on-primary': '#FFFFFF',
    'primary-light': '#EDF5F1'
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: theme
    }
  }
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
