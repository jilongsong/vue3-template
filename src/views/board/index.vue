<template>
  <div class="board-page">
    <div class="container">
      <ul class="circles">
        <li v-for="li in 10" :key="li"></li>
      </ul>
      <BoardCard v-for="(item, index) in cardList" :key="index" :card="item" :i="index + 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BoardCard from './components/BoardCard.vue';

const cardList = ref([
  {
    text: '这是一个标签1，可以进行编辑',
    position: {
      x: 300,
      y: 50,
    },
  },
  {
    text: '这是一个标签2，可以进行编辑',
    position: {
      x: 600,
      y: 50,
    },
  },
  {
    text: '这是一个标签2，可以进行编辑',
    position: {
      x: 300,
      y: 300,
    },
  },
  {
    text: '这是一个标签2，可以进行编辑',
    position: {
      x: 600,
      y: 300,
    },
  },
]);
</script>

<style lang="scss" scoped>
.board-page {
  width: 100%;
  height: 100%;
  padding: 20px;
  .container {
    position: relative;
    overflow: hidden;
    background-color: #101010e3;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background-color: #b81cdd;
  animation: animate 25s linear infinite;
  bottom: -120px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
