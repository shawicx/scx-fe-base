# ai-config-page Specification

## Purpose

TBD - created by archiving change add-ai-chat-pages. Update Purpose after archive.

## Requirements

### Requirement: AI 配置页面 MUST 显示可用提供商列表

页面 MUST 自动获取并显示可用的 AI 提供商列表。

#### Scenario: 页面加载时获取提供商列表

**Given** 用户访问 `/ai/config` 页面
**When** 页面开始加载
**Then** 调用 `getAiProvidersApi()` 获取可用提供商
**And** 显示加载指示器

#### Scenario: 成功显示提供商列表

**Given** 页面已加载
**When** API 返回提供商列表 `[{ id: 'openai', name: 'OpenAI' }, { id: 'anthropic', name: 'Anthropic' }]`
**Then** 在页面上显示每个提供商的配置区域
**And** 每个区域显示提供商名称和 API Key 输入框

#### Scenario: 获取提供商列表失败

**Given** 页面正在加载
**When** API 返回错误
**Then** 使用 `toast.error()` 显示错误消息
**And** 错误消息为"获取提供商列表失败"

---

### Requirement: AI 配置页面 MUST 提供 API Key 输入功能

用户 MUST 能够为每个提供商输入 API Key。

#### Scenario: 用户输入 API Key

**Given** 用户在配置页面
**When** 用户在 OpenAI 提供商的 API Key 输入框中输入 `sk-xxxxxxxx`
**Then** 输入框显示输入的 API Key
**And** 默认隐藏 API Key（显示为圆点或星号）

#### Scenario: 用户切换显示/隐藏 API Key

**Given** 用户已输入 API Key
**When** 用户点击"显示"按钮
**Then** API Key 以明文显示
**When** 用户再次点击"隐藏"按钮
**Then** API Key 隐藏显示

#### Scenario: API Key 验证

**Given** 用户点击"保存配置"按钮
**When** 某个提供商的 API Key 为空
**Then** 显示验证错误"API Key 不能为空"
**And** 不会调用保存 API

---

### Requirement: AI 配置页面 MUST 支持设置默认提供商

用户 MUST 能够设置默认的 AI 提供商。

#### Scenario: 用户选择默认提供商

**Given** 用户在配置页面
**When** 用户选择 OpenAI 作为默认提供商
**Then** OpenAI 提供商被标记为默认
**And** 保存配置时包含默认提供商信息

#### Scenario: 切换默认提供商

**Given** 用户已选择 OpenAI 作为默认提供商
**When** 用户切换到 Anthropic 作为默认提供商
**Then** OpenAI 不再是默认提供商
**And** Anthropic 成为默认提供商

---

### Requirement: AI 配置页面 MUST 支持测试 API Key 连接

用户 MUST 能够测试配置的 API Key 是否有效。

#### Scenario: 用户测试 API Key 连接

**Given** 用户已输入 OpenAI 的 API Key
**When** 用户点击 OpenAI 区域的"测试连接"按钮
**Then** 调用 `postAiTestConnectionApi({ provider: 'openai' })`
**And** 按钮显示加载状态
**And** 按钮禁用

#### Scenario: 测试连接成功

**Given** 用户正在测试连接
**When** API 返回成功响应
**Then** 使用 `toast.success()` 显示成功消息
**And** 成功消息为"OpenAI 连接成功"
**And** 按钮恢复正常状态

#### Scenario: 测试连接失败

**Given** 用户正在测试连接
**When** API 返回错误（如 API Key 无效）
**Then** 使用 `toast.error()` 显示错误消息
**And** 错误消息为"OpenAI 连接失败：[错误详情]"
**And** 按钮恢复正常状态

---

### Requirement: AI 配置页面 MUST 支持保存配置

用户 MUST 能够保存配置的 API Key 和默认提供商。

#### Scenario: 用户保存配置

**Given** 用户已输入所有必要的 API Key
**And** 用户已选择默认提供商
**When** 用户点击"保存配置"按钮
**Then** 调用 `putAiConfigApi({ defaultProvider: 'openai', providers: { openai: { apiKey: 'sk-xxx' } } })`
**And** 按钮显示加载状态
**And** 按钮禁用

#### Scenario: 保存配置成功

**Given** 用户正在保存配置
**When** API 返回成功响应
**Then** 使用 `toast.success()` 显示成功消息
**And** 成功消息为"配置保存成功"
**And** 按钮恢复正常状态
**And** 可选：跳转到 `/ai/chat` 页面

#### Scenario: 保存配置失败

**Given** 用户正在保存配置
**When** API 返回错误
**Then** 使用 `toast.error()` 显示错误消息
**And** 错误消息为"配置保存失败：[错误详情]"
**And** 按钮恢复正常状态
**And** 配置保留在表单中

---

### Requirement: AI 配置页面 MUST 使用 UnoCSS 实现样式

所有样式 MUST 使用 UnoCSS 类名，不允许使用 CSS 文件。

#### Scenario: 页面容器样式

**Given** AI 配置页面组件
**When** 页面容器渲染
**Then** 使用 `min-h-screen` 设置全屏高度
**And** 使用 `flex` 和 `flex-col` 实现垂直布局
**And** 使用 `items-center` 居中内容
**And** 使用 `bg-gray-50` 设置背景色
**And** 使用 `p-8` 设置外边距

#### Scenario: 配置卡片样式

**Given** 提供商配置区域
**When** 配置卡片渲染
**Then** 使用 `w-full` 和 `max-w-2xl` 设置宽度
**And** 使用 `bg-white` 设置白色背景
**And** 使用 `rounded-xl` 设置圆角
**And** 使用 `shadow-lg` 添加阴影
**And** 使用 `p-6` 设置内边距
**And** 使用 `mb-4` 设置下边距

#### Scenario: 输入框样式

**Given** API Key 输入框
**When** 输入框渲染
**Then** 使用 `w-full` 设置全宽
**And** 使用 `px-4` 和 `py-2` 设置内边距
**And** 使用 `border` 和 `border-gray-300` 设置边框
**And** 使用 `rounded-lg` 设置圆角
**And** 使用 `focus:outline-none` 和 `focus:ring-2` 和 `focus:ring-blue-500` 设置聚焦样式

#### Scenario: 按钮样式

**Given** 主要按钮（保存配置）
**When** 按钮渲染
**Then** 使用 `w-full` 设置全宽
**And** 使用 `py-2` 和 `px-4` 设置内边距
**And** 使用 `bg-blue-600` 设置蓝色背景
**And** 使用 `text-white` 设置白色文字
**And** 使用 `rounded-lg` 设置圆角
**And** 使用 `hover:bg-blue-700` 设置悬停效果
**And** 使用 `disabled:bg-gray-400` 设置禁用状态

---

### Requirement: AI 配置页面 MUST 提供导航到对话页面

用户 MUST 能够从配置页面跳转到对话页面。

#### Scenario: 用户点击"前往对话"链接

**Given** 用户在配置页面
**When** 用户点击"前往对话"链接
**Then** 导航到 `/ai/chat` 页面

---

### Requirement: AI 配置页面 MUST 处理加载和错误状态

页面 MUST 在加载和错误情况下提供适当的反馈。

#### Scenario: API 请求进行时显示加载状态

**Given** API 请求正在进行（获取列表、测试连接、保存配置）
**When** 请求未完成
**Then** 显示加载指示器（如旋转动画或加载文字）
**And** 相关按钮禁用

#### Scenario: API 错误显示详细错误信息

**Given** API 请求返回错误
**When** 错误响应包含详细信息
**Then** 使用 `toast.error()` 显示错误消息
**And** 错误消息包含 API 返回的错误详情
