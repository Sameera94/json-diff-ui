<script setup lang="ts">
/**
 * JsonCompareView Component
 * 
 * Main orchestrator component for the JSON comparison feature.
 * Manages the complete workflow: input collection, validation, API calls,
 * and result display. Coordinates between child components and handles
 * all state management for the comparison process.
 */

import { JsonAPI, type Diff } from '@/api/JsonAPI';
import Card from '@/components/atoms/Card.vue';
import { JsonValidator } from '@/utils/JsonValidator';
import { ref } from 'vue';
import CompareActions from './CompareActions.vue';
import JsonComparision from './JsonComparision.vue';
import JsonInputs from './JsonInputs.vue';

const sampleJson1 = { id: 432232523, title: 'Syncio T-Shirt', description: '<p>Lorem ipsum dolor sit amet</p>', images: [ { id: 26372, position: 1, url: 'https://cu.syncio.co/images/random_image_1.png' }, { id: 23445, position: 2, url: 'https://cu.syncio.co/images/random_image_2.png' }, { id: 34566, position: 3, url: 'https://cu.syncio.co/images/random_image_3.png' }, { id: 33253, position: 4, url: 'https://cu.syncio.co/images/random_image_4.png' }, { id: 56353, position: 5, url: 'https://cu.syncio.co/images/random_image_5.png' } ], variants: [ { id: 433232, sku: 'SKU-II-10', barcode: 'BAR_CODE_230', image_id: 26372, inventory_quantity: 12, }, { id: 231544, sku: 'SKU-II-20', barcode: 'B231342313', image_id: 23445, inventory_quantity: 2, }, { id: 323245, sku: 'SKU-II-1O', barcode: 'BACDSDE_0', image_id: 34566, inventory_quantity: 8, }, { id: 323445, sku: 'SKU-II-1o', barcode: 'AR_CO23DE_23', image_id: 33253, inventory_quantity: 0, } ] }
const sampleJson2 = { id: 432232523, title: 'Syncio T-Shirt', description: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>', images: [ { id: 26372, position: 1, url: 'https://cu.syncio.co/images/random_image_1.png' }, { id: 33245, position: 2, url: 'https://cu.syncio.co/images/random_image_2.png' }, { id: 56353, position: 3, url: 'https://cu.syncio.co/images/random_image_5.png' }, { id: 33213, position: 4, url: 'https://cu.syncio.co/images/random_image_4.png' }, { id: 34546, position: 5, url: 'https://cu.syncio.co/images/random_image_16.png' }, { id: 34566, position: 3, url: 'https://cu.syncio.co/images/random_image_7.png' }, ], variants: [ { id: 433232, sku: 'SKU-II-10', barcode: 'BAR_CODE_230', image_id: 34566, inventory_quantity: 12, }, { id: 231544, sku: 'SKU-II-20', barcode: 'B231342313', image_id: 56353, inventory_quantity: 2, }, { id: 323245, sku: 'SKU-II-10', barcode: 'BACDSDE_O', image_id: 26372, inventory_quantity: 8, }, { id: 323445, sku: 'SKU-II-1о', barcode: 'AR_CO23DE_23', image_id: 33213, inventory_quantity: 0, } ] }
const jsonAPI = new JsonAPI();

// Input text state, raw string content from textareas
const firstInputText = ref(JSON.stringify(sampleJson1, null, 2));
const secondInputText = ref(JSON.stringify(sampleJson2, null, 2));

// Parsed JSON state, validated and parsed objects
const firstJson = ref();
const secondJson = ref();

// UI state
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);
const diffArray = ref<Diff[]>();

function updateFirstInputText(text: string) {
  firstInputText.value = text;
}

function updateSecondInputText(text: string) {
  secondInputText.value = text;
}

/**
 * Main comparison function that handles the entire comparison workflow
 * 1. Validates inputs
 * 2. Makes API calls to compare JSONs
 * 3. Updates results state
 * 4. Handles errors and success states
 */
async function compareJson() {
  const firstJsonValidation = JsonValidator.validateJson(firstInputText.value, 'First JSON input');
  const secondJsonValidation = JsonValidator.validateJson(secondInputText.value, 'Second JSON input');

  if (!firstJsonValidation.isValid) {
    errorMessage.value = firstJsonValidation.error || 'The first JSON input is invalid.';
    return;
  }

  if (!secondJsonValidation.isValid) {
    errorMessage.value = secondJsonValidation.error || 'The second JSON input is invalid.';
    return;
  }

  firstJson.value = firstJsonValidation.data;
  secondJson.value = secondJsonValidation.data;
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const { sessionId } = await jsonAPI.sendFirstPayload(firstJson.value ?? {});
    successMessage.value = 'First payload sent successfully.';

    // Wait 5 seconds
    setTimeout(async () => {
      try {
        const { differences } = await jsonAPI.sendSecondPayload(sessionId, secondJson.value ?? {});
        successMessage.value = 'Comparison completed successfully.';
        diffArray.value = differences;
      } catch {
        errorMessage.value = 'Failed to send second payload. Please try again.';
      }

      loading.value = false;
      successMessage.value = '';
    }, 5000);
  } catch {
    loading.value = false
    errorMessage.value = 'Failed to send first payload. Please try again.'
  } 
}
</script>

<template>
  <main class="main">
    <div class="container">
      <!-- Inputs Container -->
      <Card title="JSON Inputs">
        <JsonInputs
          :firstInputText="firstInputText"
          :secondInputText="secondInputText"
          :loading="loading"
          @updateFirstInputText="updateFirstInputText"
          @updateSecondInputText="updateSecondInputText"
        />
        <CompareActions
          :loading="loading"
          :errorMessage="errorMessage"
          :successMessage="successMessage"
          @compare="compareJson"
        />
      </Card>
      <!-- Comparison Result -->
      <Card v-if="diffArray && firstJson && secondJson && !loading" title="Comparison Result">
        <JsonComparision
          :firstJson="firstJson"
          :secondJson="secondJson"
          :diffArray="diffArray"
        />
      </Card>
    </div>
  </main>
</template>

<style scoped>
.main {
  padding-top: 6rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 768px) {
  .main {
    padding-top: 4rem;
  }

  .container {
    padding: 0.5rem;
  }
}
</style>