/**
 * @description AiRequestOptionsDto
 */
export interface AiRequestOptionsDto {
  /** @description 温度(0-2)，控制随机性 */
  temperature?: number;
  /** @description 最大生成的token数 */
  maxTokens?: number;
  /** @description Top P采样(0-1) */
  topP?: number;
}
