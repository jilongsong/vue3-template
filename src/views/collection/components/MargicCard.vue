<template>
  <div class="margic-card">
    <Swiper class="swiper" :grab-cursor="true" :modules="modules" :effect="'cards'" @slide-change="selectSwiper">
      <SwiperSlide
        v-for="(swiper, index) in swiperOptions"
        :key="index"
        class="swiper-slide"
        @touch-start="selectSwiper"
      >
        <span>{{ swiper.rate }}</span>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref } from 'vue';
// @ts-ignore
import { EffectCards } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/effect-cards';

const modules: Array<any> = [EffectCards];

const swiperOptions = ref([
  {
    rate: 'Sing',
    name: '个人介绍',
    route: '/layout',
  },
  {
    rate: 'Dance',
    route: '/layout',
  },
  {
    rate: 'Running',
    name: '个人签名',
    route: '/layout',
  },
  {
    rate: 'Cycling',
    name: '个人签名',
    route: '/layout',
  },
  {
    rate: 'Yoga',
    name: '个人签名',
    route: '/layout',
  },
  {
    rate: 'Swimming',
    name: '个人签名',
    route: '/layout',
  },
]);
const currentRouteIndex = ref<number>(0);

const selectSwiper = (swiper: any) => {
  currentRouteIndex.value = swiper.activeIndex;
};
</script>

<style lang="scss" scoped>
.margic-card {
  position: absolute;
  right: 100px;
  top: 20px;
}

/* SWIPER */

.swiper {
  width: 250px;
  height: 450px;
  padding: 50px 0;
}

.swiper-slide {
  position: relative;
  box-shadow: 0 0 1em #747474;
  border-radius: 10px;
}

.swiper-slide span {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  padding: 7px 18px;
  margin: 10px;
  border-radius: 20px;
  letter-spacing: 2px;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.095);
  box-shadow: inset 2.01px -2.01px 20px rgba(214, 214, 214, 0.17),
    inset -3.01333px 3.01333px 3.01333px rgba(255, 255, 255, 0.39);
  backdrop-filter: blur(74px);
}

.swiper-slide h2 {
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.4;
  margin: 0 0 20px 20px;
}

.swiper-slide:nth-child(1n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/08.jpeg') no-repeat 50% 50% / cover;
}

.swiper-slide:nth-child(2n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/02.jpg') no-repeat 50% 50% / cover;
}

.swiper-slide:nth-child(3n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/06.jpeg') no-repeat 50% 0% / cover;
}

.swiper-slide:nth-child(4n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/03.jpeg') no-repeat 50% 50% / cover;
}

.swiper-slide:nth-child(5n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/07.jpg') no-repeat 50% 50% / cover;
}

.swiper-slide:nth-child(6n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/01.jpg') no-repeat 50% 50% / cover;
}

.swiper-slide:nth-child(7n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/images/back-card-1.jpeg') no-repeat 50% 50% / cover;
}

.swiper-slide:nth-child(8n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/images/back-card-1.jpeg') no-repeat 50% 0% / cover;
}

.swiper-slide:nth-child(9n) {
  background: linear-gradient(to top, #0f2027, #203a4300, #2c536400),
    url('../../../assets/images/back-card-1.jpeg') no-repeat 50% 50% / cover;
}
</style>
