<script setup lang="ts">
import Layout from "@/components/Layout/index.vue";
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<style>
::selection {
  background: rgb(71, 71, 71);
  color: #fff;
}
::-webkit-scrollbar {
  display: none;
}
</style>
