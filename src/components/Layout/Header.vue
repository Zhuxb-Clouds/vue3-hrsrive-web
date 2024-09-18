<template>
  <header :class="isScrolled ? 'scrolled' : ''">
    <router-link to="/">
      <img id="logo" src="https://oss.hrsrive.cn/hrsrive/logo.png" alt="" />
    </router-link>
    <nav>
      <router-link to="/bug">
        <img
          src="https://oss.hrsrive.cn/hrsrive/bug.png"
          alt=""
          style="filter: invert();"
        />
      </router-link>
      <a href="https://weibo.com/u/7468928516" target="_blank">
        <img
          id="weibo"
          src="https://oss.hrsrive.cn/hrsrive/weibo.png"
          alt=""
        />
      </a>
      <a href="https://space.bilibili.com/490145207" target="_blank">
        <img
          id="bilibili"
          src="https://oss.hrsrive.cn/hrsrive/bilibili.png"
          alt=""
        />
      </a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useWindowScroll } from "@vueuse/core";
const { y } = useWindowScroll();
const isScrolled = computed(() => y.value > 1080 - 104);
</script>

<style scoped lang="less">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 80px);
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  z-index: 999;
  transition: all 0.5s;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.5));
}
nav {
  display: flex;
  gap: 20px;
  img{
    height: 20px;
    object-fit: cover;
  }
}
#logo {
  height: 60px;
  object-fit: cover;
  object-position: left;
}

.scrolled {
  /* 蒙版，将所有颜色转为黑色 */
  filter: invert(1);
  #logo {
    height: 60px;
    width: 140px;
  }
}
</style>
