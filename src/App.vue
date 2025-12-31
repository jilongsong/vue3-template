<template>
  <div class="dev-app">
    <AiChatbotProvider
   project="sime-agent"
      chatbotUrl="http://localhost:3000"
      app-id="g2gqvscjqp7zd40kshkaw"
      app-token="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImM0ZzJjMEwtYXRWWGF3X2giLCJpYXQiOjE3NjM5NTUxMDEsImV4cCI6MTc5NTQ5MTEwMX0.PwWlGFP8rdYYMA5hyLmrFrfv-gSqVNjQg9b5JYYOoOTbz9otAoH68BTqnRUOEzYBwO8_5BWGiSnLPBlMR3ZUCA"
      :voice-config="{
        appId: '464d5c93',
        apiKey: 'e9dbdd5aa85b155075ccbda764e0db81',
        websocketUrl: 'ws://rtasr.xfyun.cn/v1/ws'
      }"
    >
      <div class="chatbot-container">
        <AiChatbotX
          :x-size="{ width: 100, height: 200 }"
          :x-dialog-size="{ width: 600, height: 800 }"
          modelPath="/vosk-model-small-cn-0.22.zip"
          x-theme="dark"
          x-title="Si-Me™ Engineer Agent"
          @start-transcribing="handleStartTranscribing"
          @stop-transcribing="handleStopTranscribing"
        />
      </div>
      <Test />
    </AiChatbotProvider>
  </div>
</template>

<script setup lang="ts">
import { AiChatbotProvider, AiChatbotX } from "@siact/ai-chatbot-x-vue";
import Test from "./components/test.vue";

const handleStartTranscribing = () => {
  console.log("start transcribing");
};
const handleStopTranscribing = () => {
  console.log("stop transcribing");
};
</script>

<style scoped>
.dev-app {
  .chatbot-container {
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 1000;
  }
}
</style>
