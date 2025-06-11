import { defineStore } from 'pinia'
import { localService } from '../services/api'

/**
 * Store para gerenciar o estado dos locais
 * Usa o Pinia para gerenciamento de estado
 */
export const useLocaisStore = defineStore('locais', {
  // Estado inicial
  state: () => ({
    locais: [],
    carregando: false,
    erro: null
  }),
  
  // Actions (métodos)
  actions: {
    /**
     * Carrega todos os locais
     */
    async carregarLocais() {
      this.carregando = true;
      this.erro = null;
      
      try {
        this.locais = await localService.getAll();
      } catch (error) {
        this.erro = 'Erro ao carregar locais: ' + error.message;
        console.error('Erro ao carregar locais:', error);
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Adiciona um novo local
     * @param {Object} local - Dados do local
     */
    async adicionarLocal(local) {
      this.carregando = true;
      this.erro = null;
      
      try {
        const novoLocal = await localService.add(local);
        this.locais.push(novoLocal);
        return novoLocal;
      } catch (error) {
        this.erro = 'Erro ao adicionar local: ' + error.message;
        console.error('Erro ao adicionar local:', error);
        throw error;
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Atualiza um local existente
     * @param {string} id - ID do local
     * @param {Object} local - Novos dados do local
     */
    async atualizarLocal(id, local) {
      this.carregando = true;
      this.erro = null;
      
      try {
        await localService.update(id, local);
        
        // Atualiza o local na lista atual
        const index = this.locais.findIndex(l => l.id === id);
        if (index !== -1) {
          this.locais[index] = { ...this.locais[index], ...local };
        }
        
        return true;
      } catch (error) {
        this.erro = 'Erro ao atualizar local: ' + error.message;
        console.error('Erro ao atualizar local:', error);
        throw error;
      } finally {
        this.carregando = false;
      }
    },
    
    /**
     * Remove um local
     * @param {string} id - ID do local
     */
    async removerLocal(id) {
      this.carregando = true;
      this.erro = null;
      
      try {
        await localService.remove(id);
        
        // Remove o local da lista atual
        const index = this.locais.findIndex(l => l.id === id);
        if (index !== -1) {
          this.locais.splice(index, 1);
        }
        
        return true;
      } catch (error) {
        this.erro = 'Erro ao remover local: ' + error.message;
        console.error('Erro ao remover local:', error);
        throw error;
      } finally {
        this.carregando = false;
      }
    }
  }
});