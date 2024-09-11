<template>
  <div class="container" id="bug-container">
    <div class="mask"></div>
    <div class="table">
      <Back style="top: 0; left: -50px" />
      <Form layout="inline">
        <FormItem label="输入其他邮箱查询">
          <InputSearch type="email" placeholder="请输入邮箱" enter-button @search="handleAddMail" />
        </FormItem>
        <FormItem label="选择需要查询的邮箱">
          <Select
            :options="emailListOptions"
            v-model:value="selectedEmail"
            mode="tags"
            style="max-width: 720px; min-width: 200px"
            @change="init"
          />
        </FormItem>
        <FormItem label="选择查询Bug的状态">
          <Select
            :options="statusOptions"
            v-model:value="statusList"
            mode="tags"
            style="max-width: 720px; min-width: 200px"
            @change="init"
          />
        </FormItem>
      </Form>
      <Table
        :columns="columns"
        :data-source="data"
        :pagination="{
          current: page,
          pageSize: amount,
          total: total,
          onChange: handleChange,
        }"
      >
        <template #bodyCell="{ column, text, record }">
          <div v-if="column.dataIndex == 'status'">
            <Tag v-if="text == 'resolve'" color="success">已完成</Tag>
            <Tag v-else-if="text == 'reject'" color="error">已拒绝</Tag>
            <Tag v-else-if="text == 'pending'" color="processing">未处理</Tag>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Table, TableColumnType, Tag, InputSearch, Select, FormItem, Form } from "ant-design-vue";
import { onMounted, ref, computed } from "vue";
import { getBugList } from "./report";
import { useLocalStorage } from "@vueuse/core";
import Back from "@/components/back.vue";
const emailList = useLocalStorage<string[]>("emailList", []);
const selectedEmail = ref(emailList.value);
const page = ref(1);
const amount = ref(10);
const emailListOptions = computed(() =>
  emailList.value.map((item) => ({ label: item, value: item }))
);
const statusOptions = computed(() => [
  { label: "已完成", value: "resolve" },
  { label: "已拒绝", value: "reject" },
  { label: "未处理", value: "pending" },
]);
const statusList = ref<string[]>([]);
const init = () => {
  getBugList({
    emailList: selectedEmail.value.join(","),
    page: page.value,
    amount: amount.value,
    status: statusList.value.join(","),
  }).then((res) => {
    data.value = res.data;
    total.value = res.total;
  });
};
const data = ref([]);
const total = ref(0);
const columns: TableColumnType[] = [
  {
    title: "游戏名称",
    dataIndex: "game",
  },
  {
    title: "游戏版本",
    dataIndex: "version",
  },
  {
    title: "bug类型",
    dataIndex: "bugType",
  },
  {
    title: "出现行",
    dataIndex: "line",
  },
  {
    title: "具体内容",
    dataIndex: "content",
    ellipsis: true,
  },
  {
    title: "当前状态",
    dataIndex: "status",
  },
  {
    title: "创作者回复",
    dataIndex: "reply",
    ellipsis: true,
  },
];
const handleChange = (pageNumber: number, pageSize: number) => {
  page.value = pageNumber;
  amount.value = pageSize;
  init();
};
const handleAddMail = (value: string) => {
  emailList.value = Array.from(new Set([...emailList.value, value]));
  selectedEmail.value = [value];
  init();
};
onMounted(async () => {
  init();
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  min-height: 100vh;
  background: url(https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/hrsrive/background.png) no-repeat
    center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}
.table {
  width: 70%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  overflow: visible;
  background: rgba(255, 255, 255);
  border-radius: 10px;
  z-index: 2;
  margin: 160px 0;
  position: relative;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: 1;
}
.item {
  width: 100%;
}
</style>
