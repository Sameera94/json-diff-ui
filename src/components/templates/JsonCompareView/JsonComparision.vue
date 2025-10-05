<script setup lang="ts">
/**
 * JsonComparision Component
 * 
 * Displays the side-by-side comparison results of two JSON objects.
 * Shows both JSON trees with visual highlighting of differences.
 * Provides summary and handles empty/error states.
 */

import type { Diff } from '@/api/JsonAPI';
import JsonTree from '@/components/organisms/JsonTree/JsonTree.vue';

defineProps({
  diffArray: { type: Array<Diff>, default: null },
  firstJson: { type: Object, required: true },
  secondJson: { type: Object, required: true }
})
</script>

<template>
  <div class="json-compare-container">
    <JsonTree :jsonData="firstJson" :diffs="diffArray" side="value1" />
    <JsonTree :jsonData="secondJson" :diffs="diffArray" side="value2" />
  </div>
</template>


<style scoped>
.json-compare-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
  overflow-x: auto;
}

.json-compare-container > * {
  flex: 1 1 0;
  min-width: 0;
  max-width: 50%;
  max-height: 80vh;
  overflow: auto;
  border: 1px solid #eee;
  padding: 1rem;
  box-sizing: border-box;
}


@media (max-width: 768px) {
  .json-compare-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .json-compare-container > * {
    max-width: 100%;
    max-height: 45vh;
    min-height: 250px;
  }
}
</style>