<template>
  <div class="container">
    <button @click="callBapi">HELLO</button>
    <div>{{ product }}</div>
  </div>
</template>

<script lang="ts">
import { setup, getProduct } from '@vue-storefront/about-you-api';
setup();

export default {
  data: () => ({
    product: null
  }),

  methods: {
    async callBapi() {
      const product = await getProduct({ id: 3769861 });
      this.product = product;
      return 'foo';
    }
  }
};
</script>

<style>
</style>
