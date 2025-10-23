// IframeMessenger.ts

interface Message {
  id: number;
  eventType: string;
  data: any;
  from: 'messenger';
  response?: any;
  error?: string;
}

type Callback = (data: any, event: MessageEvent) => void;

interface PendingPromise {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  timer: ReturnType<typeof setTimeout>;
}

interface Options {
  target: Window;
  origin?: string;
}

export enum EventType {
  WAKE_STATUS = 'wake-status',
  EXECUTE_COMMAND = 'execute-command',
  TOGGLE_VOICE = 'toggle-voice',
}

class IframeMessenger {
  private target: Window;
  private origin: string;
  private eventListeners: Map<string, Callback[]>;
  private messageId: number;
  private pendingPromises: Map<number, PendingPromise>;
  private handleMessageBound: (event: MessageEvent) => void;

  constructor(options: Options) {
    this.target = options.target;
    this.origin = options.origin || '*';
    this.eventListeners = new Map();
    this.messageId = 0;
    this.pendingPromises = new Map();

    this.handleMessageBound = this.handleMessage.bind(this);
    window.addEventListener('message', this.handleMessageBound);
  }

  public send<T = any>(eventType: string, data: any, timeout: number = 5000): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = ++this.messageId;
      const message: Message = { id, eventType, data, from: 'messenger' };

      const timer = setTimeout(() => {
        this.pendingPromises.delete(id);
        reject(new Error(`Timeout for message ${id} after ${timeout}ms`));
      }, timeout);

      this.pendingPromises.set(id, { resolve, reject, timer });

      this.target.postMessage(message, this.origin);
    });
  }

  // Fire-and-forget notification (no reply expected)
  public notify(eventType: string, data: any): void {
    console.log('notify', eventType, data);
    const payload = { eventType, data, from: 'messenger' };
    this.target.postMessage(payload as any, this.origin);
  }

  public on(eventType: string, callback: Callback): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(callback);
  }

  public off(eventType: string, callback: Callback): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index !== -1) listeners.splice(index, 1);
      if (listeners.length === 0) this.eventListeners.delete(eventType);
    }
  }

  private handleMessage(event: MessageEvent): void {
    if (this.origin !== '*' && event.origin !== this.origin) return;

    const { id, eventType, data, response, error } = (event.data as Message) || {};

    if (id && this.pendingPromises.has(id)) {
      const { resolve, reject, timer } = this.pendingPromises.get(id)!;
      clearTimeout(timer);
      this.pendingPromises.delete(id);
      if (error) reject(new Error(error));
      else resolve(response || data);
      return;
    }

    if (eventType && this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType)!.forEach((callback) => callback(data, event));
    }
  }

  public reply(originalMessage: Message, responseData: any, error?: string): void {
    const { id, from } = originalMessage;
    if (from !== 'messenger') return;
    const replyMessage: Partial<Message> = { id, response: responseData, error };
    this.target.postMessage(replyMessage, this.origin);
  }

  public destroy(): void {
    window.removeEventListener('message', this.handleMessageBound);
    this.eventListeners.clear();
    this.pendingPromises.clear();
  }
}

export default IframeMessenger;
