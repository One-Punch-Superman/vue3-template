<template>
  <svg :style="{ width: size + 'px', height: size + 'px' }">
    <use :xlink:href="'#icon-' + name" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 20
  }
});
</script>

<style lang="scss" scoped></style>
