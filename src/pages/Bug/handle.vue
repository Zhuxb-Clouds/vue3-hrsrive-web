<template>
  <div class="container" id="bug-container">
    <div class="mask"></div>
    <div class="table">
      <Back style="top: 0; left: -50px" />
      <Form layout="inline">
        <FormItem label="输入单个邮箱查询">
          <InputSearch type="email" placeholder="请输入邮箱" enter-button @search="handleAddMail" />
        </FormItem>
        <FormItem label="选择查询Bug的状态">
          <Select
            :options="statusOptions"
            v-model:value="statusList"
            mode="tags"
            style="max-width: 720px; min-width: 200px"
            @change="init()"
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
        <!-- @vue-ignore -->
        <template #action="{ record }">
          <Button @click="handleClick(record)">操作</Button>
        </template>
      </Table>
    </div>
  </div>
  <Modal :data="currentItem" v-model="open" @changed="init" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Table,
  TableColumnType,
  Tag,
  InputSearch,
  Button,
  FormItem,
  Form,
  Select,
} from "ant-design-vue";
import { onMounted, ref } from "vue";
import { getBugList } from "./report";
import type { BugRecord } from "@/type";
const statusOptions = computed(() => [
  { label: "已完成", value: "resolve" },
  { label: "已拒绝", value: "reject" },
  { label: "未处理", value: "pending" },
]);
const statusList = ref<string[]>([]);
import Modal from "./handleModal.vue";
import Back from "@/components/back.vue";
const page = ref(1);
const amount = ref(10);
const open = ref(false);
const currentItem = ref<BugRecord>({
  id: 0,
  email: "",
  game: "",
  version: "",
  bugType: "",
  line: "",
  content: "",
  status: "",
  reply: "",
});
const init = (emailList?: string) => {
  getBugList({
    emailList: emailList || "",
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
    title: "id",
    dataIndex: "id",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
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
  {
    title: "操作",
    slots: { customRender: "action" },
  },
];
const handleChange = (pageNumber: number, pageSize: number) => {
  page.value = pageNumber;
  amount.value = pageSize;
  init();
};
const handleAddMail = (value: string) => {
  page.value = 1;
  init(value);
};
onMounted(async () => {
  init();
});
const handleClick = (record: BugRecord) => {
  currentItem.value = record;
  open.value = true;
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  min-height: 100vh;
  background: url(https://oss.hrsrive.cn/hrsrive/background.png) no-repeat
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
