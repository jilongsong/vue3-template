<template>
  <div class="app-root">
    <div>home</div>

    <!-- Floating Assistant Button -->
    <button class="assistant-fab" @click="toggleAssistant" aria-label="打开智能助手">
      助手
    </button>

    <!-- Assistant Popup -->
    <div class="assistant-popup" :class="{ open: showAssistant }" role="dialog" aria-modal="false" :aria-hidden="!showAssistant">
      <div class="assistant-header">
        <span>智能助手</span>
        <button class="assistant-close" @click="toggleAssistant" aria-label="关闭">
          ×
        </button>
      </div>
      <div class="assistant-body">
        <iframe
          class="assistant-iframe"
          src="http://localhost:3000/zh/project"
          title="智能助手"
          allow="microphone"
          frameborder="0"
          ref="iframeRef"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { registerCommandProvider } from '@/utils/command-provider'

import IframeMessenger, { EventType } from './utils/iframe-messenger'
const iframeRef = ref<HTMLIFrameElement | null>(null);
const showAssistant = ref(false)
const toggleAssistant = () => {
  showAssistant.value = !showAssistant.value
}

let messenger: IframeMessenger | null = null;

onMounted(() => {

  const iframe = iframeRef.value;
  registerCommandProvider(iframeRef.value!);
  if (!iframe) return;

  window.addEventListener('message', (event) => {

  const data = event.data;

  if (data.type === 'execute-command' && data.command) {
    const command = data.command;
    console.log('Received from child:', data);
  }
  if (data.type === 'wake-status') {
    console.log('Received from child:', data);
  }
});

  

  const handleLoad = () => {
    messenger = new IframeMessenger({
      target: iframe.contentWindow!,
      origin: 'http://localhost:3000', // 子窗口 origin
    });

    // 监听事件
    messenger.on(EventType.WAKE_STATUS, (data) => {
      console.log('Received from child:', data);
    });

    messenger.on(EventType.EXECUTE_COMMAND, (data) => {
      console.log('Received from child:', data);
    });
  };

  iframe.addEventListener('load', handleLoad);
});

onUnmounted(() => {
  messenger?.destroy();
});
</script>

<style scoped>
.app-root {
  width: 100%;
  height: 100%;
}

.assistant-fab {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1000;
  border: none;
  background: #1677ff;
  color: #fff;
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.assistant-fab:hover {
  background: #1668e3;
}

.assistant-popup {
  position: fixed;
  right: 16px;
  bottom: 64px; /* leave space for the FAB */
  width: 600px;
  height: 800px;
  max-height: calc(100vh - 120px);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1001;
}

.assistant-popup.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0s;
}

.assistant-popup { transform: translateY(8px) translateX(200vw); }
.assistant-popup.open { transform: translateY(0) translateX(0); }

.assistant-header {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: #f7f8fa;
  border-bottom: 1px solid #eee;
  color: #333;
  font-weight: 600;
}

.assistant-close {
  appearance: none;
  border: none;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: #666;
}

.assistant-close:hover {
  color: #000;
}

.assistant-body {
  flex: 1;
}

.assistant-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
