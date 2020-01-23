<template>
  <div>thank you page</div>
</template>

<script>
export default {
  setup(props, context) {
    context.emit('changeStep', 4)
  }
}
</script>
