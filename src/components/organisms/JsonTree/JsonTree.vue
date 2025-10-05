<script setup lang="ts">
/**
 * JsonTree Component
 * 
 * A tree-view component that renders JSON data in an expandable/collapsible format.
 * Highlights differences between two JSON objects by applying visual styles to changed nodes.
 * This is the root component that initiates the recursive rendering of JSON nodes.
 */

import type { Diff } from '@/api/JsonAPI';
import JsonNode from './JsonNode.vue';

defineProps({
  jsonData: {
    type: [Object, Array],
    required: true
  },
  diffs: {
    type: Array<Diff>,
    default: () => []
  },
  side: {
    type: String,
    default: 'value1'
  }
})
</script>

<template>
  <div class="json-tree">
    <JsonNode :data="jsonData" :diffs="diffs" :side="side" />
  </div>
</template>

<style scoped>
.json-tree {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre; */
}
</style>