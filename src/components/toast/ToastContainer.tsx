/**
 * @description: Toast 容器组件
 */
import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { ToastOptions } from './types';
import { Toast } from './Toast';

export interface ToastItem extends ToastOptions {
  id: string;
}

let toastIdCounter = 0;

export function ToastContainer(): React.ReactElement {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useMemo(() => {
    return {
      show: (options: ToastOptions) => {
        const id = `toast-${toastIdCounter++}`;
        const newItem: ToastItem = { id, ...options };
        setToasts((prev) => [...prev, newItem]);

        if (options.duration !== 0) {
          const duration = options.duration ?? 3000;
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
          }, duration);
        }

        return id;
      },
      close: (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      },
    };
  }, []);

  useEffect(() => {
    (window as any).__toast = toast;
  }, [toast]);

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto animate-slide-in-right">
          <Toast
            id={t.id}
            type={t.type ?? 'info'}
            title={t.title}
            description={t.description}
            onClose={() => toast.close(t.id)}
          />
        </div>
      ))}
    </div>,
    document.body
  );
}
