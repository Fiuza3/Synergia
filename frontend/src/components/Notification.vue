<template>
  <Transition name="fade">
    <div v-if="notificacao.visivel" :class="['notification', notificacao.tipo]">
      {{ notificacao.mensagem }}
    </div>
  </Transition>
</template>

<script setup>
import { useNotificacaoStore } from '../store/notificacao';
import { storeToRefs } from 'pinia';

// Obtém o store de notificações
const notificacaoStore = useNotificacaoStore();

// Usa storeToRefs para manter a reatividade ao desestruturar o store
const notificacao = storeToRefs(notificacaoStore);
</script>

<style lang="scss" scoped>
/* Animações para a notificação */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>