<template>
  <div class="dev-app">
    <AiChatbotProvider
      project="sime-agent"
      chatbotUrl="https://192.100.30.224:8888/app/2zzlnuo100wokm2p57mui/chat/"
      :allowed-origins="['https://192.100.30.224:8888/']"
    >
      <div class="chatbot-container">
        <AiChatbotX
          :x-size="{ width: 100, height: 200 }"
          :x-dialog-size="{ width: 600, height: 800 }"
          x-theme="dark"
          x-title="Si-Me™ Engineer Agent"
        />
      </div>
      <Test />
    </AiChatbotProvider>
  </div>
</template>

<script setup lang="ts">
import { AiChatbotProvider, AiChatbotX } from "@siact/ai-chatbot-x-vue";
import Test from "./components/test.vue";
</script>

<style scoped>
.dev-app {
  .chatbot-container {
    position: fixed;
    right: 200px;
    bottom: 120px;
    z-index: 1000;
  }
}
</style>
