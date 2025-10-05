<script setup lang="ts">
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 6 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  helperText: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'updateValue', value: string): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('updateValue', target.value)
}
</script>

<template>
  <div class="textarea-field">
    <textarea
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
    ></textarea>
    <p v-if="helperText" class="helper">{{ helperText }}</p>
  </div>
</template>

<style scoped>
.textarea-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

textarea:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.helper {
  color: red;
  font-size: 0.875rem;
  margin: 0;
}
</style>