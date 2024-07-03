import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import './assets/main.css'

const theme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#4EC690',
    'on-primary': '#FFFFFF'
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
import type { ThemeDefinition } from 'vuetify'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
