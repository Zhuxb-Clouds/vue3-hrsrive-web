<template>
  <div class="container">
    <div class="full-screen" data-scroll-section>
      <img :src="info.headImage" alt="" />
    </div>
    <div data-scroll-section class="info">
      <h3>About Story</h3>
      <div>
        <p v-for="line in info.description.split('\n')">{{ line }}</p>
      </div>
      <div class="CG" v-if="info.CGList.length != 0">
        <h3>CG</h3>
        <div class="cg">
          <img v-for="cg in info.CGList" :src="cg" alt="" />
        </div>
      </div>
      <div class="music" v-if="info.musicUrl">
        <h3>Music</h3>
        <div class="video-box">
          <iframe
            :src="info.musicUrl"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
            width="100%"
            height="700"
          >
          </iframe>
        </div>
      </div>
      <!-- 获取100%宽度的实际像素值，并且 -->
      <div class="steam" v-if="info.steamUrl">
        <h3>Steam</h3>
        <iframe :src="info.steamUrl" frameborder="0" width="100%" height="220"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from "vue";
import InfoMap from "./info.json";
import { useRoute } from "vue-router";
const route = useRoute();
const gameName = computed(() => route.params.name) as Ref<keyof typeof InfoMap>;
const info = computed(() => InfoMap[gameName.value]);
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.full-screen {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  img {
    object-fit: cover;
  }
}

.full-screen > img {
  width: 100%;
}

nav {
  display: flex;
  gap: 20px;
}

.games {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 220px;
  padding: 20px;
}

h3 {
  font-size: 2rem;
  font-family: "Noto Serif SC", cursive;
  color: #000;
  text-align: center;
  margin-block: 120px;
  font-weight: normal;
}

.title {
  position: relative;
}

.info img {
  width: 100%;
}

.info {
  max-width: 65%;
  font-family: "Noto Serif SC";
}

.info p {
  font-size: 20px;
  color: #000;
  text-align: left;
  margin-block: 20px;
  font-weight: 500;
}

p > i {
  font-size: 20px;
  color: #3f3f3f;
  text-align: left;
  margin-block: 20px;
  font-weight: 400;
}

.link {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
}

p {
  position: relative;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.cg {
  /* grid  */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.cg img {
  width: 100%;
  height: 100%;
  /* cover */
  object-fit: cover;
}

.music,
.steam {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.video-box {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9比例 = (9/16)*100% = 56.25% */
  height: 0;
}

.video-box iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
