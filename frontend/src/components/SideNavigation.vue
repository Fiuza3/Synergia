<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h1 class="sidebar-title">Synergia</h1>
    </div>
    
    <nav class="sidebar-nav">
      <ul>
        <li>
          <router-link to="/" class="sidebar-link">
            <span class="sidebar-icon">📅</span>
            <span class="sidebar-text">Agenda</span>
          </router-link>
        </li>
        <li>
          <router-link to="/novo-agendamento" class="sidebar-link">
            <span class="sidebar-icon">➕</span>
            <span class="sidebar-text">Novo Agendamento</span>
          </router-link>
        </li>
        <li>
          <router-link to="/pacientes" class="sidebar-link">
            <span class="sidebar-icon">👤</span>
            <span class="sidebar-text">Pacientes</span>
          </router-link>
        </li>
        <li>
          <router-link to="/locais" class="sidebar-link">
            <span class="sidebar-icon">🏥</span>
            <span class="sidebar-text">Locais</span>
          </router-link>
        </li>
        <li>
          <router-link to="/configuracoes" class="sidebar-link">
            <span class="sidebar-icon">⚙️</span>
            <span class="sidebar-text">Configurações</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
// Componente de navegação lateral
// Não requer lógica adicional
</script>

<style lang="scss" scoped>
.sidebar {
  width: $sidebar-width;
  background-color: $sidebar-background;
  color: $sidebar-text-color;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  
  &-header {
    padding: $spacing-md;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &-title {
    font-size: $font-size-xlarge;
    text-align: center;
    margin: 0;
  }
  
  &-nav {
    padding: $spacing-md 0;
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    li {
      margin-bottom: $spacing-xs;
    }
  }
  
  &-link {
    display: flex;
    align-items: center;
    padding: $spacing-sm $spacing-md;
    color: $sidebar-text-color;
    text-decoration: none;
    transition: background-color $transition-speed;
    border-left: 3px solid transparent;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      text-decoration: none;
    }
    
    &.router-link-active {
      background-color: rgba(255, 255, 255, 0.2);
      border-left-color: $primary-color;
    }
  }
  
  &-icon {
    margin-right: $spacing-sm;
    font-size: $font-size-large;
  }
  
  &-text {
    font-size: $font-size-base;
  }
}
</style>