# Taro Task Management Mini Program

A WeChat Mini Program for task management, built with **Taro** and **React**.

[English](./README.md) | [中文](./README_zh.md)

## Features

- **Task Management**: Create, view, and manage tasks.
- **Priority System**: Categorize tasks by Importance/Urgency (Eisenhower Matrix).
- **Status Tracking**: Separate views for "Pending" (待处理) and "Processed" (已处理) tasks.
- **Data Persistence**: Data is stored in **WeChat Cloud Database** (NoSQL), allowing multi-device synchronization.
- **Cross-Platform**: Built with Taro, deployable to WeChat Mini Program and H5 (Web).

## Data Structure (WeChat Cloud)

The project uses **WeChat Cloud Development**. Data is stored in the `todos` collection in the cloud database.

### 1. Task Collection (`todos`)
Each task is a JSON Document. Structure:

```json
{
  "_id": "System Generated",      // Unique Record ID (Primary Key)
  "_openid": "System Generated",  // User Unique ID (for data isolation)
  
  "title": "Task Title",          // String
  "description": "Details",       // String
  "priority": 0,                  // Number (0-3: corresponds to priorities)
  "status": "pending",            // String ('pending' | 'processed')
  "createTime": "2026/...",       // String (Creation timestamp)
}
```

> **Note**: `_openid` is automatically added by the Cloud environment based on the current user. Users can only access data created by themselves.

### 2. User Info (`userInfo`)
User profile (Avatar/Nickname) is currently cached in local Storage for display purposes only.

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
