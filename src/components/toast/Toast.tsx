/**
 * @description: Toast 项组件
 */
import type { ToastProps, ToastType } from './types';

const typeStyles: Record<ToastType, string> = {
  success: 'border-l-4 border-green-500',
  error: 'border-l-4 border-red-500',
  warning: 'border-l-4 border-yellow-500',
  info: 'border-l-4 border-blue-500',
};

const typeIcons: Record<ToastType, string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

export function Toast({ type, title, description, onClose }: ToastProps): React.ReactElement {
  return (
    <div
      className={`${typeStyles[type]} bg-white shadow-lg rounded-lg p-4 min-w-[300px] max-w-md animate-slide-in-right flex justify-between items-start`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{typeIcons[type]}</span>
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        {description && <p className="text-sm text-gray-600 ml-7">{description}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 ml-4 leading-none"
          aria-label="关闭"
        >
          ×
        </button>
      )}
    </div>
  );
}
