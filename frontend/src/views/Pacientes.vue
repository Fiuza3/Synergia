<template>
  <div class="pacientes-container">
    <div class="section">
      <h1 class="section-title">Lista de Pacientes</h1>
      
      <div class="search-bar mb-4">
        <div class="form-group">
          <label for="busca">Buscar paciente</label>
          <div class="search-input">
            <input 
              type="text" 
              id="busca" 
              v-model="termoBusca" 
              class="form-control" 
              placeholder="Digite o nome do paciente"
              @input="buscarPacientes"
            >
          </div>
        </div>
      </div>
      
      <!-- Exibe mensagem quando não há pacientes -->
      <div v-if="!pacientesStore.carregando && pacientesStore.pacientesFiltrados.length === 0" class="pacientes-empty">
        <p>Nenhum paciente encontrado.</p>
      </div>
      
      <!-- Exibe indicador de carregamento -->
      <div v-if="pacientesStore.carregando" class="pacientes-loading">
        <p>Carregando pacientes...</p>
      </div>
      
      <!-- Lista de pacientes -->
      <div v-else class="pacientes-list">
        <div 
          v-for="paciente in pacientesStore.pacientesFiltrados" 
          :key="paciente.id"
          class="paciente-card"
        >
          <div class="paciente-nome">{{ paciente.nome }}</div>
          <div class="paciente-telefone">{{ paciente.telefone }}</div>
          <div v-if="paciente.observacoes" class="paciente-observacoes">
            <strong>Observações:</strong> {{ paciente.observacoes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePacientesStore } from '../store/pacientes';

// Obtém o store de pacientes
const pacientesStore = usePacientesStore();

// Termo de busca
const termoBusca = ref('');

/**
 * Busca pacientes pelo nome
 */
function buscarPacientes() {
  pacientesStore.buscarPorNome(termoBusca.value);
}

// Carrega os pacientes ao montar o componente
onMounted(() => {
  pacientesStore.carregarPacientes();
});
</script>

<style lang="scss" scoped>
.pacientes-container {
  padding-left: $sidebar-width;
}

.search-bar {
  max-width: 500px;
}

.pacientes-empty {
  background-color: $light-color;
  padding: $spacing-lg;
  border-radius: $border-radius;
  text-align: center;
  margin-top: $spacing-lg;
  
  p {
    font-size: $font-size-large;
  }
}

.pacientes-loading {
  text-align: center;
  padding: $spacing-lg;
}

.pacientes-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-md;
  margin-top: $spacing-md;
}

.paciente-card {
  background-color: $light-color;
  border-radius: $border-radius;
  padding: $spacing-md;
  box-shadow: $box-shadow;
  
  .paciente-nome {
    font-size: $font-size-large;
    font-weight: bold;
    margin-bottom: $spacing-xs;
  }
  
  .paciente-telefone {
    margin-bottom: $spacing-xs;
  }
  
  .paciente-observacoes {
    font-size: $font-size-small;
    color: lighten($text-color, 20%);
  }
}
</style>