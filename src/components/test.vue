<template> 
<div @click="addMessage">添加消息</div>
</template>

<script setup lang="ts">
import { injectStrict, AiChatbotXKey } from '@siact/ai-chatbot-x-vue';
const aiChatbotX = injectStrict(AiChatbotXKey);

const addMessage = () => {
  aiChatbotX.appendMessage('你好');
};

setTimeout(() => {
  aiChatbotX.registerCommand({
  name: 'openQualityManagement',
  description: '打开质量管理页面',
  handler: () => {
    // 在此放置业务逻辑，例如更新状态机或触发语音播报
    console.log('打开质量管理页面');
    return { success: true };
  },
});
}, 3000);


</script>
