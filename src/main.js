import { createApp } from 'vue'
import App from './App.vue'

// Bootstrap CSS (and optional JS if you use Bootstrap components that need JS)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' // optional

// PrimeVue + theme
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// If you use PrimeIcons anywhere (e.g., buttons with icons), also:
// import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')