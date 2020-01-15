<template>
  <div>
    {{blocks.length}}
    <prismic-block :key="block.key" v-for="block in blocks" :block="block" />
  </div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api'
import { transformPrismicResponse } from '@vue-storefront/commercetools-composables/src/helpers/internals'
import PrismicBlock from './PrismicBlock'

export default {
  components: {
    PrismicBlock
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  setup({ type, uid }, context) {
    const { $prismic } = context.root.context
    const blocks = reactive([])

    $prismic.api.getByUID(type, uid)
      .then(({ data }) => {
        transformPrismicResponse(data).forEach((element, key) => {
          blocks.push({ key, ...element })
        })
      })

    return {
      blocks
    }
  },

}
</script>