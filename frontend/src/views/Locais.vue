<template>
  <div class="locais-container">
    <div class="section">
      <h1 class="section-title">Locais</h1>
      
      <div class="card mb-4">
        <h2 class="mb-3">Adicionar Novo Local</h2>
        <form @submit.prevent="adicionarLocal" class="d-flex">
          <div class="form-group" style="flex: 1; margin-bottom: 0; margin-right: 1rem;">
            <input 
              type="text" 
              id="novoLocal" 
              v-model="novoLocal" 
              class="form-control" 
              placeholder="Digite o nome do local"
              required
            >
          </div>
          <button type="submit" class="btn btn-primary">Adicionar</button>
        </form>
      </div>
      
      <!-- Exibe mensagem quando não há locais -->
      <div v-if="!locaisStore.carregando && locaisStore.locais.length === 0" class="locais-empty">
        <p>Nenhum local cadastrado.</p>
      </div>
      
      <!-- Exibe indicador de carregamento -->
      <div v-if="locaisStore.carregando" class="locais-loading">
        <p>Carregando locais...</p>
      </div>
      
      <!-- Lista de locais -->
      <div v-else class="locais-list">
        <div 
          v-for="local in locaisStore.locais" 
          :key="local.id"
          class="local-item"
        >
          <div class="local-nome">{{ local.nome }}</div>
          <button @click="removerLocal(local.id)" class="btn btn-error btn-sm">
            Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useLocaisStore } from '../store/locais';
import { useNotificacaoStore } from '../store/notificacao';

// Obtém os stores necessários
const locaisStore = useLocaisStore();
const notificacaoStore = useNotificacaoStore();

// Nome do novo local
const novoLocal = ref('');

/**
 * Adiciona um novo local
 */
async function adicionarLocal() {
  if (!novoLocal.value.trim()) {
    notificacaoStore.erro('Por favor, digite o nome do local.');
    return;
  }
  
  try {
    await locaisStore.adicionarLocal({ nome: novoLocal.value.trim() });
    notificacaoStore.sucesso('Local adicionado com sucesso!');
    novoLocal.value = ''; // Limpa o campo
  } catch (error) {
    notificacaoStore.erro('Erro ao adicionar local.');
    console.error('Erro ao adicionar local:', error);
  }
}

/**
 * Remove um local
 * @param {string} id - ID do local
 */
async function removerLocal(id) {
  if (confirm('Tem certeza que deseja remover este local?')) {
    try {
      await locaisStore.removerLocal(id);
      notificacaoStore.sucesso('Local removido com sucesso!');
    } catch (error) {
      notificacaoStore.erro('Erro ao remover local.');
      console.error('Erro ao remover local:', error);
    }
  }
}

// Carrega os locais ao montar o componente
onMounted(() => {
  locaisStore.carregarLocais();
});
</script>

<style lang="scss" scoped>
.locais-container {
  padding-left: $sidebar-width;
}

.locais-empty {
  background-color: $light-color;
  padding: $spacing-lg;
  border-radius: $border-radius;
  text-align: center;
  margin-top: $spacing-lg;
  
  p {
    font-size: $font-size-large;
  }
}

.locais-loading {
  text-align: center;
  padding: $spacing-lg;
}

.locais-list {
  margin-top: $spacing-md;
}

.local-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $light-color;
  border-radius: $border-radius;
  padding: $spacing-md;
  margin-bottom: $spacing-sm;
  box-shadow: $box-shadow;
  
  .local-nome {
    font-size: $font-size-base;
  }
  
  .btn-sm {
    padding: $spacing-xs $spacing-sm;
    min-width: auto;
  }
}
</style>