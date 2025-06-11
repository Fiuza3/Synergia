<template>
  <div class="configuracoes-container">
    <div class="section">
      <h1 class="section-title">Configurações</h1>
      
      <div class="card">
        <h2 class="mb-3">Informações do Sistema</h2>
        
        <div class="info-item">
          <strong>Nome:</strong> Synergia
        </div>
        
        <div class="info-item">
          <strong>Versão:</strong> 1.0.0
        </div>
        
        <div class="info-item">
          <strong>Descrição:</strong> Sistema de agendamento de consultas médicas
        </div>
      </div>
      
      <div class="card mt-4">
        <h2 class="mb-3">Gerenciar Dados</h2>
        
        <div class="mb-3">
          <button @click="exportarDados" class="btn btn-primary">
            Exportar Dados
          </button>
          <p class="mt-1 text-small">Salva todos os dados do sistema em um arquivo</p>
        </div>
        
        <div class="mb-3">
          <button @click="limparDados" class="btn btn-error">
            Limpar Todos os Dados
          </button>
          <p class="mt-1 text-small">Remove todos os dados do sistema (não pode ser desfeito)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotificacaoStore } from '../store/notificacao';

// Obtém o store de notificações
const notificacaoStore = useNotificacaoStore();

/**
 * Exporta os dados do sistema
 */
function exportarDados() {
  try {
    // Obtém os dados do localStorage
    const dados = localStorage.getItem('Synergia');
    
    if (!dados) {
      notificacaoStore.erro('Não há dados para exportar.');
      return;
    }
    
    // Cria um blob com os dados
    const blob = new Blob([dados], { type: 'application/json' });
    
    // Cria um link para download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synergia-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    // Adiciona o link ao documento e clica nele
    document.body.appendChild(a);
    a.click();
    
    // Remove o link
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    notificacaoStore.sucesso('Dados exportados com sucesso!');
  } catch (error) {
    notificacaoStore.erro('Erro ao exportar dados.');
    console.error('Erro ao exportar dados:', error);
  }
}

/**
 * Limpa todos os dados do sistema
 */
function limparDados() {
  if (confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
    try {
      localStorage.removeItem('Synergia');
      notificacaoStore.sucesso('Todos os dados foram removidos. Recarregue a página para iniciar um novo banco de dados.');
    } catch (error) {
      notificacaoStore.erro('Erro ao limpar dados.');
      console.error('Erro ao limpar dados:', error);
    }
  }
}
</script>

<style lang="scss" scoped>
.configuracoes-container {
  padding-left: $sidebar-width;
}

.info-item {
  margin-bottom: $spacing-sm;
}

.text-small {
  font-size: $font-size-small;
  color: lighten($text-color, 30%);
}
</style>