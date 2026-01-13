/**
 * @description: Toast 组件入口
 */
import { ToastContainer } from './ToastContainer';
import type { ToastOptions } from './types';

function getToast() {
  const globalToast = (window as any).__toast;
  if (!globalToast) {
    throw new Error('未找到 ToastContainer。请确保 <ToastContainer /> 在您的组件树中。');
  }
  return globalToast;
}

const toastFn = function (options: ToastOptions): void {
  getToast().show(options);
};

toastFn.success = function (title: string, description?: string): void {
  getToast().show({ type: 'success', title, description });
};

toastFn.error = function (title: string, description?: string): void {
  getToast().show({ type: 'error', title, description });
};

toastFn.warning = function (title: string, description?: string): void {
  getToast().show({ type: 'warning', title, description });
};

toastFn.info = function (title: string, description?: string): void {
  getToast().show({ type: 'info', title, description });
};

export { toastFn as toast, ToastContainer };
