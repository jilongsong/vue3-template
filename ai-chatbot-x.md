安装： @siact/ai-chatbot-x-vue
使用：
import { AiChatbotProvider, AiChatbotX } from "@siact/ai-chatbot-x-vue";

    <AiChatbotProvider
      project="sime-agent"
      chatbotUrl="http://localhost:3000/project"
    >
      <div class="chatbot-container">
        <AiChatbotX
          :x-size="{ width: 100, height: 200 }"
          :x-dialog-size="{ width: 600, height: 800 }"
          x-theme="dark"
          x-title="Si-Me™ Engineer Agent"
        />
      </div>
    </AiChatbotProvider>

    AiChatbotProvider放在页面最外层，AiChatbotX放在需要使用的地方。

    页面/组件内注册命令：
    import { injectStrict, AiChatbotXKey } from '@siact/ai-chatbot-x-vue';

    const aiChatbotX = injectStrict(AiChatbotXKey);

    aiChatbotX.registerCommand({
  name: "SiMeAgent_wake",
  description: "语音唤醒",
  handler: (status: 'wake' | 'listening' | 'standby') => {
    //放置执行业务自己的命令对应的业务逻辑
    return { success: true };
  },
});