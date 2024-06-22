<template>
  <div class="layout-container">
    <main>
      <nav class="main-menu">
        <h1>Work Space</h1>
        <img
          class="logo"
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4cfdcb5a-0137-4457-8be1-6e7bd1f29ebb"
          alt=""
        />
        <ul>
          <li
            v-for="(menu, index) in menus"
            :key="index"
            :class="['nav-item', activeMenu === menu.path ? 'active' : '']"
            @click="selectMenu(menu.path)"
          >
            <b></b>
            <b></b>
            <div class="link">
              <i class="fa fa-house nav-icon"></i>
              <span class="nav-text">{{ menu.title }}</span>
            </div>
          </li>
        </ul>
      </nav>

      <section class="content">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const menus = [
  {
    title: 'Homepage',
    path: '/home',
  },
  {
    title: 'Collect',
    path: '/collection',
  },
  {
    title: 'Board',
    path: '/board',
  },
];

const activeMenu = ref(router.currentRoute.value.path);

const selectMenu = (path: string) => {
  activeMenu.value = path;
  router.push(path);
};
</script>

<style scoped lang="scss">
.layout-container {
  font-family: 'Nunito', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
}

nav ul,
nav ul li {
  outline: 0;
}

nav ul li a {
  text-decoration: none;
}

main {
  display: grid;
  grid-template-columns: 13% 87%;
  width: 100%;
  height: 100%;
  margin: 10px;
  background: rgb(254, 254, 254);
  box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset, 0 1px 0 0 rgba(255, 255, 255, 0.66) inset,
    0 4px 16px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  z-index: 10;
}

.main-menu {
  overflow: hidden;
  background: rgb(73, 57, 113);
  padding-top: 10px;
  border-radius: 15px 0 0 15px;
  font-family: 'Roboto', sans-serif;
}

.main-menu h1 {
  display: block;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin: 20px 0 30px;
  color: #fff;
  font-family: 'Nunito', sans-serif;
}

.logo {
  display: none;
}

.nav-item {
  position: relative;
  display: block;
}

.nav-item .link {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  padding: 15px 0;
  margin-left: 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.nav-item b:nth-child(1) {
  position: absolute;
  top: -15px;
  height: 15px;
  width: 100%;
  background: #fff;
  display: none;
}

.nav-item b:nth-child(1)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 20px;
  background: rgb(73, 57, 113);
}

.nav-item b:nth-child(2) {
  position: absolute;
  bottom: -15px;
  height: 15px;
  width: 100%;
  background: #fff;
  display: none;
}

.nav-item b:nth-child(2)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-right-radius: 20px;
  background: rgb(73, 57, 113);
}

.nav-item.active b:nth-child(1),
.nav-item.active b:nth-child(2) {
  display: block;
}

.nav-item.active .link {
  text-decoration: none;
  color: #000;
  background: rgb(254, 254, 254);
}

.nav-icon {
  width: 60px;
  height: 20px;
  font-size: 20px;
  text-align: center;
}

.nav-text {
  display: block;
  width: 120px;
  height: 20px;
}

.content {
  height: 100%;
  overflow-y: scroll;
  -webkit-scrollbar: none;
  scrollbar-width: none;
}
</style>
