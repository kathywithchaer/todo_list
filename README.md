# Taro Task Management Mini Program

A WeChat Mini Program for task management, built with **Taro** and **React**.

[English](./README.md) | [中文](./README_zh.md)

## Features

- **Task Management**: Create, view, and manage tasks.
- **Priority System**: Categorize tasks by Importance/Urgency (Eisenhower Matrix).
- **Status Tracking**: Separate views for "Pending" (待处理) and "Processed" (已处理) tasks.
- **Data Persistence**: Tasks are saved locally on the device (Storage).
- **Cross-Platform**: Built with Taro, deployable to WeChat Mini Program and H5 (Web).

## Data Structure (Local Storage)

The project uses **Local Storage**. Data is isolated to the client device.

### 1. Task List (`tasks`)
Stored in `Taro.getStorageSync('tasks')`. Array structure:
```ts
interface Task {
  id: number           // Timestamp ID
  title: string        // Task Title
  priority: number     // Priority (0-3)
  description: string  // Details
  createTime: string   // Created Time
  status: 'pending' | 'processed'
}
```

### 2. User Info (`userInfo`)
Stored in `Taro.getStorageSync('userInfo')`.

## Tech Stack

- **Framework**: [Taro](https://taro.jd.com/) v3.6
- **UI Library**: React (Functional Components + Hooks)
- **Language**: TypeScript
- **Styling**: SCSS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kathywithchaer/todo_list.git
   cd todo_list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Development

**WeChat Mini Program:**
```bash
npm run dev:weapp
```
*Open WeChat Developer Tool and import the project directory.*

**H5 (Web):**
```bash
npm run dev:h5
```
*Access at http://localhost:10086*

## Project Structure

```
src/
├── app.config.ts    # Global Configuration
├── app.scss         # Global Styles
├── pages/
│   ├── index/       # Home Page (Task List)
│   └── add/         # Add Task Page
└── ...
```

## License

MIT
