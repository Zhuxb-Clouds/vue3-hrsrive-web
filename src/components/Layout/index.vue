<template>
  <div class="container">
    <Header></Header>
    <main>
      <slot></slot>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Layout/Header.vue";
import Footer from "@/components/Layout/Footer.vue";
</script>

<style scoped>
.container {
  background-color: #fff;
  width: 100%;
  height: 100vh;

}
main {
  min-height: calc(100vh - 104px);
}
</style>
