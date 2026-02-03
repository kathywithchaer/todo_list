# Taro 任务管理小程序

一个使用 **Taro** 和 **React** 构建的微信小程序。

[English](./README.md) | [中文](./README_zh.md)

## 功能特性

- **任务管理**：创建、查看和管理任务。
- **优先级系统**：通过重要/紧急（四象限）对任务进行分类。
- **状态追踪**：区分“待处理”和“已处理”任务视图。
- **数据持久化**：任务数据本地存储（Storage）。
- **跨平台**：基于 Taro 构建，支持编译为微信小程序和 H5（网页）。

## 技术栈

- **框架**：[Taro](https://taro.jd.com/) v3.6
- **UI 库**：React (Hooks 函数式组件)
- **语言**：TypeScript
- **样式**：SCSS

## 快速开始

### 准备工作

- Node.js (推荐 v18+)
- npm 或 yarn

### 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/kathywithchaer/todo_list.git
   cd todo_list
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

### 运行开发

**微信小程序:**
```bash
npm run dev:weapp
```
*打开微信开发者工具，导入项目目录。*

**H5 (网页):**
```bash
npm run dev:h5
```
*在浏览器访问 http://localhost:10086*

## 项目结构

```
src/
├── app.config.ts    # 全局配置
├── app.scss         # 全局样式
├── pages/
│   ├── index/       # 首页 (任务列表)
│   └── add/         # 新增任务页
└── ...
```

## 用户登录与授权流程

采用微信小程序的 `getUserProfile` 接口进行用户身份识别：
1. **欢迎弹窗**：首次进入小程序（或缓存清除后）时，展示全屏模态框引导用户登录。
2. **授权请求**：用户点击“微信授权登录”按钮，触发系统级授权弹窗。
3. **数据存储**：授权成功后，获取用户头像和昵称，存储在本地 `LocalStorage` 中。
4. **界面更新**：右上角显示用户头像，隐藏欢迎弹窗。

## 数据结构 (微信云开发)

本项目已从本地存储迁移至 **微信云开发 (WeChat Cloud Development)**。数据存储在云端的 NoSQL 数据库集合 `todos` 中。

### 1. 任务集合 (`todos`)
每一条任务是一个 JSON 文档 (Document)，结构说明如下：

```json
{
  "_id": "系统自动生成",      // 记录唯一标识符 (Primary Key)
  "_openid": "系统自动生成",  // 用户唯一标识符 (User ID)，用于权限隔离
  
  "title": "任务标题",        // String
  "description": "任务描述",  // String
  "priority": 0,             // Number (0-3: 对应四象限优先级)
  "status": "pending",       // String ('pending' | 'processed')
  "createTime": "2026/...",  // String (创建时间字符串)
}
```

> **注意**：`_openid` 是云开发根据当前登录用户自动添加的字段。默认权限下，用户只能读写带有自己 `_openid` 的数据，从而实现多用户数据隔离。

### 2. 用户信息 (`userInfo`)
目前用户信息（头像/昵称）仍缓存在本地 Storage 中，用于界面展示，未存入云端数据库（隐私保护）。
```ts
interface UserInfo {
  avatarUrl: string    // 微信头像 URL
  nickName: string     // 微信昵称
}
```

## 如何让其他人部署 (二次开发)

如果您想把代码分享给朋友，或者部署到另一个小程序账号上，需要执行以下“换锁”步骤：

1.  **注册账号**：
    *   使用者需要去 [微信公众平台](https://mp.weixin.qq.com/) 注册一个小程序账号，获取自己的 **AppID**。

2.  **代码配置修改**：
    *   打开 `project.config.json`，将 `appid` 字段修改为新账号的 AppID。
    *   打开 `src/app.ts`，将 `env` 字段修改为新账号下的 **云环境 ID**。

3.  **云环境初始化**：
    *   在微信开发者工具中，点击“云开发”开通服务。
    *   创建名为 `todos` 的数据库集合。
    *   (可选) 如果有多人开发，需设置数据库权限为“所有用户可读写”（仅限调试）或维护各自的 `_openid` 数据。

## 开源协议

MIT
