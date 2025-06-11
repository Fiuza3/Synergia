import { defineStore } from 'pinia'

/**
 * Store para gerenciar o estado das notificações
 * Usa o Pinia para gerenciamento de estado
 */
export const useNotificacaoStore = defineStore('notificacao', {
  // Estado inicial
  state: () => ({
    mensagem: '',
    tipo: '', // 'success', 'error', 'warning', 'info'
    visivel: false,
    timeout: null
  }),
  
  // Actions (métodos)
  actions: {
    /**
     * Mostra uma notificação
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {string} tipo - Tipo da notificação (success, error, warning, info)
     * @param {number} duracao - Duração em milissegundos (padrão: 3000ms)
     */
    mostrar(mensagem, tipo = 'info', duracao = 3000) {
      // Limpa o timeout anterior se existir
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      
      // Define a nova notificação
      this.mensagem = mensagem;
      this.tipo = tipo;
      this.visivel = true;
      
      // Define o timeout para esconder a notificação
      this.timeout = setTimeout(() => {
        this.esconder();
      }, duracao);
    },
    
    /**
     * Esconde a notificação atual
     */
    esconder() {
      this.visivel = false;
    },
    
    /**
     * Atalho para mostrar notificação de sucesso
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {number} duracao - Duração em milissegundos (padrão: 3000ms)
     */
    sucesso(mensagem, duracao = 3000) {
      this.mostrar(mensagem, 'success', duracao);
    },
    
    /**
     * Atalho para mostrar notificação de erro
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {number} duracao - Duração em milissegundos (padrão: 3000ms)
     */
    erro(mensagem, duracao = 3000) {
      this.mostrar(mensagem, 'error', duracao);
    },
    
    /**
     * Atalho para mostrar notificação de aviso
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {number} duracao - Duração em milissegundos (padrão: 3000ms)
     */
    aviso(mensagem, duracao = 3000) {
      this.mostrar(mensagem, 'warning', duracao);
    },
    
    /**
     * Atalho para mostrar notificação informativa
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {number} duracao - Duração em milissegundos (padrão: 3000ms)
     */
    info(mensagem, duracao = 3000) {
      this.mostrar(mensagem, 'info', duracao);
    }
  }
});