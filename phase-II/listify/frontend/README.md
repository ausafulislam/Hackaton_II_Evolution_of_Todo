# Todo Frontend Application

This is the frontend application for the Todo API integration as part of the Evolution of Todo project Phase II.

## Features

- View, create, update, and delete tasks
- Toggle task completion status
- Optimistic UI updates for better user experience
- Loading and error state handling
- Responsive design

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root of the frontend directory with the following content:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   NEXT_PUBLIC_USER_ID=default_user_123
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` in your browser.

## Available Pages

- `/` - Home page with the existing template
- `/todo` - Todo application page where you can manage your tasks

## Components

- `services/api.js` - API service layer for all Todo operations
- `hooks/useTasks.js` - Custom hook for task state management
- `components/TaskList.tsx` - Component to display the list of tasks
- `components/TaskItem.tsx` - Component for individual task display and interaction
- `components/TaskForm.tsx` - Component for creating and editing tasks

## API Integration

The application connects to the backend Todo API at the configured `NEXT_PUBLIC_BACKEND_URL` using the following endpoints:

- `GET /api/{user_id}/tasks` - Fetch all tasks
- `POST /api/{user_id}/tasks` - Create a new task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion status

## Architecture

The frontend follows a clean architecture with:
- API service layer for backend communication
- Custom React hook for state management
- Reusable UI components
- Environment-based configuration
- Error and loading state handling
