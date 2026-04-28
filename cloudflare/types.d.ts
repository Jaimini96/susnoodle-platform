declare class WebSocketPair {
  0: WebSocket;
  1: WebSocket;
}

interface DurableObjectStorage {
  get<T = unknown>(key: string): Promise<T | undefined>;
  put<T = unknown>(key: string, value: T): Promise<void>;
}

interface DurableObjectState {
  storage: DurableObjectStorage;
}

declare module "cloudflare:workers" {
  export class DurableObject {
    constructor(state: DurableObjectState, env?: unknown);
  }
}

declare const durableObjectIdBrand: unique symbol;

type DurableObjectId = {
  readonly [durableObjectIdBrand]: "DurableObjectId";
};

interface DurableObjectStub {
  fetch(request: Request): Promise<Response>;
}

interface DurableObjectNamespace {
  idFromName(name: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub;
}

interface ResponseInit {
  webSocket?: WebSocket;
}
