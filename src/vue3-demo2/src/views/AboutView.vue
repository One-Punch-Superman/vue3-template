<template>
  <div class="">{{ str }}</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const str = ref("about");
onMounted(() => {});
</script>

<style scoped></style>
