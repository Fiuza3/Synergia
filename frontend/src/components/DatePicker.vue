<template>
  <div class="date-picker">
    <label v-if="label" :for="id" class="date-picker-label">{{ label }}</label>
    <div class="date-picker-input">
      <input
        :id="id"
        type="date"
        class="form-control"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :min="min"
        :max="max"
        :required="required"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define as propriedades do componente
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `date-${Math.random().toString(36).substring(2, 9)}`
  },
  min: {
    type: String,
    default: ''
  },
  max: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
});

// Define os eventos emitidos pelo componente
const emit = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.date-picker {
  &-label {
    display: block;
    margin-bottom: $spacing-xs;
    font-weight: bold;
  }
  
  &-input {
    position: relative;
    
    input[type="date"] {
      width: 100%;
      padding: $spacing-sm;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      font-size: $font-size-base;
      
      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
      }
    }
  }
}
</style>