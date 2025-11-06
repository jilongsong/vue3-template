<template>
  <div class="ai-chatbot-x" :data-theme="currentTheme">
    <!-- 悬浮按钮（最小化状态） -->
    <transition name="fade">
      <div 
        ref="fabRef" 
        class="assistant-fab" 
        :class="{ 'is-hidden': visible }"
        @click="toggleDialog(true)"
      >
        <VoiceStatus class="voice-status" :status="voiceStatus" :transcription-text="transcriptionText" style="width: 480px;" />
        <img src="/sime.png" alt="assistant" :style="{ width: xSize?.width + 'px', height: xSize?.height + 'px' }">
        <div class="fab-pulse"></div>
      </div>
    </transition>

    <!-- 弹窗 -->
    <transition name="dialog-fade">
      <div
        ref="dialogRef"
        class="x-dialog-container"
        :class="{ collapsed: isCollapsed, 'is-hidden': !visible }"
        :style="{
          width: containerWidth + 'px',
          height: isCollapsed ? 'auto' : containerHeight + 'px',
          '--dialog-x': position.x + 'px',
          '--dialog-y': position.y + 'px',
        }"
        @mousedown="startDrag"
      >
        <div class="x-dialog-header" @mousedown.stop="startDrag">
          <div class="header-left">
            <div class="logo-icon">
              <img src="/sime.png" alt="assistant" class="logo" />
            </div>
            <span class="title">{{ xTitle }}</span>
          </div>
          <div class="actions">
            <button class="action-btn theme-btn" @click.stop="cycleTheme" :title="themeTooltip">
            </button>
            <button
              class="action-btn collapse-btn"
              @click.stop="toggleCollapse"
              :title="isCollapsed ? '展开' : '折叠'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  :d="isCollapsed ? 'M18 15L12 9L6 15' : 'M6 9L12 15L18 9'"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button class="action-btn minimize-btn" @click.stop="toggleDialog(false)" title="最小化">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div class="voice-container" :class="{ 'is-hidden': !isCollapsed }">
           <VoiceStatus :status="voiceStatus" :transcription-text="transcriptionText" />
        </div>
        <div :class="['x-dialog-content', { 'is-hidden': isCollapsed }]" :style="{ opacity: isCollapsed ? 0 : 1 }">
          <iframe ref="iframeRef" :src="xUrl" class="x-iframe" allow="microphone" frameborder="0"></iframe>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
import { HostBridge, CommandRegistry } from '@siact/ai-chatbot-bridge';
import VoiceStatus from './voice-status.vue';

interface XSize {
  width: number;
  height: number;
}
interface xDialogSize {
  width: number;
  height: number;
}

const props = defineProps<{
  xUrl: string;
  xSize?: XSize;
  xTitle?: string;
  xTheme?: 'light' | 'dark' | 'system';
  xDialogSize?: xDialogSize;
}>();

const voiceStatus = ref<'wake' | 'listening' | 'standby'>('standby');
const transcriptionText = ref<string>('测试一下新功能,打开质量管理页面');

const visible = ref(false);
const isCollapsed = ref(false);
const iframeRef = ref<HTMLIFrameElement | null>(null);
const dialogRef = ref<HTMLElement | null>(null);
const fabRef = ref<HTMLElement | null>(null);

// ===== 主题管理 =====
const currentTheme = ref<'light' | 'dark'>(props.xTheme === 'system' ? getSystemTheme() : props.xTheme || 'light');

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function cycleTheme() {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
}

const themeTooltip = computed(() => (currentTheme.value === 'light' ? '切换到深色模式' : '切换到浅色模式'));

// 监听系统主题变化
if (props.xTheme === 'system') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = (e: MediaQueryListEvent) => {
    currentTheme.value = e.matches ? 'dark' : 'light';
  };
  mediaQuery.addEventListener('change', handleThemeChange);
  onBeforeUnmount(() => {
    mediaQuery.removeEventListener('change', handleThemeChange);
  });
}

// ===== 弹窗位置与大小 =====
const position = reactive({ x: 0, y: 0 });
const containerWidth = ref(props.xDialogSize?.width || 420);
const containerHeight = ref(props.xDialogSize?.height || 600);
const isFirstOpen = ref(true);

function validatePosition(x: number, y: number, width: number, height: number) {
  const margin = 20;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const maxX = viewportWidth - width - margin;
  const maxY = viewportHeight - height - margin;

  return {
    x: Math.max(margin, Math.min(x, maxX)),
    y: Math.max(margin, Math.min(y, maxY)),
  };
}

function calculateInitialPosition() {
  if (!fabRef.value || !dialogRef.value) return;

  const fabRect = fabRef.value.getBoundingClientRect();
  const dialogWidth = containerWidth.value;
  const dialogHeight = containerHeight.value;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let x = fabRect.right + 16;
  let y = fabRect.top;

  if (x + dialogWidth > viewportWidth - 20) {
    x = fabRect.left - dialogWidth - 16;
  }

  if (x < 20) {
    x = (viewportWidth - dialogWidth) / 2;
    y = (viewportHeight - dialogHeight) / 2;
  } else {
    if (y + dialogHeight > viewportHeight - 20) {
      y = viewportHeight - dialogHeight - 20;
    }
    if (y < 20) {
      y = 20;
    }
  }

  const validated = validatePosition(x, y, dialogWidth, dialogHeight);
  position.x = validated.x;
  position.y = validated.y;
}

// ===== 折叠/展开 =====
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;

  setTimeout(() => {
    const currentHeight = isCollapsed.value ? 60 : containerHeight.value;
    const validated = validatePosition(position.x, position.y, containerWidth.value, currentHeight);
    position.x = validated.x;
    position.y = validated.y;
  }, 0);
}

// ===== 拖拽逻辑 =====
const drag = reactive({
  isDragging: false,
  startX: 0,
  startY: 0,
  offsetX: 0,
  offsetY: 0,
});

const startDrag = (e: MouseEvent) => {
  drag.isDragging = true;
  drag.startX = e.clientX;
  drag.startY = e.clientY;
  drag.offsetX = position.x;
  drag.offsetY = position.y;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

const onDrag = (e: MouseEvent) => {
  if (!drag.isDragging) return;

  const newX = drag.offsetX + (e.clientX - drag.startX);
  const newY = drag.offsetY + (e.clientY - drag.startY);

  const validated = validatePosition(newX, newY, containerWidth.value, isCollapsed.value ? 60 : containerHeight.value);

  position.x = validated.x;
  position.y = validated.y;
};

const stopDrag = () => {
  drag.isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

// ===== 控制弹窗 =====
const toggleDialog = (state: boolean) => {
  visible.value = state;
  if (state) {
    if (isFirstOpen.value) {
      setTimeout(() => {
        calculateInitialPosition();
        isFirstOpen.value = false;
      }, 0);
    } else {
      setTimeout(() => {
        const validated = validatePosition(
          position.x,
          position.y,
          containerWidth.value,
          isCollapsed.value ? 60 : containerHeight.value
        );
        position.x = validated.x;
        position.y = validated.y;
      }, 0);
    }
  }
  if (!state) {
    isCollapsed.value = false;
  }
};

const hostBridge = ref<HostBridge | null>(null);

const defaultCommads = [
  {
    name: "SiMeAgent_wake",
    description: "语音唤醒",
    handler: (status: 'wake' | 'listening' | 'standby') => {
      voiceStatus.value = status;
      if(status === 'standby'){
        transcriptionText.value = '';
      }
      return { success: true };
    },
  },
  {
    name: "SiMeAgent_transition",
    description: "翻译内容",
    handler: (text: string) => {
      transcriptionText.value = text;
      return { success: true };
    },
  }
]

// ===== 初始化桥接器 =====
const initBridge = () => {
  if (!iframeRef.value) return;
  hostBridge.value = new HostBridge({
    allowedOrigins: ['*'],
    debug: true,
  })
}

onMounted(() => {
  initBridge();
});

onBeforeUnmount(() => {
  hostBridge.value?.destroy();
});

defineExpose({
  registerCommand: (command: CommandRegistry) => {
    const allCommands = [...defaultCommads, ...command.commands];
    hostBridge.value?.register({
      project: command.project,
      description: command.description,
      version: command.version,
      commands: allCommands
    });
  },
});
</script>

<style lang="scss" scoped>
/* CSS 变量 - 主题系统 */
.ai-chatbot-x {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-header: #0f172a;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-header: #ffffff;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.15);
  --accent-color: #3b82f6;
  --hover-bg: rgba(0, 0, 0, 0.05);

  &[data-theme='dark'] {
    --bg-primary: #1e293b;
    --bg-secondary: #0f172a;
    --bg-header: #0f172a;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-header: #f1f5f9;
    --border-color: #334155;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5);
    --accent-color: #60a5fa;
    --hover-bg: rgba(255, 255, 255, 0.1);
  }
}

/* 通用隐藏类 - 使用透明度而非 display */
.is-hidden {
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}

/* 悬浮按钮 */
.assistant-fab {
  position: relative;
  cursor: pointer;
  overflow: visible;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  filter: drop-shadow(var(--shadow-md));
  opacity: 1;
  pointer-events: auto;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  .voice-status {
    position: absolute;
    left: -500px;
  }

  img {
    display: block;
    position: relative;
    object-fit: contain;
  }

  .fab-pulse {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid var(--accent-color);
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

/* 弹窗容器 */
.x-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(var(--dialog-x), var(--dialog-y));
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  cursor: grab;
  overflow: hidden;
  z-index: 1100;
  opacity: 1;
  pointer-events: auto;

  &:active {
    cursor: grabbing;
  }

  &.collapsed {
    .x-dialog-header {
      border-radius: 16px;
    }
  }

  /* 头部 */
  .x-dialog-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-header);
    padding: 12px 16px;
    cursor: move;
    user-select: none;
    border-bottom: 1px solid var(--border-color);
    transition: border-radius 0.3s ease;

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;

      .logo-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 36px;
        transition: transform 0.2s ease;
        
        .logo {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        font-weight: 600;
        font-size: 15px;
        color: var(--text-header);
        letter-spacing: -0.01em;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 4px;

      .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        cursor: pointer;
        color: var(--text-secondary);
        transition: all 0.2s ease;
        border-radius: 8px;

        &:hover {
          color: var(--text-header);
          background: var(--hover-bg);
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0);
        }

        svg {
          transition: transform 0.2s ease;
        }

        &.collapse-btn:hover svg {
          transform: scale(1.1);
        }
      }
    }
  }

  .voice-container {
    width: 100%;
    transition: opacity 0.3s ease;
    opacity: 1;
    pointer-events: auto;
  }

  /* 内容区域 */
  .x-dialog-content {
    flex: 1;
    display: flex;
    overflow: hidden;
    background: var(--bg-secondary);
    transition: opacity 0.3s ease;
    opacity: 1;
    pointer-events: auto;
  }

  .x-iframe {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
  }

  .resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 40px;
    height: 40px;
    cursor: nwse-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    background: linear-gradient(135deg, transparent 50%, var(--bg-primary) 50%);
    border-bottom-right-radius: 16px;
    z-index: 10;

    &:hover {
      color: var(--accent-color);
      background: linear-gradient(135deg, transparent 50%, var(--hover-bg) 50%);
    }

    svg {
      width: 16px;
      height: 16px;
      transform: rotate(0deg);
      transition: transform 0.2s ease;
    }

    &:hover svg {
      transform: scale(1.2);
    }
  }
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
