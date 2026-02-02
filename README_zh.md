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

## 开源协议

MIT
