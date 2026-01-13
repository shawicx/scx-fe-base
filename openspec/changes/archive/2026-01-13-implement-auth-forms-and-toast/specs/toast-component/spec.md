# Toast 组件规范

## ADDED Requirements

### Requirement: Toast 组件 MUST 支持多种消息类型

Toast 组件 MUST 支持四种消息类型，每种类型有不同的视觉样式。

#### Scenario: 用户调用 toast.error 显示错误消息

**Given** 用户调用 `toast.error('登录失败', '用户名或密码错误')`
**When** Toast 组件渲染
**Then** 显示红色左边框的错误提示框
**And** 显示错误图标（❌）
**And** 显示标题"错误"
**And** 显示描述"用户名或密码错误"

#### Scenario: 用户调用 toast.success 显示成功消息

**Given** 用户调用 `toast.success('注册成功', '欢迎加入我们')`
**When** Toast 组件渲染
**Then** 显示绿色左边框的成功提示框
**And** 显示成功图标（✅）
**And** 显示标题"成功"
**And** 显示描述"欢迎加入我们"

#### Scenario: 用户调用 toast.warning 显示警告消息

**Given** 用户调用 `toast.warning('注意事项', '操作不可撤销')`
**When** Toast 组件渲染
**Then** 显示黄色左边框的警告提示框
**And** 显示警告图标（⚠️）
**And** 显示标题"警告"
**And** 显示描述"操作不可撤销"

#### Scenario: 用户调用 toast.info 显示信息消息

**Given** 用户调用 `toast.info('系统消息', '系统将在今晚维护')`
**When** Toast 组件渲染
**Then** 显示蓝色左边框的信息提示框
**And** 显示信息图标（ℹ️）
**And** 显示标题"提示"
**And** 显示描述"系统将在今晚维护"

---

### Requirement: Toast 组件 MUST 支持自动消失

Toast 消息 MUST 在指定时间后自动消失，默认为 3 秒。

#### Scenario: Toast 默认在 3 秒后消失

**Given** 用户调用 `toast.error('错误消息')`
**When** 3 秒后
**Then** Toast 消息自动从屏幕上移除

#### Scenario: 用户可以自定义消失时间

**Given** 用户调用 `toast({ type: 'success', title: '成功', duration: 5000 })`
**When** 5 秒后
**Then** Toast 消息自动从屏幕上移除

---

### Requirement: Toast 组件 MUST 支持手动关闭

用户 MUST 能够通过点击关闭按钮手动关闭 Toast 消息。

#### Scenario: 用户点击关闭按钮

**Given** 显示一个 Toast 消息
**When** 用户点击 Toast 右上角的关闭按钮（×）
**Then** Toast 消息立即从屏幕上移除

---

### Requirement: Toast 组件 MUST 支持多消息堆叠显示

当多个 Toast 同时显示时，MUST 堆叠排列，新的 Toast MUST 出现在适当的位置。

#### Scenario: 连续显示多个 Toast

**Given** 用户依次调用 `toast.success('成功1')`、`toast.error('错误1')`、`toast.warning('警告1')`
**When** Toast 组件渲染
**Then** 三个 Toast 消息依次堆叠显示
**And** 最新的消息在最上方（或最下方，根据设计决定）

#### Scenario: 消息数量超过限制时

**Given** 已显示 5 个 Toast 消息
**When** 用户尝试显示第 6 个 Toast
**Then** 最早的 Toast 消息被移除
**And** 最新的 Toast 消息显示

---

### Requirement: Toast 组件 MUST 使用 UnoCSS 实现样式

所有样式 MUST 使用 UnoCSS 类名，不允许使用 CSS 文件或内联样式。

#### Scenario: Toast 容器样式

**Given** Toast 容器组件
**When** 渲染到屏幕上
**Then** 使用 `fixed` 定位
**And** 使用 `top-4` 和 `right-4` 或其他合适的定位类
**And** 使用 `z-[9999]` 确保 z-index 最高
**And** 使用 `flex` 或 `grid` 实现垂直堆叠
**And** 使用 `gap-2` 设置消息间距

#### Scenario: Toast 项样式

**Given** Toast 项组件
**When** 渲染到屏幕上
**Then** 使用 `bg-white` 设置白色背景
**And** 使用 `shadow-lg` 添加阴影
**And** 使用 `rounded-lg` 设置圆角
**And** 使用 `border-l-4` 设置左侧彩色边框
**And** 使用 `p-4` 设置内边距
**And** 使用 `min-w-[300px]` 和 `max-w-md` 设置宽度范围

---

### Requirement: Toast 组件 MUST 支持动画效果

Toast 消息 MUST 有平滑的进入和退出动画。

#### Scenario: Toast 消息进入动画

**Given** 用户调用 `toast.success('成功')`
**When** Toast 开始渲染
**Then** 执行进入动画（从右侧滑入并淡入）
**And** 使用 UnoCSS 的动画类或自定义动画类

#### Scenario: Toast 消息退出动画

**Given** Toast 消息正在显示
**When** Toast 准备移除（自动或手动）
**Then** 执行退出动画（滑出右侧并淡出）
**And** 动画完成后从 DOM 中移除

---

### Requirement: Toast 组件 MUST 集成到 request.ts

request.ts 中的 `showMessage` 函数 MUST 使用 Toast 组件显示消息。

#### Scenario: API 请求错误时显示 Toast

**Given** API 请求返回错误
**When** `showMessage` 函数被调用
**Then** 使用 `toast.error()` 显示错误消息
**And** 错误消息来自 API 响应或默认消息

#### Scenario: API 请求成功时显示 Toast（可选）

**Given** API 请求成功
**When** `showMessage` 函数被调用（如果有的话）
**Then** 使用 `toast.success()` 显示成功消息

---

### Requirement: Toast 组件 MUST 使用 React Portal

Toast 容器 MUST 渲染到 document.body，确保不受父组件样式影响。

#### Scenario: Toast 渲染到 document.body

**Given** App 组件结构复杂，有多个层级
**When** Toast 组件显示
**Then** 使用 React Portal 渲染到 document.body
**And** Toast 不受父组件 overflow: hidden 等样式影响

---

### Requirement: Toast 组件 MUST 导出便捷 API

除了默认的 `toast()` 函数，MUST 提供便捷方法。

#### Scenario: 用户使用便捷方法调用 Toast

**Given** 用户需要显示不同类型的消息
**When** 用户调用以下方法
**Then** 可以使用：

- `toast.success(title, description)`
- `toast.error(title, description)`
- `toast.warning(title, description)`
- `toast.info(title, description)`

---

## Cross-Reference

- **认证表单规范** (`specs/auth-forms/spec.md`) - 认证表单使用 Toast 显示错误和成功消息
- **项目约定** (`../project.md`) - 代码风格、UnoCSS 使用规范
