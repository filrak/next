<template>
  <div>
    <prismic-block :key="block.key" v-for="block in blocks" :block="block.element" />
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import PrismicBlock from '@vue-storefront/prismic/components/PrismicBlock'

export default {
  components: {
    PrismicBlock
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup({ data }) {
    const blocks = reactive([])

    Object.values(data).forEach((element, key) => {
      blocks.push({ key, element })
    })

    return {
      blocks
    }
  }
}
</script>