<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# AGENTS.md

此文档包含为在此代码库中工作的 AI 智能体提供的指南。

## 构建和 Lint 命令

### 开发命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本（包括 TypeScript 编译和 Vite 构建）
- `npm run preview` - 预览生产构建

### Lint 命令

- `npm run lint` - 运行 ESLint
- `npm run lint:fix` - 自动修复 ESLint 问题
- `npm run oxlint` - 运行 oxlint（更快）
- `npm run oxlint:fix` - 自动修复 oxlint 问题

### 格式化命令

- `npm run format` - 使用 Prettier 格式化所有文件
- `npm run format:check` - 检查代码格式

### 类型检查

- `npm run typecheck` - 运行 TypeScript 类型检查（不生成文件）

**重要**：此项目当前未配置测试框架。在完成代码更改后，务必运行 `npm run lint` 和 `npm run typecheck` 确保代码正确。

## 代码风格指南

### 导入顺序

1. 第三方库导入
2. 使用 @ 别名的内部模块导入
3. 类型导入（使用 `type` 关键字）
4. 相对路径导入

示例：

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { request } from '@/service/request';
import type { RequestConfig } from '@/service/request';
import './App.css';
```

### 命名约定

- **变量和函数**：camelCase，如 `getUserById`, `isLoading`
- **组件**：PascalCase，如 `UserProfile`, `LoginForm`
- **类型和接口**：PascalCase，如 `UserData`, `ApiResponse`
- **常量**：UPPER_SNAKE_CASE，如 `API_BASE_URL`, `MAX_RETRY_COUNT`
- **类**：PascalCase，如 `IndexedDBManager`, `FrontendCrypto`
- **API 函数**：camelCase，格式为 `{method}{Resource}{Action}Api`，如 `postUsersLoginApi`, `getUsersRolesApi`
- **类型**：PascalCase，格式为 `{Method}{Resource}{Action}Type/ResponseType`，如 `PostUsersLoginRequestType`

### 格式化规则

- 使用分号 (`;`)
- 使用单引号 (`'`)
- 行宽 100 字符
- 缩进 2 空格
- ES5 尾随逗号
- 总是使用箭头函数参数括号
- 文件末尾插入换行符
- 行尾使用 LF

### TypeScript 规范

- 使用严格模式（已在 tsconfig.app.json 中配置）
- 避免使用 `any` 类型，使用具体类型或 `unknown`
- 使用泛型提供类型安全，如 `request<ResponseType>(config)`
- 导出类型时使用 `export type`，导出值时使用 `export`
- 路径别名：`@/*` 映射到 `./src/*`

### 注释规范

- 使用 JSDoc 风格注释函数和类，使用中文描述
- 示例：

```typescript
/**
 * @description 用户注册
 * @param params PostUsersRegisterRequestType
 * @returns Promise<PostUsersRegisterResponseType>
 */
```

- 文件顶部使用单行注释描述模块功能：

```typescript
/**
 * @description: 登录相关
 */
```

### 错误处理

- 异步操作使用 try-catch 块
- 提供有意义的错误消息（使用中文）
- 必要时在 catch 块中重新抛出错误
- 示例：

```typescript
try {
  const data = await someAsyncOperation();
  return data;
} catch (error) {
  console.error('操作失败:', error);
  throw Error('操作失败');
}
```

### React 组件规范

- 使用函数式组件和 hooks
- 组件返回类型：`React.ReactElement`
- 使用 UnoCSS 进行样式（原子化 CSS）
- 避免使用 CSS 文件，优先使用类名

### API 请求规范

- 使用统一的 `request` 函数（定义在 `src/service/request.ts`）
- 配置接口使用 `RequestConfig` 类型
- 请求函数命名：`{method}{Resource}{Action}Api`
- 响应类型：`Promise<ResponseType>`

### 目录结构

```
src/
├── routes/          # 路由组件
├── service/          # API 服务层
├── lib/             # 工具库
├── hooks/           # 自定义 hooks
├── App.tsx          # 根组件
└── main.tsx         # 入口文件
```

### Git 提交规范

- 使用 commitlint，遵循 Conventional Commits 规范
- 格式：`type(scope): description`
- 类型：feat, fix, docs, style, refactor, test, chore 等

### 安全注意事项

- 不要在代码中暴露密钥或 token
- 密码加密使用 `FrontendCrypto` 类
- 访问令牌存储在 IndexedDB 中
- 使用 Bearer Token 进行认证

### 其他规范

- 避免使用 `console.log`，改用适当的日志记录
- 遵循现有代码模式和约定
- 编辑文件前务必先读取文件内容
- 不要添加不必要的注释
- 使用 UnoCSS 实现样式，避免编写自定义 CSS

## 常用工具和库

- **框架**：React 19, TypeScript
- **路由**：React Router v7
- **HTTP 客户端**：Axios
- **样式**：UnoCSS（原子化 CSS）
- **加密**：crypto-js
- **存储**：IndexedDB
- **Linter**：ESLint, oxlint
- **格式化**：Prettier
