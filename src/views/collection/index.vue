<template>
  <div class="collectin-page">
    <MargicCard />
    <div class="container"></div>
  </div>
</template>

<script setup lang="ts">
import MargicCard from './components/MargicCard.vue';
</script>

<style lang="scss" scoped>
.collectin-page {
  width: 100%;
  height: 100%;
  padding: 20px;
  .container {
    background-color: #101010e3;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}
.video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 400px;
}
</style>
