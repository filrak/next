<template>
  <div class="container">
    <nuxt-link
      v-for="lang in availableLocales"
      :key="lang"
      :to="switchLocalePath(lang)"
      :class="['container__lang', { 'container__lang--selected': lang === locale}]"
      @click.native="lang = locale"
    >
      <SfImage :src="`/icons/langs/${lang}.png`" width="20" />
    </nuxt-link>
    <SfSelect v-model="country" class="container__select">
      <SfSelectOption v-for="currentCountry in availableCountries" :key="currentCountry" :value="currentCountry">
        <div>{{ currentCountry }}</div>
      </SfSelectOption>
    </SfSelect>
    <SfSelect v-model="currency" class="container__select">
      <SfSelectOption v-for="currentCurrency in availableCurrencies" :key="currentCurrency" :value="currentCurrency">
        <div>{{ currentCurrency }}</div>
      </SfSelectOption>
    </SfSelect>
  </div>
</template>

<script>
import { SfImage, SfSelect } from '@storefront-ui/vue'
import { ref, computed, watch } from '@vue/composition-api'
import { useLocales } from '@vue-storefront/commercetools-composables'

export default {
  components: {
    SfImage,
    SfSelect
  },
  setup(props, context) {
    const {
      availableLocales,
      locale,
      availableCountries,
      country,
      availableCurrencies,
      currency
    } = useLocales(context)

    return {
      availableLocales,
      locale,
      availableCountries,
      country,
      availableCurrencies,
      currency
    }
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

     &::v-deep .sf-select__dropdown{
      min-width: 100px;
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
