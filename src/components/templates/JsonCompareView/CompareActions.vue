<script setup lang="ts">
/**
 * CompareActions Component
 * 
 * Provides the action button to trigger JSON comparison and displays
 * status messages (success/error) from the comparison operation.
 */

import Button from '@/components/atoms/Button.vue';

defineProps({
  loading: { type: Boolean, required: true },
  errorMessage: { type: String, required: false },
  successMessage: { type: String, required: false }
})

defineEmits<{
  (e: 'compare'): void
}>()
</script>

<template>
  <div class="actions-container">
    <Button 
      :title="loading ? 'Comparing...' : 'Compare JSON'"
      :disabled="loading"
      :loading="loading"
      @click="$emit('compare')"
    />
    <div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.actions-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
}

.error-message {
  color: #ff4d4f;
}

.success-message {
  color: #46a815;
}

@media (max-width: 768px) {
  .actions-container {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

</style>