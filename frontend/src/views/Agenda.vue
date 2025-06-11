<template>
  <div class="agenda-container">
    <div class="section">
      <div class="section-header d-flex justify-between align-center">
        <h1 class="section-title">Agenda do Dia</h1>
        
        <div class="date-filter">
          <DatePicker
            v-model="dataAtual"
            label="Selecione a data"
            @update:modelValue="alterarData"
          />
        </div>
      </div>
      
      <div class="agenda-date">
        {{ agendaStore.dataFormatada }}
      </div>
      
      <!-- Exibe mensagem quando não há agendamentos -->
      <div v-if="!agendaStore.carregando && agendaStore.agendamentosOrdenados.length === 0" class="agenda-empty">
        <p>Não há agendamentos para esta data.</p>
        <router-link to="/novo-agendamento" class="btn btn-primary mt-3">
          Criar novo agendamento
        </router-link>
      </div>
      
      <!-- Exibe indicador de carregamento -->
      <div v-if="agendaStore.carregando" class="agenda-loading">
        <p>Carregando agendamentos...</p>
      </div>
      
      <!-- Lista de agendamentos -->
      <div v-else class="agenda-list">
        <div 
          v-for="agendamento in agendaStore.agendamentosOrdenados" 
          :key="agendamento.id"
          :class="['agenda-item', agendamento.evento.toLowerCase()]"
        >
          <div class="agenda-header">
            <span class="agenda-time">{{ agendamento.horario }}</span>
            <span class="agenda-event">{{ agendamento.evento }}</span>
          </div>
          
          <div class="agenda-patient">{{ agendamento.nome }}</div>
          
          <div class="agenda-details">
            <div><strong>Local:</strong> {{ agendamento.local }}</div>
            <div><strong>Telefone:</strong> {{ agendamento.telefone }}</div>
            <div v-if="agendamento.observacoes">
              <strong>Observações:</strong> {{ agendamento.observacoes }}
            </div>
          </div>
          
          <div class="agenda-actions mt-2">
            <button 
              @click="removerAgendamento(agendamento.id)" 
              class="btn btn-error"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAgendaStore } from '../store/agenda';
import { useNotificacaoStore } from '../store/notificacao';
import DatePicker from '../components/DatePicker.vue';

// Obtém os stores necessários
const agendaStore = useAgendaStore();
const notificacaoStore = useNotificacaoStore();

// Data atual no formato YYYY-MM-DD
const dataAtual = ref(new Date().toISOString().split('T')[0]);

/**
 * Altera a data selecionada e carrega os agendamentos
 * @param {string} data - Nova data no formato YYYY-MM-DD
 */
function alterarData(data) {
  agendaStore.alterarData(data);
}

/**
 * Remove um agendamento
 * @param {string} id - ID do agendamento
 */
async function removerAgendamento(id) {
  if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
    try {
      await agendaStore.removerAgendamento(id);
      notificacaoStore.sucesso('Agendamento cancelado com sucesso!');
    } catch (error) {
      notificacaoStore.erro('Erro ao cancelar agendamento.');
    }
  }
}

// Carrega os agendamentos ao montar o componente
onMounted(() => {
  agendaStore.carregarAgendamentos();
});
</script>

<style lang="scss" scoped>
.agenda-container {
  padding-left: $sidebar-width;
}

.agenda-date {
  font-size: $font-size-large;
  margin-bottom: $spacing-md;
  color: $secondary-color;
}

.date-filter {
  width: 200px;
}

.agenda-empty {
  background-color: $light-color;
  padding: $spacing-lg;
  border-radius: $border-radius;
  text-align: center;
  margin-top: $spacing-lg;
  
  p {
    font-size: $font-size-large;
    margin-bottom: $spacing-md;
  }
}

.agenda-loading {
  text-align: center;
  padding: $spacing-lg;
}

.agenda-list {
  margin-top: $spacing-md;
}

.agenda-actions {
  display: flex;
  justify-content: flex-end;
}
</style>