<template>
  <Modal v-model:open="open" :width="700" :footer="null">
    <Descriptions title="Bug详情" bordered>
      <DescriptionsItem label="游戏名称" :span="1">{{ props.data.game }}</DescriptionsItem>
      <DescriptionsItem label="游戏版本" :span="1">{{ props.data.version }}</DescriptionsItem>
      <DescriptionsItem label="错误类型" :span="1">{{ props.data.bugType }}</DescriptionsItem>
      <DescriptionsItem label="出错行" :span="3">{{ props.data.line }}</DescriptionsItem>
      <DescriptionsItem label="出错内容" :span="3">{{ props.data.content }}</DescriptionsItem>
      <DescriptionsItem label="处理状态" :span="3">
        <Tag v-if="props.data.status == 'resolve'" color="success">已完成</Tag>
        <Tag v-else-if="props.data.status == 'reject'" color="error">已拒绝</Tag>
        <Tag v-else-if="props.data.status == 'pending'" color="processing">未处理</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="处理结果" :span="3">
        {{ props.data.reply }}
      </DescriptionsItem>
    </Descriptions>
  </Modal>
</template>

<script setup lang="ts">
import { Modal, Descriptions, DescriptionsItem, Tag, Textarea } from "ant-design-vue";
import type { BugRecord } from "@/type";
const open = defineModel({
  default: false,
});
const props = defineProps<{
  data: BugRecord;
}>();
</script>

<style scoped></style>
