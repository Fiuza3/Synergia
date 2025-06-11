<template>
  <div class="app-container">
    <!-- Barra de navegação lateral fixa -->
    <SideNavigation />
    
    <!-- Conteúdo principal da aplicação -->
    <main class="main-content">
      <!-- Componente de notificação para feedback ao usuário -->
      <Notification />
      
      <!-- Área onde as diferentes views serão renderizadas -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Importando os componentes necessários
import SideNavigation from './components/SideNavigation.vue';
import Notification from './components/Notification.vue';
</script>

<style lang="scss">
// Estilos globais da aplicação
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: $background-color;
}
</style>