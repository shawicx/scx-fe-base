# Toast 组件和认证表单设计

## Toast 组件设计

### 组件架构

#### 目录结构

```
src/components/toast/
├── Toast.tsx          # 主 Toast 组件
├── ToastContainer.tsx # 容器组件，管理所有 toast
├── types.ts           # 类型定义
└── index.ts           # 导出
```

#### 核心设计

**ToastContainer**

- 使用 React Portal 渲染到 `document.body`
- 维护 toast 队列状态
- 处理 toast 的添加、移除和自动过期
- 支持堆叠显示，新的 toast 从顶部或底部进入

**Toast**

- 支持四种类型：success、error、warning、info
- 使用 UnoCSS 实现样式
- 内置进入/退出动画（淡入淡出 + 滑动）
- 支持手动关闭按钮
- 自动消失（默认 3 秒）

#### 类型定义

```typescript
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

export interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
}
```

#### API 设计

```typescript
// 命名导出的函数，直接调用
export const toast: {
  (options: ToastOptions): void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};
```

#### UnoCSS 类名设计

**Toast 容器**

- 固定定位（右上角或右上角）
- z-index: 9999
- 使用 flex 或 grid 布局实现堆叠

**Toast 项**

- 背景：白色
- 阴影：`shadow-lg`
- 圆角：`rounded-lg`
- 边框：左侧彩色边框（根据类型）
- 内边距：`p-4`
- 最小宽度：`min-w-[300px]`
- 最大宽度：`max-w-md`

**类型样式**

- Success: 绿色左边框 `border-l-4 border-green-500`，绿色图标
- Error: 红色左边框 `border-l-4 border-red-500`，红色图标
- Warning: 黄色左边框 `border-l-4 border-yellow-500`，黄色图标
- Info: 蓝色左边框 `border-l-4 border-blue-500`，蓝色图标

**动画**

- 进入：`animate-slide-in-right`（从右侧滑入）
- 退出：`animate-slide-out-right`（滑出右侧）

#### 与 request.ts 集成

在 `src/service/request.ts` 中：

```typescript
import { toast } from '@/components/toast';

function showMessage(message: string, type: ToastType = 'error') {
  const text = getText(type);
  toast[type](text, message);
}
```

## 认证表单设计

### 通用设计原则

#### 布局结构

所有认证表单采用统一的布局：

```tsx
<div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">{/* 表单内容 */}</div>
</div>
```

#### 表单字段通用样式

- 输入框：`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`
- 标签：`block text-sm font-medium text-gray-700 mb-2`
- 错误信息：`text-red-500 text-sm mt-1`
- 按钮：`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400`

#### 表单验证流程

1. 用户输入时实时验证（可选）
2. 提交时完整验证
3. 错误信息显示在对应字段下方
4. API 错误通过 Toast 显示

### 登录表单设计

#### 功能特性

- 支持密码登录和验证码登录两种方式
- 使用标签页（Tab）切换登录方式
- 记住我选项
- 跳转到注册和忘记密码

#### 布局结构

```tsx
<Tabs defaultValue="password">
  <TabsList>
    <TabsTrigger value="password">密码登录</TabsTrigger>
    <TabsTrigger value="code">验证码登录</TabsTrigger>
  </TabsList>

  <TabsContent value="password">
    <Form>
      {/* 邮箱输入 */}
      {/* 密码输入 */}
      {/* 记住我复选框 */}
      {/* 登录按钮 */}
      {/* 忘记密码链接 */}
    </Form>
  </TabsContent>

  <TabsContent value="code">
    <Form>
      {/* 邮箱输入 */}
      {/* 验证码输入 + 发送按钮 */}
      {/* 登录按钮 */}
    </Form>
  </TabsContent>
</Tabs>

<div className="text-center mt-4">
  还没有账号？<Link to="/register">立即注册</Link>
</div>
```

#### 状态管理

- `isPasswordLogin` - 当前登录方式
- `isLoading` - 登录加载状态
- `isSendingCode` - 发送验证码加载状态
- `countdown` - 验证码倒计时（60 秒）

#### API 调用

- 密码登录：`useAuth.login({ email, password })`
- 验证码登录：`useAuth.loginWithCode({ email, emailVerificationCode })`
- 发送验证码：`useAuth.sendVerificationCode(email)`

### 注册表单设计

#### 功能特性

- 邮箱输入
- 验证码输入（带发送按钮和倒计时）
- 密码输入
- 确认密码
- 跳转到登录

#### 布局结构

```tsx
<Form>
  {/* 邮箱输入 */}
  {/* 验证码输入 + 发送按钮 */}
  {/* 密码输入 */}
  {/* 确认密码 */}
  {/* 注册按钮 */}
</Form>

<div className="text-center mt-4">
  已有账号？<Link to="/login">立即登录</Link>
</div>
```

#### 状态管理

- `isLoading` - 注册加载状态
- `isSendingCode` - 发送验证码加载状态
- `countdown` - 验证码倒计时

#### API 调用

- 发送验证码：`useAuth.sendVerificationCode(email)`
- 注册：`useAuth.register({ email, password, emailVerificationCode })`

### 忘记密码表单设计

#### 功能特性

- 邮箱输入
- 验证码输入（带发送按钮和倒计时）
- 新密码输入
- 确认密码
- **静态表单，不调用 API**

#### 布局结构

```tsx
<Form>
  {/* 邮箱输入 */}
  {/* 验证码输入 + 发送按钮 */}
  {/* 新密码输入 */}
  {/* 确认密码 */}
  {/* 提交按钮 */}
</Form>

<div className="text-center mt-4">
  <Link to="/login">返回登录</Link>
</div>
```

#### 状态管理

- `isLoading` - 模拟加载状态（仅用于演示）
- `isSendingCode` - 模拟发送加载状态
- `countdown` - 验证码倒计时

#### API 调用

- **不调用任何 API**

### 技术实现细节

#### 表单验证

使用 Zod schema 定义验证规则，通过 React Hook Form 集成：

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/lib/schemas';

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormValues>({
  resolver: zodResolver(loginFormSchema),
});
```

**注意**：项目当前未安装 `react-hook-form`，如果需要使用则需要添加依赖。或者可以直接使用 React 状态和手动验证。

#### 验证码倒计时实现

```tsx
const [countdown, setCountdown] = useState(0);
const isCountingDown = countdown > 0;

const handleSendCode = async () => {
  try {
    await sendVerificationCode(email);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  } catch (error) {
    // Toast 显示错误
  }
};
```

#### UnoCSS 预设使用

**颜色系统**

- 主色：`blue-500`, `blue-600`
- 成功：`green-500`
- 错误：`red-500`
- 警告：`yellow-500`
- 信息：`blue-500`

**间距**

- 小间距：`space-y-2`
- 中间距：`space-y-4`
- 大间距：`space-y-6`

**响应式**

- 移动端：默认样式
- 桌面端：表单居中，宽度限制

### 图标设计

由于项目未使用图标库，将使用以下方案之一：

1. **SVG 内联**：直接在组件中使用 SVG
2. **Unicode 字符**：简单的 Unicode 符号
3. **Emoji**：使用 Emoji 作为图标（最简单）

**推荐方案 3**：使用 Emoji，最简单且无需额外依赖

示例：

- Success: ✅
- Error: ❌
- Warning: ⚠️
- Info: ℹ️

## 总结

本设计方案遵循项目技术约束：

- ✅ 使用 UnoCSS 进行样式
- ✅ 使用 TypeScript 严格模式
- ✅ 遵循代码风格约定
- ✅ 使用现有的 useAuth hook 和 Zod schemas

Toast 组件和认证表单的设计简洁、一致，提供了良好的用户体验。
