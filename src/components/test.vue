<template> 
<div @click="addMessage">添加消息</div>
</template>

<script setup lang="ts">
import { injectStrict, AiChatbotXKey } from '@siact/ai-chatbot-x-vue';
const aiChatbotX = injectStrict(AiChatbotXKey);

const addMessage = () => {
  aiChatbotX.appendMessage('你好');
};

aiChatbotX.registerCommand({
  name: 'openModel',
  description: '打开弹窗',
  handler: () => {
    // 在此放置业务逻辑，例如更新状态机或触发语音播报
    console.log('打开弹窗');
    return { success: true };
  },
});


</script>
