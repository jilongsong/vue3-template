<template>
  <div class="calendar">
    <div v-for="i in 4" :key="i" :class="['day-and-activity', 'activity-' + i]">
      <div class="day">
        <h1>13</h1>
        <p>mon</p>
      </div>
      <div class="activity">
        <h2>Swimming</h2>
        <div class="participants">
          <img
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c61daa1c-5881-43f8-a50f-62be3d235daf"
            style="--i: 1"
            alt=""
          />
          <img
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/90affa88-8da0-40c8-abe7-f77ea355a9de"
            style="--i: 2"
            alt=""
          />
          <img
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/07d4fa6f-6559-4874-b912-3968fdfe4e5e"
            style="--i: 3"
            alt=""
          />
          <img
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e082b965-bb88-4192-bce6-0eb8b0bf8e68"
            style="--i: 4"
            alt=""
          />
        </div>
      </div>
      <button class="btn">已完成</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.calendar {
  margin-top: 10px;
  overflow-y: scroll;
}
.calendar ::-webkit-scrollbar {
  width: 0 !important;
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
}

.activity-1 {
  background-color: rgb(124, 136, 224, 0.5);
  background-image: linear-gradient(240deg, rgb(124, 136, 224) 0%, #c3f4fc 100%);
}

.activity-2 {
  background-color: #aee2a4a1;
  background-image: linear-gradient(240deg, #e5a243ab 0%, #f7f7aa 90%);
}

.activity-3 {
  background-color: #ecfcc376;
  background-image: linear-gradient(240deg, #97e7d1 0%, #ecfcc3 100%);
}

.activity-4 {
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
