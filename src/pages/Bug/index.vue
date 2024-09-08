<template>
  <div class="container" id="bug-container">
    <div class="mask"></div>
    <div style="display: flex; gap: 20px">
      <router-link to="/bug/report">
        <div class="card">
          <div class="title">捉虫</div>
          <section>
            <p>○ 发现并提交错别字或语法错误。</p>
            <p>○ 发现游戏中的错误漏洞。</p>
            <p>○ 提交漏洞让我们来修复它们。</p>
            <p>○ 为游戏提供更多的建议。</p>

            <img src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/hrsrive/B1.png" alt="" />
          </section>
        </div>
      </router-link>
      <router-link to="/bug/record">
        <div class="card">
          <div class="title">查询记录</div>
          <section>
            <p>○ 通过邮箱查询曾经捉过的虫子。</p>
            <p>○ 查看自己的捉虫记录。</p>
            <p class="delete">○ 查看自己的捉虫排名。</p>

            <img src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/hrsrive/A1.png" alt="" />
          </section>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useEventListener } from "@vueuse/core";
const yRange = [-6, 6];
const xRange = [-6, 6];
function mouseMove(e: MouseEvent) {
  const card = e.target as HTMLElement;
  const { offsetX, offsetY } = e;
  const { offsetWidth, offsetHeight } = card;
  const rx = getRotateDeg(yRange, offsetX, offsetWidth);
  const ry = getRotateDeg(xRange, offsetY, offsetHeight);
  card.style.setProperty("--rx", `${rx}deg`);
  card.style.setProperty("--ry", `${ry}deg`);
}
function mouseLeave(e: MouseEvent) {
  const card = e.target as HTMLElement;
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
}

function getRotateDeg(range: number[], value: number, length: number) {
  return (value / length) * (range[1] - range[0]) + range[0];
}
onMounted(() => {
  const card = document.getElementsByClassName("card");
  Array.from(card).forEach((element) => {
    useEventListener(element, "mousemove", mouseMove);
    useEventListener(element, "mouseleave", mouseLeave);
  });
  // 滚动到顶部
  document.getElementById("bug-container")?.scrollIntoView({
    behavior: "smooth",
  });
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/hrsrive/background.png) no-repeat
    center center;
  background-size: cover;
}
.card {
  width: 320px;
  height: 480px;
  background-color: #f0f0f0;
  border-radius: 20px;
  cursor: pointer;
  padding: 40px;
  font-family: Smiley sans;
  position: relative;
  overflow: hidden;
  // border: 2px solid #000;
  transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  animation: fadeIn 0.2s;
  .title {
    font-size: 2.5rem;
    color: #000;
    text-align: left;
    padding: 10px 0;
  }
  p {
    font-size: 1.5rem;
    color: #000;
    text-align: left;
    font-weight: normal;
    /* 斜体 */
    font-style: italic;
  }
  .delete {
    text-decoration: line-through;
  }
  img {
    width: 200px;
    transform: scale(1.15);
    position: absolute;
    bottom: 0;
    right: 0;
    transition: all 0.2s;
  }
  // 所有的子元素pinter-events都为none
  * {
    pointer-events: none;
  }
  &:hover {
    img {
      transform: scale(1.3) rotate(10deg);
    }
  }
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07),
    1px 1px 4px #fff inset;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 背景模糊
  backdrop-filter: blur(10px);
}
</style>
