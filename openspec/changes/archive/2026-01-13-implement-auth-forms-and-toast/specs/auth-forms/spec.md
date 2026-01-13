# 认证表单规范

## ADDED Requirements

### Requirement: 登录表单 MUST 支持密码登录和验证码登录

登录表单 MUST 提供两种登录方式，用户可以通过标签页切换。

#### Scenario: 用户使用密码登录

**Given** 用户访问 `/login` 页面
**And** 用户在"密码登录"标签页
**When** 用户输入邮箱 `user@example.com`
**And** 用户输入密码 `password123`
**And** 用户点击"登录"按钮
**Then** 调用 `useAuth.login({ email: 'user@example.com', password: 'password123' })`
**And** 登录成功后跳转到首页（或保持登录状态）

#### Scenario: 用户使用验证码登录

**Given** 用户访问 `/login` 页面
**And** 用户切换到"验证码登录"标签页
**When** 用户输入邮箱 `user@example.com`
**And** 用户点击"发送验证码"按钮
**Then** 调用 `useAuth.sendVerificationCode('user@example.com')`
**And** 开始 60 秒倒计时
**When** 用户输入收到的验证码
**And** 用户点击"登录"按钮
**Then** 调用 `useAuth.loginWithCode({ email: 'user@example.com', emailVerificationCode: '123456' })`
**And** 登录成功后跳转到首页

---

### Requirement: 登录表单 MUST 支持表单验证

所有输入字段 MUST 使用 Zod schema 进行验证，验证错误 MUST 显示在字段下方。

#### Scenario: 用户提交空的密码登录表单

**Given** 用户在"密码登录"标签页
**When** 用户不输入任何内容直接点击"登录"
**Then** 显示邮箱验证错误"邮箱格式不正确"
**And** 显示密码验证错误"密码至少 6 位"

#### Scenario: 用户提交无效的邮箱格式

**Given** 用户在"密码登录"标签页
**When** 用户输入邮箱 `invalid-email`
**And** 用户输入密码 `password123`
**And** 用户点击"登录"
**Then** 显示邮箱验证错误"邮箱格式不正确"
**And** 不会调用登录 API

#### Scenario: 用户提交长度不足的密码

**Given** 用户在"密码登录"标签页
**When** 用户输入邮箱 `user@example.com`
**And** 用户输入密码 `123`
**And** 用户点击"登录"
**Then** 显示密码验证错误"密码至少 6 位"
**And** 不会调用登录 API

---

### Requirement: 登录表单 MUST 支持"记住我"功能

用户 MUST 能够选择记住登录状态。

#### Scenario: 用户勾选"记住我"

**Given** 用户在"密码登录"标签页
**When** 用户勾选"记住我"复选框
**And** 用户成功登录
**Then** 访问令牌应该在 7 天内有效（根据 cookie 设置）

---

### Requirement: 登录表单 MUST 显示加载状态

当登录请求进行时，按钮 MUST 显示加载状态，防止重复提交。

#### Scenario: 登录请求进行时

**Given** 用户点击"登录"按钮
**When** 登录 API 请求正在进行
**Then** "登录"按钮显示加载状态（禁用，显示加载动画或文字）
**And** 用户无法再次点击按钮

#### Scenario: 登录请求完成

**Given** 登录 API 请求完成（成功或失败）
**When** 响应返回
**Then** "登录"按钮恢复正常状态
**And** 用户可以再次点击按钮

---

### Requirement: 登录表单 MUST 处理 API 错误

当登录 API 返回错误时，MUST 通过 Toast 显示错误消息。

#### Scenario: 登录 API 返回错误

**Given** 用户提交登录表单
**When** API 返回错误（如密码错误）
**Then** 通过 `toast.error()` 显示错误消息
**And** 错误消息来自 API 响应或默认错误消息

---

### Requirement: 登录表单 MUST 提供导航链接

用户 MUST 能够从登录页跳转到注册和忘记密码页面。

#### Scenario: 用户点击"忘记密码"链接

**Given** 用户在"密码登录"标签页
**When** 用户点击"忘记密码"链接
**Then** 导航到 `/reset-password` 页面

#### Scenario: 用户点击"立即注册"链接

**Given** 用户在登录页面底部
**When** 用户点击"还没有账号？立即注册"链接
**Then** 导航到 `/register` 页面

---

### Requirement: 注册表单 MUST 包含所有必要字段

注册表单 MUST 包含邮箱、验证码、密码和确认密码字段。

#### Scenario: 用户填写完整注册表单

**Given** 用户访问 `/register` 页面
**When** 用户输入邮箱 `user@example.com`
**And** 用户点击"发送验证码"按钮
**And** 用户输入验证码 `123456`
**And** 用户输入密码 `password123`
**And** 用户输入确认密码 `password123`
**And** 用户点击"注册"按钮
**Then** 调用 `useAuth.register({ email: 'user@example.com', password: 'password123', emailVerificationCode: '123456' })`
**And** 注册成功后跳转到首页（或显示成功消息）

---

### Requirement: 注册表单 MUST 验证密码一致性

用户输入的密码和确认密码 MUST 一致。

#### Scenario: 用户输入不一致的密码

**Given** 用户在注册页面
**When** 用户输入密码 `password123`
**And** 用户输入确认密码 `password456`
**And** 用户点击"注册"按钮
**Then** 显示确认密码验证错误"两次密码不一致"
**And** 不会调用注册 API

---

### Requirement: 注册表单 MUST 支持验证码倒计时

验证码发送后，MUST 显示倒计时，防止用户重复发送。

#### Scenario: 验证码发送后开始倒计时

**Given** 用户在注册页面
**When** 用户点击"发送验证码"按钮
**Then** "发送验证码"按钮变为禁用状态
**And** 显示倒计时"60秒后重试"
**And** 每秒倒计时减 1
**When** 倒计时结束后
**Then** 按钮恢复正常状态，显示"发送验证码"

---

### Requirement: 注册表单 MUST 提供登录链接

用户 MUST 能够从注册页跳转到登录页面。

#### Scenario: 用户点击"立即登录"链接

**Given** 用户在注册页面底部
**When** 用户点击"已有账号？立即登录"链接
**Then** 导航到 `/login` 页面

---

### Requirement: 忘记密码表单 MUST 实现静态 UI

忘记密码表单 MUST 显示所有字段，但不调用任何 API。

#### Scenario: 用户访问忘记密码页面

**Given** 用户访问 `/reset-password` 页面
**When** 页面渲染
**Then** 显示邮箱输入框
**And** 显示验证码输入框（带发送按钮）
**And** 显示新密码输入框
**And** 显示确认密码输入框
**And** 显示"提交"按钮

#### Scenario: 用户提交忘记密码表单

**Given** 用户在忘记密码页面
**When** 用户填写所有字段
**And** 用户点击"提交"按钮
**Then** 验证表单字段
**And** 验证通过后显示模拟成功消息（不调用 API）
**And** 可以通过 `toast.success()` 显示"密码重置成功"

---

### Requirement: 忘记密码表单 MUST 支持表单验证

即使不调用 API，MUST 验证表单字段的正确性。

#### Scenario: 用户提交空的忘记密码表单

**Given** 用户在忘记密码页面
**When** 用户不输入任何内容直接点击"提交"
**Then** 显示邮箱验证错误"邮箱格式不正确"
**And** 显示验证码验证错误"验证码为 6 位"
**And** 显示密码验证错误"密码至少 6 位"
**And** 显示确认密码验证错误"两次密码不一致"

---

### Requirement: 忘记密码表单 MUST 提供返回登录链接

用户 MUST 能够从忘记密码页返回登录页面。

#### Scenario: 用户点击"返回登录"链接

**Given** 用户在忘记密码页面底部
**When** 用户点击"返回登录"链接
**Then** 导航到 `/login` 页面

---

### Requirement: 所有认证表单 MUST 使用 UnoCSS 实现样式

所有表单的样式 MUST 使用 UnoCSS 类名，不允许使用 CSS 文件。

#### Scenario: 表单容器样式

**Given** 任何认证表单（登录、注册、忘记密码）
**When** 表单容器渲染
**Then** 使用 `min-h-screen` 设置全屏高度
**And** 使用 `flex` 和 `items-center` 和 `justify-center` 实现居中
**And** 使用 `bg-gray-50` 设置背景色
**And** 使用 `w-full` 和 `max-w-md` 设置卡片宽度
**And** 使用 `bg-white` 设置卡片背景
**And** 使用 `rounded-xl` 设置圆角
**And** 使用 `shadow-lg` 添加阴影
**And** 使用 `p-8` 设置内边距

#### Scenario: 表单输入框样式

**Given** 任何输入框
**When** 输入框渲染
**Then** 使用 `w-full` 设置全宽
**And** 使用 `px-4` 和 `py-2` 设置内边距
**And** 使用 `border` 和 `border-gray-300` 设置边框
**And** 使用 `rounded-lg` 设置圆角
**And** 使用 `focus:outline-none` 和 `focus:ring-2` 和 `focus:ring-blue-500` 设置聚焦样式

#### Scenario: 表单按钮样式

**Given** 任何主要按钮（登录、注册、提交）
**When** 按钮渲染
**Then** 使用 `w-full` 设置全宽
**And** 使用 `py-2` 和 `px-4` 设置内边距
**And** 使用 `bg-blue-600` 设置蓝色背景
**And** 使用 `text-white` 设置白色文字
**And** 使用 `rounded-lg` 设置圆角
**And** 使用 `hover:bg-blue-700` 设置悬停效果
**And** 使用 `disabled:bg-gray-400` 设置禁用状态

---

### Requirement: 所有认证表单 MUST 集成 useAuth hook

表单 MUST 使用 `useAuth` hook 提供的方法进行认证操作。

#### Scenario: 登录表单使用 useAuth

**Given** 用户在登录页面
**When** 用户提交登录表单
**Then** 密码登录调用 `useAuth.login(params)`
**And** 验证码登录调用 `useAuth.loginWithCode(params)`
**And** 发送验证码调用 `useAuth.sendVerificationCode(email)`

#### Scenario: 注册表单使用 useAuth

**Given** 用户在注册页面
**When** 用户提交注册表单
**Then** 调用 `useAuth.register(params)`
**And** 发送验证码调用 `useAuth.sendVerificationCode(email)`

---

### Requirement: 所有认证表单 MUST 显示加载状态

当 API 请求进行时，按钮 MUST 显示加载状态。

#### Scenario: API 请求进行时显示加载状态

**Given** 用户点击任何提交按钮（登录、注册、发送验证码）
**When** API 请求正在进行
**Then** 按钮显示加载状态（禁用，显示加载动画或文字）
**And** 用户无法再次点击按钮

---

## Cross-Reference

- **Toast 组件规范** (`specs/toast-component/spec.md`) - 认证表单使用 Toast 显示错误和成功消息
- **useAuth Hook** (`../../../src/hooks/use-auth.ts`) - 认证 API 调用方法
- **Zod Schemas** (`../../../src/lib/schemas.ts`) - 表单验证规则
- **项目约定** (`../project.md`) - 代码风格、UnoCSS 使用规范
