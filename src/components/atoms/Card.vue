<template>
  <div class="card">
    <div v-if="title" class="card-header">
      <h2 class="card-title">{{ title }}</h2>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { 
    type: String, 
    default: '' 
  }
})
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  overflow: hidden;
}

.card-header {
  padding: 1.5rem 2rem 0 2rem;
  border-bottom: 1px solid #f1f5f9;
}

.card-title {
  margin: 0 0 1rem 0;
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.card-content {
  padding: 2rem;
}

.card:not(:has(.card-header)) .card-content {
  padding-top: 2rem;
}

@media (max-width: 768px) {
  .card-header {
    padding: 1rem 1.5rem 0 1.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card:not(:has(.card-header)) .card-content {
    padding-top: 1.5rem;
  }
}
</style>