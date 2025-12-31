<template> 
 <div class="test-box">
  <div class="input-box">
    <input v-model="message" placeholder="请输入消息" />
    <button @click="sendMessage">发送消息</button>
  </div>
  <button @click="startListening">启动唤醒监听</button>
  <button @click="stopListening">关闭唤醒监听</button>
  <button @click="openDialog">打开对话框</button>
  <button @click="closeDialog">关闭对话框</button>
  <button @click="toggleCollapse">切换折叠</button>
 </div>
</template>
<style scoped>

</style>
<script setup lang="ts">
import { injectStrict, AiChatbotXKey } from '@siact/ai-chatbot-x-vue';
const aiChatbotX = injectStrict(AiChatbotXKey);

aiChatbotX.registerCommand( {
      name: "navigate",
      description: `切换路由、打开指定页面:
      - 产销管理 => "/sales"
      - 质量管理 => "/quality"
      - EHS 管理 => "/ehs"
      - 设备管理 => "/equipment"
      - 总体概况 => "/"
      - 动能管理 => "/energy"
      - 物流管理 => "/logistics"
      - 成本管理 => "/cost"
      - 办公管理 => "/office"`,
      parameters: [
        {
          name: "path",
          description: "路由路径",
          type: "string",
          required: true,
        },
      ],
      handler: async (path: string) => {
        alert(`导航到: ${path}`);
        return { success: true, path };
      },
    });

aiChatbotX.registerCommand({
  name: 'openRoaming',
  description: '开启漫游',
  handler: () => {
    alert('已开启漫游');
    return { success: true };
  },
});

aiChatbotX.registerCommand({
  name: 'closeRoaming',
  description: '关闭漫游',
  handler: () => {
    alert('已关闭漫游');
    return { success: true };
  },
});

aiChatbotX.registerCommand({
  name: 'openProject',
  description: '进入高校机房',
  handler: () => {
    alert('已进入高校机房');
    return { success: true };
  },
});

aiChatbotX.registerCommand({
  name: 'closeProject',
  description: '退出高校机房',
  handler: () => {
    alert('已退出高校机房');
    return { success: true };
  },
});


const message = ref('介绍一下当前项目');


const sendMessage = () => {
  aiChatbotX.appendMessage(message.value);
}

const startListening = () => {
  aiChatbotX.startListening();
}

const stopListening = () => {
  aiChatbotX.stopListening();
}

const openDialog = () => {
  aiChatbotX.openDialog();
}

const closeDialog = () => {
  aiChatbotX.closeDialog();
}

const toggleCollapse = () => {
  aiChatbotX.toggleCollapse();
}
</script>

<style>
.test-box {
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input-box {
  display: flex;
  gap: 10px;
}
input {
  width: 100%;
}
</style>
