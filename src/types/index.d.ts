// 全局类型定义
declare interface Window {
  // 在这里添加window的自定义属性
}

// 通用接口定义
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}
