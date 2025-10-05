<script setup lang="ts">
/**
 * JsonInputs Component
 * 
 * Provides two side-by-side textarea inputs for entering JSON data to be compared.
 * Handles user input validation, loading states, and emits changes to parent component.
 * Also captures the raw JSON input from users.
 */
import Textarea from '@/components/atoms/Textarea.vue';

defineProps({
  firstInputText: { type: String, required: true },
  secondInputText: { type: String, required: true },
  loading: { type: Boolean, required: false, default: false }
})

defineEmits<{
  (e: 'updateFirstInputText', value: string): void
  (e: 'updateSecondInputText', value: string): void
}>()
</script>

<template>
  <div class="inputs-container">
    <div class="input">
      <Textarea
        :modelValue="firstInputText"
        :disabled="loading"
        :rows="10"
        placeholder="Paste first JSON here"
        @updateValue="$emit('updateFirstInputText', $event)"
      />
    </div>
    <div class="input">
      <Textarea
        :modelValue="secondInputText"
        :disabled="loading"
        :rows="10"
        placeholder="Paste second JSON here"
        @updateValue="$emit('updateSecondInputText', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.inputs-container {
  display: flex;
  gap: 2rem;
}

.input {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .inputs-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .input-group {
    flex: none;
  }
}
</style>