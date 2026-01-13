# 项目上下文

## 项目目的

构建一个基于 React + TypeScript + Vite 的现代前端应用，提供完整的用户认证、权限管理和业务功能集成。项目旨在作为企业级前端应用的基础框架，支持快速开发和部署。

## 技术栈

### 核心框架

- **React 19.2.0** - UI 组件库
- **TypeScript 5.9.3** - 类型安全的 JavaScript 超集
- **Vite 7.2.4** - 快速的构建工具和开发服务器

### 路由与状态

- **React Router v7** - 客户端路由管理

### 样式方案

- **UnoCSS 66.5.12** - 原子化 CSS 引擎

### HTTP 客户端

- **Axios 1.13.2** - HTTP 请求库

### 数据验证

- **Zod 4.3.5** - TypeScript 优先的模式验证

### 安全与加密

- **crypto-js 4.2.0** - 密码加密

### 存储

- **IndexedDB** - 浏览器本地数据存储（访问令牌等）

### 开发工具

- **Husky 9.1.7** - Git hooks 管理
- **lint-staged 16.2.7** - 暂存文件 lint
- **oxlint 1.38.0** - 快速的 JavaScript/TypeScript linter
- **Prettier 3.7.4** - 代码格式化工具
- **commitlint 20.3.1** - 提交信息规范
- **@scxfe/api-tool 0.4.10** - API 自动生成工具

## 项目约定

### 代码风格

#### 导入顺序

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

#### 命名约定

- **变量和函数**：camelCase，如 `getUserById`, `isLoading`
- **组件**：PascalCase，如 `UserProfile`, `LoginForm`
- **类型和接口**：PascalCase，如 `UserData`, `ApiResponse`
- **常量**：UPPER_SNAKE_CASE，如 `API_BASE_URL`, `MAX_RETRY_COUNT`
- **类**：PascalCase，如 `IndexedDBManager`, `FrontendCrypto`
- **API 函数**：camelCase，格式为 `{method}{Resource}{Action}Api`，如 `postUsersLoginApi`, `getUsersRolesApi`
- **类型**：PascalCase，格式为 `{Method}{Resource}{Action}Type/ResponseType`，如 `PostUsersLoginRequestType`

#### 格式化规则

- 使用分号 (`;`)
- 使用单引号 (`'`)
- 行宽 100 字符
- 缩进 2 空格
- ES5 尾随逗号
- 总是使用箭头函数参数括号
- 文件末尾插入换行符
- 行尾使用 LF

#### TypeScript 规范

- 使用严格模式（已在 tsconfig.app.json 中配置）
- 避免使用 `any` 类型，使用具体类型或 `unknown`
- 使用泛型提供类型安全，如 `request<ResponseType>(config)`
- 导出类型时使用 `export type`，导出值时使用 `export`
- 路径别名：`@/*` 映射到 `./src/*`

#### 注释规范

- 使用 JSDoc 风格注释函数和类，使用中文描述
- 函数示例：

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

#### 错误处理

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

### 架构模式

#### 目录结构

```
src/
├── routes/          # 路由组件（页面级组件）
├── service/          # API 服务层（按业务模块组织）
│   ├── AIFuWu/      # AI 服务模块
│   ├── JueSeGuanLi/ # 角色管理模块
│   ├── QuanXianGuanLi/ # 权限管理模块
│   ├── YongHuGuanLi/ # 用户管理模块
│   ├── YouXiangFuWu/ # 邮件服务模块
│   ├── types/       # API 类型定义
│   ├── request.ts   # 统一请求配置
│   └── index.ts     # 服务导出
├── lib/             # 工具库
│   ├── frontend-crypto.ts  # 前端加密工具
│   ├── indexeddb-manager.ts # IndexedDB 管理器
│   └── schemas.ts   # 数据模式定义
├── hooks/           # 自定义 React hooks
├── App.tsx          # 根组件
└── main.tsx         # 应用入口
```

#### 分层架构

- **路由层** (`routes/`) - 页面级组件，处理路由和页面布局
- **服务层** (`service/`) - 封装 API 请求，处理数据获取和业务逻辑
- **工具层** (`lib/`) - 通用工具函数和类
- **Hook 层** (`hooks/`) - 复用的 React 逻辑

#### API 请求规范

- 使用统一的 `request` 函数（定义在 `src/service/request.ts`）
- 配置接口使用 `RequestConfig` 类型
- 请求函数命名：`{method}{Resource}{Action}Api`
- 响应类型：`Promise<ResponseType>`

### 测试策略

**当前状态**：项目尚未配置测试框架。

**规划**：

- 需要添加测试框架（如 Vitest 或 Jest）
- 测试类型应包括：
  - 单元测试 - 针对工具函数和纯函数
  - 组件测试 - 测试 React 组件渲染和交互
  - 集成测试 - 测试 API 请求和数据流
- 测试覆盖率目标待定

### Git 工作流

#### 分支策略

- `main` - 主分支，生产代码
- `feature/*` - 功能开发分支
- `bugfix/*` - 缺陷修复分支
- `refactor/*` - 重构分支

#### 提交规范

使用 Conventional Commits 规范，通过 commitlint 强制执行。

**格式**：`type(scope): description`

**类型**：

- `feat` - 新功能
- `fix` - 缺陷修复
- `docs` - 文档更新
- `style` - 代码格式（不影响功能）
- `refactor` - 重构（既不是新功能也不是修复）
- `test` - 添加测试
- `chore` - 构建过程或辅助工具的变动

**示例**：

- `feat(auth): 添加用户登录功能`
- `fix: 修复用户注册时的验证错误`
- `docs: 更新 API 文档`

#### Git Hooks

- **pre-commit** - 运行 lint-staged，对暂存的 TypeScript/TSX 文件执行 oxlint 和 Prettier
- **commit-msg** - 使用 commitlint 验证提交信息格式

### 域上下文

#### 业务模块

项目集成了以下业务模块：

- **AI 服务** (AIFuWu) - AI 对话和智能响应
- **角色管理** (JueSeGuanLi) - 角色创建、更新、删除和分配
- **权限管理** (QuanXianGuanLi) - 权限的定义和管理
- **用户管理** (YongHuGuanLi) - 用户注册、登录、密码重置
- **邮件服务** (YouXiangFuWu) - 邮件发送和验证码功能

#### 用户认证流程

- 用户注册 → 邮箱验证 → 登录 → 获取访问令牌
- 访问令牌存储在 IndexedDB 中
- 密码使用 `FrontendCrypto` 类加密
- 支持 Bearer Token 认证

#### 数据模型

- 用户数据包含基本信息、角色和权限
- 角色与权限是多对多关系
- 使用 Zod schema 进行数据验证

### 重要约束

#### 技术约束

- 必须使用 TypeScript 严格模式
- 不能使用 `any` 类型
- 所有 API 请求必须通过统一的 `request` 函数
- 样式必须使用 UnoCSS，避免编写自定义 CSS 文件
- 组件必须是函数式组件，使用 hooks

#### 安全约束

- 密码必须在客户端加密后传输
- 访问令牌存储在 IndexedDB，不能暴露在 localStorage 或 sessionStorage
- 不要在代码中暴露密钥或 token
- 使用 Bearer Token 进行认证
- 敏感操作需要适当的错误处理和日志记录

#### 性能约束

- 代码必须通过 `npm run lint` 和 `npm run typecheck` 检查
- 避免不必要的重新渲染
- 使用 React 19 的性能优化特性

### 外部依赖

#### API 服务

- 后端 API 通过 Apifox 定义，使用 `@scxfe/api-tool` 自动生成 API 代码
- API 配置文件：`api-power.config.ts`

#### 第三方服务

- **Apifox** - API 文档和自动生成工具
- 依赖 Token 进行 API 导出

#### 开发工具

- **Husky** - Git hooks 管理
- **lint-staged** - 暂存文件 lint
- **Prettier** - 代码格式化
- **oxlint** - 快速 linter
- **commitlint** - 提交信息验证

#### 浏览器 API

- **IndexedDB** - 本地数据存储
- **Fetch API** - 通过 Axios 封装使用
