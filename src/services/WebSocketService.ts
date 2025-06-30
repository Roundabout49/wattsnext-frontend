// services/WebSocketService.ts
import { Client, IMessage } from '@stomp/stompjs';

type Listener<T> = (msg: T) => void;

class WebSocketService {
  private client: Client;
  private listeners: Map<string, Listener<any>[]> = new Map();

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('[WS] Connected');

      // Beispiel: allgemeiner Listener-Handler
      this.client.subscribe('/topic/gameState', (message: IMessage) => {
        this.emit('gameState', JSON.parse(message.body));
      });

      // Weitere Topics ...
    };

    this.client.activate();
  }

  private emit<T>(type: keyof IncomingMessage, payload: T) {
    const ls = this.listeners.get(type);
    ls?.forEach((l) => l(payload));
  }

  public on<T extends keyof IncomingMessage>(type: T, listener: Listener<IncomingMessage[T]>) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(listener);
  }

  public send<T extends keyof OutgoingMessage>(destination: T, payload: OutgoingMessage[T]) {
    this.client.publish({
      destination,
      body: JSON.stringify(payload),
    });
  }
}

export const websocketService = new WebSocketService();
