/**
 * @description: IndexDB 管理类
 */

// 定义数据库配置
const DB_CONFIG = {
  NAME: 'SCXFEBASEDB',
  VERSION: 1,
  STORES: {
    CACHE: 'cache',
  },
};

// 定义数据项类型
export interface IndexedDBItem<T = any> {
  id: string;
  data: T;
  createdAt: number;
  updatedAt: number;
}

/**
 * @description IndexDB 管理类 用于操作长缓存数据
 */
export class IndexedDBManager {
  private static instance: IndexedDBManager;
  private db: IDBDatabase | null = null;

  private constructor() {}

  // 单例模式
  static getInstance(): IndexedDBManager {
    if (!IndexedDBManager.instance) {
      IndexedDBManager.instance = new IndexedDBManager();
    }
    return IndexedDBManager.instance;
  }

  // 打开数据库连接
  private async openDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_CONFIG.NAME, DB_CONFIG.VERSION);

      request.onerror = () => {
        reject(new Error(`Failed to open IndexedDB: ${request.error?.message || 'Unknown error'}`));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 创建缓存存储
        if (!db.objectStoreNames.contains(DB_CONFIG.STORES.CACHE)) {
          const store = db.createObjectStore(DB_CONFIG.STORES.CACHE, {
            keyPath: 'id',
          });
          store.createIndex('createdAt', 'createdAt', { unique: false });
          store.createIndex('updatedAt', 'updatedAt', { unique: false });
        }
      };
    });
  }

  // 关闭数据库连接
  closeDB(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  // 保存数据
  async setItem<T>(key: string, data: T): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([DB_CONFIG.STORES.CACHE], 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.STORES.CACHE);

    const item: IndexedDBItem<T> = {
      id: key,
      data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error(`Failed to save data: ${request.error?.message || 'Unknown error'}`));
    });
  }

  // 获取数据
  async getItem<T>(key: string): Promise<T | null> {
    const db = await this.openDB();
    const transaction = db.transaction([DB_CONFIG.STORES.CACHE], 'readonly');
    const store = transaction.objectStore(DB_CONFIG.STORES.CACHE);

    return new Promise((resolve, reject) => {
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result as IndexedDBItem<T> | undefined;
        resolve(result ? result.data : null);
      };

      request.onerror = () =>
        reject(new Error(`Failed to get data: ${request.error?.message || 'Unknown error'}`));
    });
  }

  // 删除数据
  async removeItem(key: string): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([DB_CONFIG.STORES.CACHE], 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.STORES.CACHE);

    return new Promise((resolve, reject) => {
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error(`Failed to remove data: ${request.error?.message || 'Unknown error'}`));
    });
  }

  // 清空存储
  async clear(): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([DB_CONFIG.STORES.CACHE], 'readwrite');
    const store = transaction.objectStore(DB_CONFIG.STORES.CACHE);

    return new Promise((resolve, reject) => {
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error(`Failed to clear store: ${request.error?.message || 'Unknown error'}`));
    });
  }

  // 获取所有键名
  async getAllKeys(): Promise<string[]> {
    const db = await this.openDB();
    const transaction = db.transaction([DB_CONFIG.STORES.CACHE], 'readonly');
    const store = transaction.objectStore(DB_CONFIG.STORES.CACHE);

    return new Promise((resolve, reject) => {
      const request = store.getAllKeys();

      request.onsuccess = () => resolve(request.result as string[]);
      request.onerror = () =>
        reject(new Error(`Failed to get keys: ${request.error?.message || 'Unknown error'}`));
    });
  }
}
