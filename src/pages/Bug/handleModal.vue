<template>
  <Modal v-model:open="open" :width="700" @ok="handleOk">
    <Descriptions title="Bug详情" bordered>
      <DescriptionsItem label="游戏名称" :span="1">{{ props.data.game }}</DescriptionsItem>
      <DescriptionsItem label="游戏版本" :span="1">{{ props.data.version }}</DescriptionsItem>
      <DescriptionsItem label="错误类型" :span="1">{{ props.data.bugType }}</DescriptionsItem>
      <DescriptionsItem label="出错行" :span="3">{{ props.data.line }}</DescriptionsItem>
      <DescriptionsItem label="出错内容" :span="3">{{ props.data.content }}</DescriptionsItem>
      <DescriptionsItem label="处理状态" :span="3">
        <Radio.Group v-model:value="status">
          <Radio value="pending">未处理</Radio>
          <Radio value="reject">已拒绝</Radio>
          <Radio value="resolve">已处理</Radio>
        </Radio.Group>
      </DescriptionsItem>
      <DescriptionsItem label="处理结果" :span="3">
        <Textarea v-model:value="reply" />
      </DescriptionsItem>
    </Descriptions>
  </Modal>
</template>

<script setup lang="ts">
import { Modal, Descriptions, DescriptionsItem, Radio, Textarea } from "ant-design-vue";
import { BugRecord, updateBug } from "./report";
import { ref, watch, onMounted } from "vue";
const open = defineModel({
  default: false,
});
const props = defineProps<{
  data: BugRecord;
}>();
const emit = defineEmits(["changed"]);
const status = ref();
const reply = ref();
const handleOk = () => {
  updateBug(Object.assign({}, props.data, { status: status.value, reply: reply.value })).then(
    () => {
      emit("changed");
      open.value = false;
    }
  );
};
watch(open, (val) => {
  if (val) {
    status.value = props.data.status;
    reply.value = props.data.reply;
  }
});
</script>

<style scoped></style>
