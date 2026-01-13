# 实现认证表单和 Toast 组件

## 摘要

本变更旨在完成用户认证流程的表单开发（登录、注册、忘记密码），并实现基于 UnoCSS 的 Toast 通知组件。登录表单将支持密码登录和验证码登录两种方式，通过标签页切换。忘记密码表单将先实现静态 UI，不调用 API。

## Why

当前项目缺少完整的用户认证界面，登录、注册和忘记密码页面仅有占位符。用户无法完成基本的认证流程，也无法获得友好的错误提示。实现完整的认证表单和 Toast 通知组件将为用户提供完整的认证体验，提升用户体验和开发效率。

## What Changes

1. 实现 Toast 通知组件
   - 支持多种消息类型
   - 支持自动消失和手动关闭
   - 支持多消息堆叠显示
   - 使用 React Portal 和 CSS 动画

2. 实现登录表单
   - 支持密码登录和验证码登录
   - 使用标签页切换登录方式
   - 集成表单验证和错误提示
   - 集成 `useAuth` hook

3. 实现注册表单
   - 包含邮箱、验证码、密码字段
   - 支持验证码倒计时
   - 集成表单验证和错误提示
   - 集成 `useAuth` hook

4. 实现忘记密码表单（静态 UI）
   - 包含完整的表单字段
   - 支持表单验证
   - 模拟成功提交

5. 更新 request.ts 集成 Toast 组件

## 动机

### 当前状态

- `src/routes/login.tsx`、`src/routes/register.tsx`、`src/routes/reset-password.tsx` 仅包含占位符
- `src/service/request.ts` 中的 `showMessage` 函数仅使用 `console.log`，需要实现真正的 toast 提示
- 已存在 `useAuth` hook 提供完整的认证 API 调用方法
- 已存在 Zod 验证 schema 用于表单验证

### 目标

1. 为用户提供完整、美观的认证表单界面
2. 实现统一的错误/成功消息提示机制
3. 遵循项目规范，使用 UnoCSS 进行样式实现

## 影响范围

### 新增功能

- Toast 通知组件（`src/components/toast/`）
- 认证表单组件：
  - 登录表单（支持密码/验证码切换）
  - 注册表单
  - 忘记密码表单（静态）

### 修改文件

- `src/routes/login.tsx` - 完整的登录表单
- `src/routes/register.tsx` - 完整的注册表单
- `src/routes/reset-password.tsx` - 完整的忘记密码表单
- `src/service/request.ts` - 集成 toast 组件

### 不涉及

- 后端 API（忘记密码暂时不调用）
- 测试（项目尚未配置测试框架）

## 依赖关系

### 前置条件

- 已存在 `useAuth` hook 提供认证 API
- 已存在 Zod schema 用于表单验证
- 已配置 UnoCSS

### 依赖变更

- 无外部依赖变更

### 并行工作

- Toast 组件开发可以与表单开发并行进行

## 风险与约束

### 技术约束

- 必须使用 UnoCSS 进行样式，不使用 CSS 文件
- 必须使用 TypeScript 严格模式
- 必须遵循项目代码风格（导入顺序、命名约定等）

### 设计决策

- Toast 组件将使用 React Portal 和 CSS 动画实现
- 表单将使用受控组件和 Zod 验证
- 登录表单使用标签页切换密码/验证码登录

### 潜在风险

- Toast 组件的响应式设计和动画效果需要仔细测试
- 表单验证错误信息的展示需要统一风格

## 验收标准

### Toast 组件

- [ ] 支持多种消息类型（success、error、warning、info）
- [ ] 支持自动消失和手动关闭
- [ ] 支持多消息堆叠显示
- [ ] 使用 UnoCSS 实现样式和动画

### 登录表单

- [ ] 支持密码登录（使用 `useAuth.login`）
- [ ] 支持验证码登录（使用 `useAuth.loginWithCode`）
- [ ] 使用标签页切换登录方式
- [ ] 表单验证使用 Zod schema
- [ ] 错误信息通过 Toast 显示

### 注册表单

- [ ] 使用 `useAuth.register` 进行注册
- [ ] 支持发送验证码（使用 `useAuth.sendVerificationCode`）
- [ ] 表单验证使用 Zod schema
- [ ] 错误信息通过 Toast 显示

### 忘记密码表单

- [ ] 完整的表单 UI（邮箱、验证码、新密码、确认密码）
- [ ] 表单验证使用 Zod schema
- [ ] 不调用 API，仅实现静态表单

## 相关规范

- [项目约定](../project.md) - 代码风格、命名约定、架构模式
- [代码风格指南](../../AGENTS.md) - 具体编码规范
- [Zod Schemas](../../src/lib/schemas.ts) - 表单验证定义
- [useAuth Hook](../../src/hooks/use-auth.ts) - 认证 API 调用
