# Task Manager Frontend

Frontend application for a Task Management system built with React, TypeScript, and Tailwind CSS. This project is part of a full-stack technical assessment.

## Live Demo

https://frontend-task-manager-zeta.vercel.app/

## Project Overview

This React application provides a modern and intuitive task management interface that allows users to:

- Create, read, update, and delete tasks
- Mark tasks as completed or pending
- Filter tasks by status (all/completed/pending)
- View task details including title, description, status, and creation date
- Responsive design for both desktop and mobile devices

## Technical Stack

- **Framework**: React.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Icons**: React Icons
- **Routing**: React Router
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Features

### Task Management

- Create new tasks with title and optional description
- Edit existing tasks
- Delete tasks with confirmation
- Toggle task completion status
- View task creation date

### Task Filtering

- Filter tasks by status:
  - All tasks
  - Pending tasks
  - Completed tasks

## Prerequisites

- Node.js (v20 or higher)
- yarn (recommended) or npm

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend-task-manager
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

4. **Start development server**

   ```bash
   yarn dev
   ```

## Project Structure

```bash
  src/
  ├── api/        # API client and endpoints
  ├── components/ # React components
  │ ├── ui/       # Reusable UI components
  │ └── ...       # Feature components
  ├── context/    # Global state management
  ├── pages/      # Page components
  ├── types/      # TypeScript types/interfaces
  └── router/     # Route definitions
```

## Components

### Core Components

- `TaskList`: Displays the list of tasks with filtering
- `TaskItem`: Individual task component with edit/delete actions
- `TaskForm`: Form for creating new tasks
- `Modal`: Reusable modal component for confirmations

### UI Components

- `Button`: Reusable button component with variants
- Loading indicators
- Error messages
- Form inputs

## State Management

Uses React Context API for global state management, handling:

- Task data
- Loading states
- Error states
- Filter preferences

## API Integration

Communicates with the backend API for:

- Fetching tasks
- Creating new tasks
- Updating existing tasks
- Deleting tasks

## Environment Variables

| Variable          | Description                  | Required |
| ----------------- | ---------------------------- | -------- |
| VITE_API_BASE_URL | Base URL for the backend API | No       |
