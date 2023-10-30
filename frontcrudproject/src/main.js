import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import money from 'v-money3'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(money, {precision: 2})
  .mount('#app')
