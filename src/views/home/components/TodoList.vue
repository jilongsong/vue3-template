<template>
  <div class="calendar">
    <div v-for="(todo, i) in todoList" :key="todo.text" :class="['day-and-activity', 'activity-' + ((i + 1) % 4)]">
      <div class="day">
        <h1>{{ todo.day }}</h1>
        <p>{{ todo.month }}</p>
      </div>
      <div class="activity">
        <h2>{{ todo.text }}</h2>
      </div>
      <button class="btn" @click="solvedItem(i)">solved</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  todoList: any[];
}>();

const emit = defineEmits<(event: 'solved-item', data: number) => void>();
const solvedItem = (index: number) => {
  emit('solved-item', index);
};
</script>

<style scoped lang="scss">
.calendar {
  margin-top: 10px;
  height: 320px;
  overflow-y: scroll;
  -webkit-scrollbar: none;
  scrollbar-width: none;
}

.day-and-activity {
  display: grid;
  grid-template-columns: 15% 60% 25%;
  align-items: center;
  border-radius: 14px;
  margin-bottom: 8px;
  padding: 8px;
  color: #484d53;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px;
  h2 {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.activity-0 {
  background-color: rgb(124, 136, 224, 0.5);
  background-image: linear-gradient(240deg, rgb(124, 136, 224) 0%, #c3f4fc 100%);
}

.activity-1 {
  background-color: #aee2a4a1;
  background-image: linear-gradient(240deg, #e5a243ab 0%, #f7f7aa 90%);
}

.activity-2 {
  background-color: #ecfcc376;
  background-image: linear-gradient(240deg, #97e7d1 0%, #ecfcc3 100%);
}

.activity-3 {
  background-color: #e6a7c3b5;
  background-image: linear-gradient(240deg, #fc8ebe 0%, #fce5c3 100%);
}

.day {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day h1 {
  font-size: 1.6rem;
  font-weight: 600;
}

.day p {
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 600;
  transform: translateY(-3px);
}

.activity {
  border-left: 3px solid #484d53;
}

.activity h2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.participants {
  display: flex;
  margin-left: 20px;
}

.participants img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  z-index: calc(2 * var(--i));
  margin-left: -10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px;
}

.activity h2 {
  margin-left: 10px;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 12px;
}

.btn {
  display: block;
  padding: 8px 24px;
  margin: 10px auto;
  font-size: 1.1rem;
  font-weight: 500;
  outline: none;
  text-decoration: none;
  color: #484b57;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  cursor: pointer;
}

.btn:hover,
.btn:focus,
.btn:active,
.btn:visited {
  transition-timing-function: cubic-bezier(0.6, 4, 0.3, 0.8);
  animation: gelatine 0.5s 1;
}

@keyframes gelatine {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
</style>
