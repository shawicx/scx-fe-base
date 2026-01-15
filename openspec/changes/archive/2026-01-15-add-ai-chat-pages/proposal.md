# Proposal: add-ai-chat-pages

## Why

当前项目已有完整的 AI 服务 API，但缺少前端界面让用户配置和使用 AI 功能。添加这两个页面可以让用户方便地配置 AI 模型、API Key，并与 AI 进行对话交互。

## What Changes

- 添加 AI 配置页面 (`/ai/config`)，支持配置多个 AI 提供商的 API Key 和默认提供商
- 添加 AI 对话页面 (`/ai/chat`)，支持与 AI 进行多轮对话
- 在 `src/App.tsx` 中添加新路由

## Impact

- 受影响的规范: `ai-config-page`, `ai-chat-page`
- 受影响的代码: `src/App.tsx`, 新增 `src/routes/ai-config.tsx` 和 `src/routes/ai-chat.tsx`

## Summary

添加两个新的 AI 功能页面：

1. **AI 配置页面** (`/ai/config`) - 允许用户配置 AI 模型和 API Key
2. **AI 对话页面** (`/ai/chat`) - 允许用户与 AI 进行对话交互

## Motivation

当前项目已有完整的 AI 服务 API（AIFuWu），包括：

- 配置管理（`putAiConfigApi`）
- 连接测试（`postAiTestConnectionApi`）
- 提供商列表（`getAiProvidersApi`）
- AI 对话（`postAiCompletionApi`）
- 请求历史（`getAiRequestsApi`）

但缺少前端界面来使用这些功能。添加这两个页面可以让用户方便地配置和使用 AI 功能。

## Goals

1. 提供用户友好的 AI 配置界面
2. 支持配置多个 AI 提供商的 API Key
3. 支持设置默认提供商
4. 提供 API Key 连接测试功能
5. 提供流畅的 AI 对话体验
6. 支持查看对话历史

## Non-Goals

1. 不支持流式响应（streaming response）
2. 不支持多语言界面（仅中文）
3. 不支持对话保存和管理（仅实时对话）
4. 不支持文件上传或图像识别
5. 不支持系统提示词配置

## Proposed Solution

### AI 配置页面 (`/ai/config`)

**功能特性：**

- 获取可用 AI 提供商列表（`getAiProvidersApi`）
- 为每个提供商配置 API Key
- 设置默认提供商
- 测试 API Key 连接（`postAiTestConnectionApi`）
- 保存配置（`putAiConfigApi`）
- 表单验证（API Key 不能为空）

**UI 组件：**

- 提供商选择下拉框
- API Key 输入框（带显示/隐藏功能）
- 默认提供商单选框
- 测试连接按钮
- 保存配置按钮
- 加载状态指示器

### AI 对话页面 (`/ai/chat`)

**功能特性：**

- 显示聊天消息列表
- 发送消息（`postAiCompletionApi`）
- 显示 AI 响应
- 支持多轮对话（维护消息历史）
- 加载状态指示
- 错误处理和提示
- 跳转到配置页面（如果未配置）

**UI 组件：**

- 消息列表容器（滚动区域）
- 消息气泡（用户/AI 区分样式）
- 消息输入框（多行文本）
- 发送按钮
- 配置链接（跳转到配置页面）

## Open Questions

1. AI 对话是否需要分页显示历史记录？
2. 是否需要支持清除对话历史的功能？
3. 配置页面是否需要支持更多 AI 参数（如 temperature、maxTokens）？
4. 是否需要在配置页面显示已配置的提供商信息？
5. 对话消息是否需要支持 Markdown 渲染？

## Dependencies

### 内部依赖

- AIFuWu 服务接口（已存在）
- Toast 组件（已存在，用于显示消息）
- IndexedDB 存储访问令牌（已存在）

### 外部依赖

- 无新的外部依赖

## Impact Analysis

### 受影响的文件

- `src/App.tsx` - 添加两个新路由
- `src/routes/` - 新增两个页面组件

### 不受影响的文件

- 现有的服务层代码
- 现有的工具函数
- 现有的 hooks

### 向后兼容性

- 此变更不破坏任何现有功能
- 仅新增路由和页面

## Alternatives Considered

### 选项 1：单页面设计

将配置和对话功能合并到一个页面，使用标签页切换。

**优点：**

- 减少路由数量
- 用户体验更连贯

**缺点：**

- 页面复杂度增加
- 不符合用户明确要求（"分成2个页面"）

**选择：** 不采纳，用户明确要求分成两个页面

### 选项 2：支持流式响应

使用 Server-Sent Events 或 WebSocket 实现实时流式响应。

**优点：**

- 用户体验更好
- 减少等待时间

**缺点：**

- 需要后端支持
- 实现复杂度较高
- 当前 API 不支持

**选择：** 不采纳，超出当前需求范围

### 选项 3：使用第三方 UI 库

使用现成的聊天 UI 组件库。

**优点：**

- 开发速度快
- 样式统一

**缺点：**

- 引入额外依赖
- 不符合项目使用 UnoCSS 的约定

**选择：** 不采纳，应使用 UnoCSS 实现样式

## Success Criteria

1. ✅ 用户可以在配置页面成功添加 API Key
2. ✅ 用户可以在配置页面测试 API Key 连接
3. ✅ 用户可以在配置页面设置默认提供商
4. ✅ 用户可以在对话页面发送消息并收到 AI 响应
5. ✅ 对话支持多轮上下文
6. ✅ 所有操作都有适当的错误提示
7. ✅ 页面样式使用 UnoCSS 实现
8. ✅ 代码通过 lint 和 typecheck 检查

## Implementation Plan

详见 `tasks.md`

## Related Specs

- `ai-config-page/spec.md` - AI 配置页面规范
- `ai-chat-page/spec.md` - AI 对话页面规范
