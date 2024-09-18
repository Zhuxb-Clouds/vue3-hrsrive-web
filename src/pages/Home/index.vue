<template>
  <div class="container">
    <div class="full-screen" data-scroll-section></div>
    <div class="games" data-scroll-section>
      <h2 class="title">Our Game</h2>
      <div class="game-project">
        <router-link to="/game/the-roc" target="_blank">
          <img
            class="main"
            src="https://oss.hrsrive.cn/hrsrive/TheRoc.png"
            loading="lazy"
            alt=""
          />
        </router-link>
        <h3 class="title">大鹏 - The Roc</h3>
        <p>
          <i>《大鹏TheRoc》是我们的第一部作品，目前已在摩点与Steam上公开。</i>
        </p>
        <p>
          因为父母工作缘故，吴胜幽从家乡被迫来到大城市的高中读书。喜好诗歌的他内心细腻敏感，始终感觉自己与周遭的同学格格不入。班长魏红杉带他参观学校途中，他遇见了在假山上看书的周清。随后几日，吴胜幽见识到了周清的特立独行，并因此对这个女孩产生了极大的好奇心。
        </p>
        <p>
          随着与她接触的增多，二人越走越近，他好像成了周清唯一的朋友。然而实际上，他又似乎一点都不了解周清真实的内心想法……
        </p>
        <p class="link">
          <iframe
            src="https://store.steampowered.com/widget/1389900/"
            frameborder="0"
            height="220"
            style="width: 100%"
          ></iframe>
        </p>
      </div>
      <div class="game-project">
        <img
          src="https://oss.hrsrive.cn/hrsrive/Ashe.webp"
          loading="lazy"
          alt=""
        />

        <h3 class="title">春之灰烬 - Ashes Of Spring</h3>
        <p>
          <i
            >《春之灰烬》是一部“实验性质”的作品，这种实验性是对于制作的一些尝试，比如剧本、配音与演出。游戏全长在15-20min，包含了一个人物立绘，两个配音角色，四段章节体的叙事，十首原创BGM，以及一个大胆的尝试。</i
          >
        </p>
        <p>高三的春天，几乎是和我患上神经衰弱的同一时间，我结识了一个女孩。</p>
        <p>
          虽然与她相处的时间不长，但每当看见“青春”这种字眼，我总是会想起她。尽管她的名字长相我都已经记不清楚，可和她的那些经历却频频在梦中出现。
        </p>
        <p>我的青春没有绚丽的火花，只有那燃烧后，落入风中的春之灰烬。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.full-screen {
  width: 100%;
  height: 100vh;
  background: url(https://oss.hrsrive.cn/hrsrive/background.png) no-repeat
    center center;
  background-size: cover;
  position: relative;
}

nav {
  display: flex;
  gap: 20px;
}

.games {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 200px;
  padding: 20px;
}

.games > .title {
  font-size: 2rem;
  font-family: "Roboto", cursive;
  color: #000;
  text-align: center;
  margin-block-start: 120px;
  font-weight: normal;
  /* 斜体 */
  font-style: italic;
}

.title {
  position: relative;
}

.game-project img {
  width: 100%;
}

.game-project {
  max-width: 65%;
  font-family: "Noto Serif SC";
}

.game-project > .title {
  font-size: 32px;
  color: #000;
  text-align: left;
  margin-block: 32px;
  font-weight: 700;
  width: fit-content;
}

.game-project > p {
  font-size: 20px;
  color: #000;
  text-align: left;
  margin-block: 20px;
  font-weight: 500;
}

.game-project > a {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}

.game-project > a:hover {
  transform: scale(1.05);
}

.game-project > a:hover > .main {
  border-radius: 1rem;
  /* 变暗 */
  filter: brightness(0.6);
}

.game-project > a > img {
  transition: 0.5s;
  height: 100%;
  width: 100%;
}

.main:hover + .zhouqing {
  opacity: 1;
  right: -20%;
}

.zhouqing {
  position: absolute;
  top: -10%;
  right: -30%;
  width: 200%;
  transform: scale(1.5);
  /* 锚点为头顶 */
  transform-origin: top;
  height: auto !important;
  pointer-events: none;
  opacity: 0;
}

p > i {
  font-size: 20px;
  color: #3f3f3f;
  text-align: left;
  margin-block: 20px;
  font-weight: 400;
}

.link {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
}

p {
  position: relative;
}

@media (max-width: 768px) {
  .games > .title {
    font-size: 1.5rem;
    margin-block: 80px;
  }

  .game-project {
    max-width: 90%;
  }

  .game-project > .title {
    font-size: 24px;
    margin-block: 20px;
  }

  .game-project > p {
    font-size: 16px;
    margin-block: 10px;
  }
}
</style>
