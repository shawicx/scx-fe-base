/**
 * @description: Zod 表单验证示例
 */
import { z } from 'zod';

/**
 * 登录表单验证 Schema
 */
export const loginFormSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少 6 位'),
  rememberMe: z.boolean().optional(),
});

/**
 * 注册表单验证 Schema
 */
export const registerFormSchema = z
  .object({
    email: z.string().email('邮箱格式不正确'),
    password: z.string().min(6, '密码至少 6 位'),
    confirmPassword: z.string(),
    emailVerificationCode: z.string().length(6, '验证码为 6 位'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次密码不一致',
    path: ['confirmPassword'],
  });

/**
 * 重置密码表单验证 Schema
 */
export const resetPasswordFormSchema = z
  .object({
    email: z.string().email('邮箱格式不正确'),
    password: z.string().min(6, '密码至少 6 位'),
    confirmPassword: z.string(),
    emailVerificationCode: z.string().length(6, '验证码为 6 位'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次密码不一致',
    path: ['confirmPassword'],
  });

/**
 * 发送验证码表单验证 Schema
 */
export const sendVerificationCodeSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
});

/**
 * 导出类型
 */
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
export type SendVerificationCodeValues = z.infer<typeof sendVerificationCodeSchema>;

/**
 * 使用示例:
 *
 * const result = loginFormSchema.safeParse({
 *   email: 'user@example.com',
 *   password: '123456',
 *   rememberMe: true,
 * });
 *
 * if (result.success) {
 *   console.log('验证通过:', result.data);
 * } else {
 *   console.log('验证失败:', result.error.errors);
 * }
 */
