import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/scss/main.scss'

// Criando a instância do aplicativo Vue
const app = createApp(App)

// Adicionando o Pinia para gerenciamento de estado
app.use(createPinia())

// Adicionando o Vue Router para navegação
app.use(router)

// Montando o aplicativo no elemento com id 'app'
app.mount('#app')