<template>
  <SfSection v-if="displayProducts.length > 0" :title-heading="title" class="section">
    <SfCarousel class="product-carousel">
      <SfCarouselItem v-for="(product, i) in displayProducts" :key="i">
        <SfProductCard
          :title="getProductName(product)"
          :image="getProductGallery(product)[0].normal"
          :regular-price="getProductPrice(product)"
          :link="`/p/${getProductSlug(product)}`"
          class="product-card"
        />
      </SfCarouselItem>
    </SfCarousel>
  </SfSection>
</template>

<script>
import { computed, watch } from '@vue/composition-api';

import {
  SfCarousel,
  SfProductCard,
  SfSection,
} from '@storefront-ui/vue'

import { useProduct } from '<%= options.composables %>';
import {
  getProductCategories,
  getProductVariants,
  getProductSlug,
  getProductName,
  getProductGallery,
  getProductPrice
} from '<%= options.helpers %>';

export default {
  name: 'RelatedProducts',

  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
  },

  props: {
    title: String,
    product: Object,
  },

  setup({ product }) {
    const { products, search, loading, error } = useProduct();
    const categories = computed(() => product ? getProductCategories(product) : [])
    const displayProducts = computed(() => getProductVariants(products.value, { masters: true }))

    watch(categories, () => {
      if (categories.value.length > 0) {
        search({ catIds: [categories.value[0]] })
      }
    })

    return {
      displayProducts,
      search,
      loading,
      error,
      getProductSlug,
      getProductName,
      getProductGallery,
      getProductPrice
    }
  }
};
</script>
