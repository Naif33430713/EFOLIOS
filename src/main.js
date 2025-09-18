import { createApp } from 'vue'
import App from './App.vue'
<<<<<<< Updated upstream
//import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
=======
import router from './router'

>>>>>>> Stashed changes

createApp(App).mount('#app')

<<<<<<< Updated upstream
=======



const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')
>>>>>>> Stashed changes
