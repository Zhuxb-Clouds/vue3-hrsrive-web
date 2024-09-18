<template>
  <div class="container">
    <div class="mask"></div>
    <div class="form-container">
      <Back style="top: 0; left: -50px" />
      <h1>提交虫子</h1>
      <Form layout="vertical" ref="formRef" :model="formState" @finish="onCheck">
        <FormItem
          label="邮箱/Email Address"
          name="email"
          :rules="[
            {
              required: true,
              message: '请输入您的邮箱，如果不填写邮箱，将无法追踪Bug的处理进度。',
              type: 'email',
            },
          ]"
        >
          <Input placeholder="请输入您的邮箱" v-model:value="formState.email" />
        </FormItem>
        <FormItem
          label="游戏名称/Game Name"
          name="game"
          :rules="[
            {
              required: true,
              message: '请选择游戏名称，如果不选择游戏名称，将无法提交Bug。',
            },
          ]"
        >
          <Select
            placeholder="请选择游戏"
            v-model:value="formState.game"
            :disabled="readOnly.includes('game')"
          >
            <SelectOption value="TheRoc">大鹏 The Roc</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="游戏版本/Game Version" name="version">
          <Input
            placeholder="请输入游戏版本"
            v-model:value="formState.version"
            :disabled="readOnly.includes('version')"
          >
          </Input>
        </FormItem>

        <FormItem
          label="错误类型/Bug Type"
          name="bugType"
          :rules="[
            {
              message: '请选择bug类型，这将帮助我们更快的定位bug。',
            },
          ]"
        >
          <Select placeholder="请选择错误类型" v-model:value="formState.bugType">
            <SelectOption value="text">文本错误</SelectOption>
            <SelectOption value="voice">配音错误</SelectOption>
            <SelectOption value="program">程序错误</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="出错行/Bug Position" name="line" v-show="formState.bugType != 'program'">
          <Input
            placeholder="请输入出错行"
            v-model:value="formState.line"
            :disabled="readOnly.includes('game')"
          >
          </Input>
        </FormItem>
        <FormItem
          label="出错内容/Bug Content"
          name="content"
          :rules="[
            {
              required: true,
              message: '请输入具体的出错内容。',
            },
            {
              max: 500,
              message: '出错内容不能超过500字。',
            },
          ]"
        >
          <Textarea placeholder="请输入具体出错内容" v-model:value="formState.content" :rows="4">
          </Textarea>
        </FormItem>
        <FormItem>
          <Button type="primary" style="width: 100%" html-type="submit">提交虫子</Button>
        </FormItem>
      </Form>
      <p class="tip">
        如果有更复杂甚至影响游戏正常游玩的Bug<br />
        请直接联系邮箱：ZhuxbClouds@gmail.com<br />
        我们会第一时间处理
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  Form,
  Input,
  Button,
  FormItem,
  Select,
  SelectOption,
  Textarea,
  message,
} from "ant-design-vue";
import { useLocalStorage } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import { report } from "./report";
import type { FormState } from "@/type";

import Back from "@/components/back.vue";
const route = useRoute();
const router = useRouter();
const emailList = useLocalStorage<string[]>("emailList", []);
const formRef = ref();
const readOnly = ref<string[]>([]);
const formState = reactive<FormState>({
  email: "",
  game: "TheRoc",
  version: "",
  bugType: "text",
  line: "",
  content: "",
});

const onCheck = async () => {
  formRef.value.validateFields().then((res: FormState) => {
    localStorage.setItem("email", res.email);
    if (!emailList.value.includes(res.email)) {
      emailList.value = Array.from(new Set([...emailList.value, res.email]));
    }
    report(res).then(() => {
      message.success("提交成功，感谢您的反馈！");
      router.push("/bug");
    });
  });
};

const init = () => {
  if (route.query.game) {
    formState.game = route.query.game as string;
    readOnly.value.push("game");
  }
  if (route.query.version) {
    formState.version = route.query.version as string;
    readOnly.value.push("version");
  }
  if (route.query.line) {
    formState.line = route.query.line as string;
    readOnly.value.push("line");
  }
  const email = localStorage.getItem("email");
  if (email) {
    formState.email = email;
  }
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  background: url(https://oss.hrsrive.cn/hrsrive/background.png) no-repeat
    center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.form-container {
  width: 30%;
  padding: 20px 40px;
  background-color: #fff;
  z-index: 2;
  border-radius: 12px;
  position: relative;
  font-family: Smiley sans;
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
.tip {
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .form-container {
    width: 70%;
  }
}
</style>
