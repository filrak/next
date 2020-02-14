<template>
  <SfSection v-if="product" :title-heading="title" class="section">
    <SfCarousel class="product-carousel">
      <SfCarouselItem v-for="(product, i) in displayProducts" :key="i">
        <SfProductCard
          :title="product.title"
          :image="product.image"
          :regular-price="product.price.regular"
          :max-rating="product.rating.max"
          :score-rating="product.rating.score"
          :is-on-wishlist="product.isOnWishlist"
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
    // const category = computed(() => product ? getProductCategories(product)[0] : null)
    const category = '6a8ee00e-2d72-4605-8b25-f059fd1eaeba'
    const { products, search, loading, error } = useProduct();

    watch(category, () => {
      if (category) {
        search({ catIds: [category] });
      }
    })
    
    const displayProducts = computed(() => getProductVariants(products.value, { master: true }))

    return {
      displayProducts,
      search,
      loading,
      error,
      getProductSlug,
    }
  },

};
</script>