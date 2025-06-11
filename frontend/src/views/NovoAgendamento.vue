<template>
  <div class="novo-agendamento-container">
    <div class="section">
      <h1 class="section-title">Novo Agendamento</h1>
      
      <div class="card">
        <form @submit.prevent="salvarAgendamento" class="form-grid">
          <!-- Nome do paciente -->
          <div class="form-group">
            <label for="nome">Nome do paciente</label>
            <input 
              type="text" 
              id="nome" 
              v-model="agendamento.nome" 
              class="form-control" 
              required
              placeholder="Digite o nome completo"
            >
          </div>
          
          <!-- Telefone -->
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input 
              type="tel" 
              id="telefone" 
              v-model="agendamento.telefone" 
              class="form-control" 
              required
              placeholder="(00) 00000-0000"
            >
          </div>
          
          <!-- Evento -->
          <div class="form-group">
            <label for="evento">Evento</label>
            <select 
              id="evento" 
              v-model="agendamento.evento" 
              class="form-control" 
              required
            >
              <option value="" disabled>Selecione o tipo de evento</option>
              <option value="Consulta">Consulta</option>
              <option value="Reunião">Reunião</option>
              <option value="Cirurgia">Cirurgia</option>
            </select>
          </div>
          
          <!-- Local -->
          <div class="form-group">
            <label for="local">Local</label>
            <div class="local-input">
              <input 
                type="text" 
                id="local" 
                v-model="agendamento.local" 
                class="form-control" 
                required
                placeholder="Digite ou selecione o local"
                list="locais-list"
              >
              <datalist id="locais-list">
                <option v-for="local in locaisStore.locais" :key="local.id" :value="local.nome"></option>
              </datalist>
            </div>
          </div>
          
          <!-- Data -->
          <div class="form-group">
            <label for="data">Data</label>
            <input 
              type="date" 
              id="data" 
              v-model="agendamento.data" 
              class="form-control" 
              required
            >
          </div>
          
          <!-- Horário -->
          <div class="form-group">
            <label for="horario">Horário</label>
            <input 
              type="time" 
              id="horario" 
              v-model="agendamento.horario" 
              class="form-control" 
              required
            >
          </div>
          
          <!-- Observações -->
          <div class="form-group full-width">
            <label for="observacoes">Observações (opcional)</label>
            <textarea 
              id="observacoes" 
              v-model="agendamento.observacoes" 
              class="form-control" 
              placeholder="Digite informações adicionais se necessário"
            ></textarea>
          </div>
          
          <!-- Botões de ação -->
          <div class="form-actions full-width">
            <button type="button" @click="limparFormulario" class="btn btn-secondary">
              Limpar
            </button>
            <button type="submit" class="btn btn-primary btn-large">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAgendaStore } from '../store/agenda';
import { useLocaisStore } from '../store/locais';
import { useNotificacaoStore } from '../store/notificacao';

// Obtém os stores necessários
const agendaStore = useAgendaStore();
const locaisStore = useLocaisStore();
const notificacaoStore = useNotificacaoStore();
const router = useRouter();

// Dados do agendamento
const agendamento = reactive({
  nome: '',
  telefone: '',
  evento: '',
  local: '',
  data: new Date().toISOString().split('T')[0], // Data atual como padrão
  horario: '',
  observacoes: ''
});

/**
 * Salva o novo agendamento
 */
async function salvarAgendamento() {
  try {
    // Valida os campos obrigatórios
    if (!agendamento.nome || !agendamento.telefone || !agendamento.evento || 
        !agendamento.local || !agendamento.data || !agendamento.horario) {
      notificacaoStore.erro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Adiciona o agendamento
    await agendaStore.adicionarAgendamento({...agendamento});
    
    // Exibe mensagem de sucesso
    notificacaoStore.sucesso('Agendamento realizado com sucesso!');
    
    // Redireciona para a agenda
    router.push('/agenda');
  } catch (error) {
    notificacaoStore.erro('Erro ao salvar agendamento.');
    console.error('Erro ao salvar agendamento:', error);
  }
}

/**
 * Limpa o formulário
 */
function limparFormulario() {
  agendamento.nome = '';
  agendamento.telefone = '';
  agendamento.evento = '';
  agendamento.local = '';
  agendamento.data = new Date().toISOString().split('T')[0];
  agendamento.horario = '';
  agendamento.observacoes = '';
}

// Carrega os locais ao montar o componente
onMounted(() => {
  locaisStore.carregarLocais();
});
</script>

<style lang="scss" scoped>
.novo-agendamento-container {
  padding-left: $sidebar-width;
}

.local-input {
  position: relative;
}
</style>