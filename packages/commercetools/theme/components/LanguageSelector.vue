<template>
  <div class="lang-selector">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale"
      :to="switchLocalePath(locale)"
      :class="['lang-selector__item', { 'lang-selector__item--selected': locale === currentLocale}]"
      @click.native="currentLocale = locale"
    >
      <SfImage :src="`/icons/langs/${locale}.png`" width="20" />
    </nuxt-link>
  </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue'
import { ref, computed, watch } from '@vue/composition-api'

export default {
  components: {
    SfImage,
  },
  setup(props, context) {
    const { availableLocales, locale } = context.root.$i18n
    const currentLocale = ref(locale)

    return { availableLocales, currentLocale }
  }
}
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

.lang-selector {
  margin: 0 -5px;
  display: flex;

  &__item {
    padding: 0 5px;
    display: block;
    opacity: 0.5;

    &:hover,
    &--selected {
      opacity: 1;
    }
  }
}

</style>
