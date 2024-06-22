<template>
  <div ref="el" :class="['board-card', `card-bg-${i}`]" draggable="true" :style="style" style="position: fixed">
    <img class="dz" src="../../../assets/dz.png" />
    <textarea class="text" :value="card.text" />
  </div>
</template>

<script setup lang="ts">
import { useDraggable } from '@vueuse/core';
const el = ref<HTMLElement | null>(null);
const props = defineProps<{
  card: Record<string, any>;
  i: number;
}>();

const { style } = useDraggable(el, {
  initialValue: { x: props.card.position.x, y: props.card.position.y },
});
</script>

<style lang="scss" scoped>
.board-card {
  margin: 20px;
  width: 240px;
  height: 200px;
  background-color: green;
  border-radius: 4px;
  position: absolute;
  transform: rotate(-2deg);
  box-shadow: 0 0 1em #e5e5e5;
  &:hover {
    z-index: 999;
  }
  .dz {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 50%;
    top: -8px;
    cursor: move;
  }
  .text {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: 0;
    padding: 20px;
    font-weight: bold;
    font-family: 'sans-serif';
  }
}
.card-bg-1 {
  background-color: green;
}
.card-bg-2 {
  background-color: orange;
}

.card-bg-3 {
  background-color: rgb(25, 140, 248);
}

.card-bg-4 {
  background-color: rgb(216, 69, 196);
}
</style>
