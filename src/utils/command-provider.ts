// 定义支持的参数类型枚举
type ParameterType = 'string' | 'number' | 'boolean' | 'object';

// 参数接口
interface CommandParameter {
  name: string;
  description: string;
  type: ParameterType;
  required: boolean;
}

// 命令接口
interface ScreenCommand {
  name: string;
  description: string;
  parameters: CommandParameter[];
  handler: (...args: any[]) => void; // 保持 any[] 兼容现有实现，后续可进一步约束
}

// 大屏命令配置接口
interface ScreenCommandConfig {
  project: string;
  description: string;
  commands: ScreenCommand[];
}

// 示例实现
export const commandProvider: ScreenCommandConfig = {
  project: '虹阳大屏',
  description: '虹阳大屏命令配置',
  commands: [
    {
      name: 'toggleRoute',
      description: `路由跳转，支持以下路径：
- 产销管理: /sales
- 质量管理: /quality
- EHS 管理: /ehs
- 设备管理: /equipment
- 总体概况: /
- 动能管理: /energy
- 物流管理: /logistics
- 成本管理: /cost
- 办公管理: /office`,
      parameters: [
        {
          name: 'path',
          description: '路由地址',
          type: 'string',
          required: true,
        },
      ],
      handler: (path: string) => {
        // router.push(path);
      },
    },
    {
      name: 'playVideo',
      description: '播放宣传片',
      parameters: [],
      handler: () => {
        // 放置执行逻辑
      },
    },
  ],
};

// 封装全局变量赋值
export function registerCommandProvider(iframeDom: HTMLIFrameElement) {
    const contentWindow = iframeDom.contentWindow as any;
    contentWindow.__SiMeAgent = commandProvider;
}