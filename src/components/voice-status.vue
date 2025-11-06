<template>
    <transition name="voice-fade" @enter="onEnter">
      <div v-if="status !== 'standby'" class="voice-status-container" :data-status="status">
        <div class="voice-indicator">
          <!-- Added ripple rings for wake-up animation -->
          <div v-if="status === 'wake'" class="ripple-container">
            <div class="ripple-ring ripple-1"></div>
            <div class="ripple-ring ripple-2"></div>
            <div class="ripple-ring ripple-3"></div>
          </div>
          
          <div class="indicator-ring" :class="{ pulse: status === 'listening' }"></div>
          
          <!-- Added glow effect layer -->
          <div class="indicator-glow"></div>
          
          <div class="indicator-core">
            <!-- Added transition wrapper for icon animations -->
            <transition name="icon-rotate" mode="out-in">
              <svg v-if="status === 'wake'" key="wake" width="24" height="24" viewBox="0 0 24 24" fill="none" class="status-icon">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
              <svg v-else-if="status === 'listening'" key="listening" width="24" height="24" viewBox="0 0 24 24" fill="none" class="status-icon">
                <path
                  d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                  fill="currentColor"
                />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="currentColor" />
              </svg>
            </transition>
          </div>
        </div>
  
        <div class="status-info">
          <!-- Added staggered animation for text -->
          <transition name="text-fade" appear>
            <div class="status-label">{{ statusLabels[status] }}</div>
          </transition>
          
          <transition name="text-slide">
            <div v-if="status === 'listening' && transcriptionText" class="transcription-text">
              {{ transcriptionText }}
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  type VoiceStatus = 'wake' | 'listening' | 'standby';
  
  const props = defineProps<{
    status: VoiceStatus;
    transcriptionText?: string;
  }>();
  
  const statusLabels: Record<VoiceStatus, string> = {
    wake: '您好，有什么需要帮你的吗？',
    listening: '转写中',
    standby: '待命',
  };
  
  const onEnter = (el: Element) => {
    if (props.status === 'wake') {
      (el as HTMLElement).classList.add('wake-animation');
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .voice-status-container {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 24px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  
    &[data-status='wake'] {
      .indicator-ring {
        border-color: #10b981;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
      }
      .indicator-core {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: #ffffff;
        animation: core-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .indicator-glow {
        background: radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%);
        animation: glow-pulse 2s ease-in-out infinite;
      }
    }
  
    &[data-status='listening'] {
      .indicator-ring {
        border-color: #3b82f6;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
      }
      .indicator-core {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: #ffffff;
      }
      .indicator-glow {
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
      }
    }
  }
  
  .voice-indicator {
    position: relative;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .ripple-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  .ripple-ring {
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 2px solid #10b981;
    opacity: 0;
    animation: ripple-expand 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    
    &.ripple-1 {
      animation-delay: 0s;
    }
    
    &.ripple-2 {
      animation-delay: 0.3s;
    }
    
    &.ripple-3 {
      animation-delay: 0.6s;
    }
  }
  
  .indicator-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  
    &.pulse {
      animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  }
  
  .indicator-glow {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    pointer-events: none;
    transition: all 0.4s ease;
  }
  
  .indicator-core {
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1;
  }
  
  .status-icon {
    transition: all 0.3s ease;
  }
  
  .status-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }
  
  .status-label {
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
    letter-spacing: 0.5px;
    margin-top: 4px;
    line-height: 1.5;
  }
  
  .transcription-text {
    font-size: 15px;
    line-height: 1.6;
    color: #cbd5e1;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    max-height: 120px;
    overflow-y: auto;
    word-wrap: break-word;
  
    &::-webkit-scrollbar {
      width: 4px;
    }
  
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
  }
  
  /* Enhanced animations */
  @keyframes ripple-expand {
    0% {
      transform: scale(0.8);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
  
  @keyframes core-pop {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes glow-pulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  @keyframes pulse-ring {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.08);
      opacity: 0.8;
    }
  }
  
  .voice-fade-enter-active {
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .voice-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
  }
  
  .voice-fade-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  
  .voice-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
  }
  
  .icon-rotate-enter-active,
  .icon-rotate-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .icon-rotate-enter-from {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
  }
  
  .icon-rotate-leave-to {
    opacity: 0;
    transform: rotate(90deg) scale(0.5);
  }
  
  .text-fade-enter-active {
    transition: all 0.4s ease 0.2s;
  }
  
  .text-fade-enter-from {
    opacity: 0;
    transform: translateX(-10px);
  }
  
  .text-slide-enter-active,
  .text-slide-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .text-slide-enter-from,
  .text-slide-leave-to {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
  }
  
  /* Responsive */
  @media (max-width: 640px) {
    .voice-status-container {
      padding: 16px 20px;
    }
    
    .voice-indicator {
      width: 48px;
      height: 48px;
    }
    
    .indicator-core {
      width: 40px;
      height: 40px;
    }
  }
  </style>
  