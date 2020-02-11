<template>
  <div class="container">
    <nuxt-link
      v-for="lang in availableLocales"
      :key="lang.name"
      :to="switchLocalePath(lang.name)"
      :class="['container__lang', { 'container__lang--selected': lang.name === locale}]"
      @click.native="locale = lang.name"
    >
      <SfImage :src="`/icons/langs/${lang.name}.png`" width="20" />
    </nuxt-link>
    <SfSelect v-model="country" class="container__select">
      <SfSelectOption v-for="currentCountry in availableCountries" :key="currentCountry.name" :value="currentCountry.name">
        <div>{{ currentCountry.label }}</div>
      </SfSelectOption>
    </SfSelect>
    <SfSelect v-model="currency" class="container__select">
      <SfSelectOption v-for="currentCurrency in availableCurrencies" :key="currentCurrency.name" :value="currentCurrency.name">
        <div>{{ currentCurrency.label }}</div>
      </SfSelectOption>
    </SfSelect>
  </div>
</template>

<script>
import { SfImage, SfSelect } from '@storefront-ui/vue'
import { ref, computed, watch } from '@vue/composition-api'
import { useLocale } from '@vue-storefront/commercetools-composables'

export default {
  components: {
    SfImage,
    SfSelect
  },
  setup() {
    return useLocale()
  }
}
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;

  &__select {
    padding: 0 5px;
    font-size: 12px;

     &::v-deep .sf-select__dropdown{
      min-width: 150px;
    }
  }

  &__lang {
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;

    &:hover,
    &--selected {
      opacity: 1;
    }
  }
}

</style>
