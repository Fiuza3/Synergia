import { createRouter, createWebHistory } from 'vue-router'

// Importando as views
import Agenda from '../views/Agenda.vue'
import NovoAgendamento from '../views/NovoAgendamento.vue'
import Pacientes from '../views/Pacientes.vue'
import Locais from '../views/Locais.vue'
import Configuracoes from '../views/Configuracoes.vue'

// Criando as rotas da aplicação
const routes = [
  {
    path: '/',
    name: 'Agenda',
    component: Agenda
  },
  {
    path: '/novo-agendamento',
    name: 'NovoAgendamento',
    component: NovoAgendamento
  },
  {
    path: '/pacientes',
    name: 'Pacientes',
    component: Pacientes
  },
  {
    path: '/locais',
    name: 'Locais',
    component: Locais
  },
  {
    path: '/configuracoes',
    name: 'Configuracoes',
    component: Configuracoes
  }
]

// Criando o router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router