/**
 * @description: Toast 类型定义
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

export interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
}
