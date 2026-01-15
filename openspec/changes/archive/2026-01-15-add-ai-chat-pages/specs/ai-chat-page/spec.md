# ai-chat-page Specification

## Purpose

定义 AI 对话页面的功能需求和用户交互规范，允许用户与 AI 进行多轮对话。

## ADDED Requirements

### Requirement: AI 对话页面 MUST 显示消息列表

页面 MUST 显示对话消息列表，包括用户消息和 AI 响应。

#### Scenario: 页面加载时显示消息列表

**Given** 用户访问 `/ai/chat` 页面
**When** 页面开始加载
**Then** 显示消息列表容器
**And** 初始时显示欢迎消息或空状态提示

#### Scenario: 消息列表可滚动

**Given** 消息列表包含多条消息
**When** 消息数量超过容器高度
**Then** 显示滚动条
**And** 用户可以滚动查看历史消息

#### Scenario: 新消息自动滚动到底部

**Given** 消息列表已滚动到某个位置
**When** 新消息添加到列表
**Then** 自动滚动到列表底部
**And** 显示最新消息

---

### Requirement: AI 对话页面 MUST 区分用户和 AI 消息

用户消息和 AI 消息 MUST 使用不同的样式显示。

#### Scenario: 显示用户消息

**Given** 用户发送消息"你好"
**When** 消息添加到列表
**Then** 用户消息靠右显示
**And** 使用蓝色背景
**And** 白色文字
**And** 消息气泡圆角为右上角和左上角较小

#### Scenario: 显示 AI 消息

**Given** AI 响应消息"你好！有什么可以帮助你的？"
**When** 消息添加到列表
**Then** AI 消息靠左显示
**And** 使用灰色背景
**And** 黑色文字
**And** 消息气泡圆角为左下角和右下角较小

---

### Requirement: AI 对话页面 MUST 提供消息输入功能

用户 MUST 能够输入和发送消息。

#### Scenario: 用户输入消息

**Given** 用户在对话页面
**When** 用户在消息输入框中输入"你好"
**Then** 输入框显示输入的文字

#### Scenario: 用户发送消息（点击按钮）

**Given** 用户已输入消息"你好"
**When** 用户点击"发送"按钮
**Then** 消息显示在消息列表中
**And** 输入框清空
**And** 调用 `postAiCompletionApi` 发送消息

#### Scenario: 用户发送消息（回车键）

**Given** 用户已输入消息"你好"
**When** 用户按下 Enter 键
**Then** 消息显示在消息列表中
**And** 输入框清空
**And** 调用 `postAiCompletionApi` 发送消息

#### Scenario: 用户换行（Shift+Enter）

**Given** 用户正在输入消息
**When** 用户按下 Shift+Enter 组合键
**Then** 输入框换行
**And** 不发送消息

#### Scenario: 输入框高度自适应

**Given** 用户输入多行文本
**When** 文本超过输入框初始高度
**Then** 输入框高度自动增加
**And** 最大高度为 200px（超出时显示滚动条）

---

### Requirement: AI 对话页面 MUST 支持多轮对话

系统 MUST 维护对话历史，支持多轮对话上下文。

#### Scenario: 发送第一条消息

**Given** 对话历史为空
**When** 用户发送消息"你好"
**Then** 调用 `postAiCompletionApi({ messages: [{ role: 'user', content: '你好' }] })`
**And** 保存用户消息到历史记录

#### Scenario: AI 响应后继续对话

**Given** 对话历史包含用户消息和 AI 响应
**When** 用户发送第二条消息"你是谁？"
**Then** 调用 `postAiCompletionApi({ messages: [{ role: 'user', content: '你好' }, { role: 'assistant', content: '你好！...' }, { role: 'user', content: '你是谁？' }] })`
**And** 保存完整的对话历史

---

### Requirement: AI 对话页面 MUST 显示加载状态

当等待 AI 响应时，MUST 显示加载指示器。

#### Scenario: 发送消息后显示加载状态

**Given** 用户发送消息
**When** 等待 AI 响应
**Then** 在消息列表底部显示加载指示器
**And** 加载指示器为旋转动画或省略号动画
**And** 禁用发送按钮
**And** 禁用输入框

#### Scenario: AI 响应完成后隐藏加载状态

**Given** 正在显示加载指示器
**When** AI 响应返回
**Then** 移除加载指示器
**And** 启用发送按钮
**And** 启用输入框

---

### Requirement: AI 对话页面 MUST 处理 API 错误

当 API 请求失败时，MUST 显示错误消息。

#### Scenario: AI API 返回错误

**Given** 用户发送消息
**When** API 返回错误（如 API Key 无效）
**Then** 使用 `toast.error()` 显示错误消息
**And** 错误消息为"AI 响应失败：[错误详情]"
**And** 移除加载指示器
**And** 启用发送按钮
**And** 显示"配置 API Key"链接

#### Scenario: 用户点击"配置 API Key"链接

**Given** 显示"配置 API Key"链接
**When** 用户点击链接
**Then** 导航到 `/ai/config` 页面

---

### Requirement: AI 对话页面 MUST 使用 UnoCSS 实现样式

所有样式 MUST 使用 UnoCSS 类名，不允许使用 CSS 文件。

#### Scenario: 页面容器样式

**Given** AI 对话页面组件
**When** 页面容器渲染
**Then** 使用 `h-screen` 设置全屏高度
**And** 使用 `flex` 和 `flex-col` 实现垂直布局
**And** 使用 `bg-gray-50` 设置背景色

#### Scenario: 消息列表容器样式

**Given** 消息列表容器
**When** 容器渲染
**Then** 使用 `flex-1` 设置弹性高度
**And** 使用 `overflow-y-auto` 设置垂直滚动
**And** 使用 `p-4` 设置内边距
**And** 使用 `space-y-4` 设置消息间距

#### Scenario: 用户消息气泡样式

**Given** 用户消息气泡
**When** 气泡渲染
**Then** 使用 `self-end` 或 `ml-auto` 靠右对齐
**And** 使用 `max-w-[70%]` 设置最大宽度
**And** 使用 `bg-blue-600` 设置蓝色背景
**And** 使用 `text-white` 设置白色文字
**And** 使用 `px-4` 和 `py-2` 设置内边距
**And** 使用 `rounded-2xl` 设置圆角
**And** 使用 `rounded-br-sm` 调整右下角圆角

#### Scenario: AI 消息气泡样式

**Given** AI 消息气泡
**When** 气泡渲染
**Then** 使用 `self-start` 靠左对齐
**And** 使用 `max-w-[70%]` 设置最大宽度
**And** 使用 `bg-gray-200` 设置灰色背景
**And** 使用 `text-gray-900` 设置深色文字
**And** 使用 `px-4` 和 `py-2` 设置内边距
**And** 使用 `rounded-2xl` 设置圆角
**And** 使用 `rounded-bl-sm` 调整左下角圆角

#### Scenario: 输入区域容器样式

**Given** 输入区域容器
**When** 容器渲染
**Then** 使用 `border-t` 和 `border-gray-200` 添加顶部边框
**And** 使用 `bg-white` 设置白色背景
**And** 使用 `p-4` 设置内边距

#### Scenario: 输入框样式

**Given** 消息输入框
**When** 输入框渲染
**Then** 使用 `w-full` 设置全宽
**And** 使用 `px-4` 和 `py-2` 设置内边距
**And** 使用 `border` 和 `border-gray-300` 设置边框
**And** 使用 `rounded-lg` 设置圆角
**And** 使用 `resize-none` 禁用手动调整大小
**And** 使用 `focus:outline-none` 和 `focus:ring-2` 和 `focus:ring-blue-500` 设置聚焦样式

#### Scenario: 发送按钮样式

**Given** 发送按钮
**When** 按钮渲染
**Then** 使用 `ml-2` 设置左边距
**And** 使用 `px-6` 和 `py-2` 设置内边距
**And** 使用 `bg-blue-600` 设置蓝色背景
**And** 使用 `text-white` 设置白色文字
**And** 使用 `rounded-lg` 设置圆角
**And** 使用 `hover:bg-blue-700` 设置悬停效果
**And** 使用 `disabled:bg-gray-400` 设置禁用状态

---

### Requirement: AI 对话页面 MUST 提供导航到配置页面

用户 MUST 能够从对话页面跳转到配置页面。

#### Scenario: 用户点击"配置 AI"链接

**Given** 用户在对话页面
**When** 用户点击页面顶部或侧边的"配置 AI"链接
**Then** 导航到 `/ai/config` 页面

---

### Requirement: AI 对话页面 MUST 支持清空对话历史（可选）

用户 MUST 能够清空当前的对话历史。

#### Scenario: 用户点击"清空对话"按钮

**Given** 用户在对话页面
**When** 用户点击"清空对话"按钮
**Then** 显示确认对话框
**And** 确认对话框提示"确定要清空对话历史吗？"

#### Scenario: 用户确认清空对话

**Given** 显示确认对话框
**When** 用户点击"确定"按钮
**Then** 清空消息列表
**And** 重置对话历史
**And** 显示欢迎消息或空状态提示

#### Scenario: 用户取消清空对话

**Given** 显示确认对话框
**When** 用户点击"取消"按钮
**Then** 关闭确认对话框
**And** 保留对话历史

---

### Requirement: AI 对话页面 MUST 显示欢迎消息

页面首次加载时，MUST 显示欢迎消息或使用提示。

#### Scenario: 页面首次加载

**Given** 用户首次访问 `/ai/chat` 页面
**When** 页面加载完成
**Then** 显示欢迎消息"欢迎使用 AI 对话！有什么可以帮助你的？"
**And** 欢迎消息使用 AI 消息样式显示

#### Scenario: 消息列表为空时显示提示

**Given** 对话历史为空
**When** 页面加载完成
**Then** 显示空状态提示
**And** 提示消息为"开始新的对话吧！"
**And** 提供配置 API Key 的链接（如果未配置）
