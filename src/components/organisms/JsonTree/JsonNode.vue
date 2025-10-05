<script setup lang="ts">
/**
 * JsonNode Component
 * 
 * A recursive component that renders individual nodes in a JSON tree structure.
 * Handles all JSON data types (objects, arrays, primitives, null) and applies
 * visual highlighting for differences between two JSON objects.
 * Each node can be expanded/collapsed and shows appropriate styling based on diffs.
 */

import type { Diff } from '@/api/JsonAPI'
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: [Object, Array, String, Number, Boolean, null],
    required: true
  },
  displayKey: {
    type: [String, Number],
    default: ''
  },
  depth: {
    type: Number,
    default: 0
  },
  diffs: {
    type: Array<Diff>,
    default: () => []
  },
  side: {
    type: String,
    default: 'value1'
  },
  path: {
    type: String,
    default: ''
  }
})

const expanded = ref(true)
const toggle = () => (expanded.value = !expanded.value)
const isObject = computed(() => typeof props.data === 'object' && props.data !== null)
const isArray = computed(() => Array.isArray(props.data))

/**
 * Formats primitive values for display in the JSON tree
 * Handles proper string quoting and null representation to match JSON format
 * 
 * @returns {string|number|boolean|null} Formatted value ready for display
 */
const formattedValue = computed(() => {
  if (typeof props.data === 'string') return `"${props.data}"`
  if (props.data === null) return 'null'
  return props.data
})

/**
 * Builds the complete path string for a child node in the JSON structure
 * Creates dot notation for object properties and bracket notation for arrays
 * This path is used for diff matching and highlighting functionality
 * 
 * Examples:
 * - Object property: "user.name" 
 * - Array element: "items[0]"
 * - Nested: "user.addresses[0].city"
 * 
 * @param {string|number} key - The property name (for objects) or index (for arrays)
 * @returns {string} Complete path from root to this child node
 */
const computedPath = (key: string | number) => {
  if (isArray.value) return `${props.path}[${key}]`
  if (props.path) return `${props.path}.${key}`
  return key.toString()
}

/**
 * Determines if this node has differences and should be highlighted
 * Checks both exact path matches and nested path matches for highlighting
 *
 * @returns {boolean} True if this node should be highlighted
 */
const isDiff = computed(() =>
  props.diffs.some(
    (d: Diff) => {
      // Exact match
      if (d.path === props.path && d[props.side as keyof Diff] !== undefined) {
        return true
      }
      
      // Check if current path is nested under a diff path
      if ((props.path.startsWith(d.path + '.') || props.path.startsWith(d.path + '[')) 
          && d[props.side as keyof Diff] !== undefined) {
        return true
      }
      
      return false
    }
  )
)
</script>

<template>
  <div class="json-node">
    <!-- Check if Object or Array -->
    <template v-if="isObject">
      <div class="key-line" @click="toggle">
        <span class="caret">{{ expanded ? '▼' : '▶' }}</span>
        <span class="key" v-if="displayKey">{{ displayKey }}</span>
        <span v-if="displayKey">: </span>
        {{ isArray ? expanded ? '[' : '[...]' : expanded ? '{' : '{...}' }}
      </div>

      <div v-if="expanded" class="children">
        <JsonNode
          v-for="(value, key) in data"
          :key="key"
          :data="value"
          :display-key="isArray ? '' : key"
          :depth="depth + 1"
          :diffs="diffs"
          :side="side"
          :path="computedPath(key)"
        />
      </div>

      <div v-if="expanded" class="closing">
        {{ isArray ? '&nbsp;]' : '&nbsp;}' }}
      </div>
    </template>

    <!-- Primitive values -->
    <template v-else>
      <div class="key-line">
        <span v-if="displayKey" class="key">{{ displayKey }}</span>
        <span v-if="displayKey">: </span>
        <span class="value" :class="{ highlight: isDiff }">{{ formattedValue }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.json-node {
  margin-left: 1em;
}

.key-line {
  cursor: pointer;
}

.key {
  color: #1a73e8;
}

.value {
  color: #6b7280;
}

.caret {
  color: black;
  margin-right: 0.3em;
}

.children {
  margin-left: 4px;
  border-left: 1px dashed #ccc;
  padding-left: 0.5em;
}

.value.highlight {
  background: rgba(255, 255, 0, 0.69);
  color: #222;
  border-radius: 3px;
  padding: 0 2px;
}
</style>

