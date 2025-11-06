<template> 
<div @click="addMessage">添加消息</div>
</template>

<script setup lang="ts">
import { injectStrict, AiChatbotXKey } from '@siact/ai-chatbot-x-vue';
const aiChatbotX = injectStrict(AiChatbotXKey);

const addMessage = () => {
  aiChatbotX.appendMessage('你好');
};


</script>
