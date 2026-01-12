import type { AiMessageDto } from '@/service/types/index';

/**
 * @description CompletionRequestDto
 */
export interface CompletionRequestDto {
  /** @description 消息列表 */
  messages: AiMessageDto[];
  /** @description 生成选项 */
  options?: any;
  /** @description 显式指定平台 */
  provider?: string;
}
