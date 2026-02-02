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

## 数据结构 (本地存储)

本项目目前使用的是 **Standalone Mode (单机模式)**，所有数据保存在本地客户端。

### 1. 任务列表 (`tasks`)
存储在 `Taro.getStorageSync('tasks')`，数组结构：
```ts
interface Task {
  id: number           // 时间戳 ID
  title: string        // 任务标题
  priority: number     // 优先级 (0:重要且紧急, 1:重要不紧急, 2:紧急不重要, 3:不紧急不重要)
  description: string  // 任务详情
  createTime: string   // 创建时间 (例如 "2023/10/01 12:00:00")
  status: 'pending' | 'processed' // 任务状态
}
```

### 2. 用户信息 (`userInfo`)
存储在 `Taro.getStorageSync('userInfo')`，结构如下：
```ts
interface UserInfo {
  avatarUrl: string    // 微信头像 URL
  nickName: string     // 微信昵称
}
```

## 开源协议

MIT
