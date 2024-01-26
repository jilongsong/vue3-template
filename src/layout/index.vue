<template>
  <div style="width: 100%; height: 100vh; margin: auto">
    <h1>{{ homered }}</h1>
    <div><el-button type="primary" size="large" @click="homered = 'hello! my baby'">点击这里</el-button></div>
  </div>
</template>

<script setup lang="ts">
const homered = ref('');
</script>

<style scoped lang="scss"></style>
