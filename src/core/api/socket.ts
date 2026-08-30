/**
 * Universal WebSocket / Real-time Service Wrapper
 * This acts as a single source of truth for connecting, disconnecting, and handling real-time events.
 * 
 * In a real project, you might use 'socket.io-client' or raw 'WebSocket'.
 * Here we provide a clean, agnostic interface.
 */

export type SocketEventCallback = (data: any) => void;

class SocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private listeners: Map<string, SocketEventCallback[]> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  connect(token?: string) {
    if (this.socket) {
      this.disconnect();
    }

    const wsUrl = token ? `${this.url}?token=${token}` : this.url;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket Connected');
      this.emitLocal('connected', null);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Assuming events come in as { type: 'EVENT_NAME', payload: ... }
        if (data && data.type) {
          this.emitLocal(data.type, data.payload);
        }
      } catch (e) {
        console.warn('Received non-JSON message:', event.data);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket Disconnected');
      this.emitLocal('disconnected', null);
    };
    
    this.socket.onerror = (error) => {
       console.error('WebSocket Error:', error);
       this.emitLocal('error', error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  /**
   * Send data to server
   */
  send(type: string, payload: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('Socket not connected, cannot send message.');
    }
  }

  /**
   * Subscribe to incoming events
   */
  on(event: string, callback: SocketEventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  /**
   * Unsubscribe from events
   */
  off(event: string, callback: SocketEventCallback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)?.filter((cb) => cb !== callback);
      if (callbacks) {
        this.listeners.set(event, callbacks);
      }
    }
  }

  /**
   * Emit locally to subscribed listeners
   */
  private emitLocal(event: string, payload: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(payload));
    }
  }
}

const WEBSOCKET_URL = 'wss://api.yourdomain.com/ws'; // Replace with real URL
export const socketClient = new SocketService(WEBSOCKET_URL);
