<script setup lang="ts">
import AppHeader from './components/molecules/AppHeader.vue';
import JsonCompareView from './components/templates/JsonCompareView/JsonCompareView.vue';
</script>

<template>
  <AppHeader />
  <JsonCompareView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
</style>