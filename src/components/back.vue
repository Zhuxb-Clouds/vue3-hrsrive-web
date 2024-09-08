<template>
  <div class="back-container" @click="handleClick">
    <RollbackOutlined style="font-size: 20px" />
  </div>
</template>

<script setup lang="ts">
import { RollbackOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const handleClick = () => {
  router.back();
};
</script>

<style scoped lang="less">
.back-container {
  padding: 10px;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  background-color: #fff;
  border-radius: 4px;
}
</style>
