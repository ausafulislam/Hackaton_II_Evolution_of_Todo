# Task Operations Contract

## Overview
This document defines the contract for task management operations in the console todo application. These represent the functional interfaces that will be implemented in the CLI application.

## Operation: Add Task
- **Action**: Create a new task with provided description
- **Input**: Task description (string)
- **Validation**:
  - Description must not be empty or whitespace-only
- **Success Response**:
  - Task object with assigned ID, provided description, status=False, created_at timestamp
  - Success message with task ID
- **Error Response**:
  - Error message if description is empty

## Operation: List Tasks
- **Action**: Retrieve all tasks in creation order
- **Input**: None
- **Success Response**:
  - Array of task objects with all attributes
  - If no tasks exist, return empty array with appropriate message
- **Error Response**: None (always succeeds)

## Operation: Get Task by ID
- **Action**: Retrieve a specific task by its ID
- **Input**: Task ID (integer)
- **Success Response**:
  - Task object with all attributes
- **Error Response**:
  - Error message if task ID does not exist

## Operation: Update Task Description
- **Action**: Modify the description of an existing task
- **Input**: Task ID (integer), new description (string)
- **Validation**:
  - Task ID must exist
  - New description must not be empty or whitespace-only
- **Success Response**:
  - Updated task object
  - Success confirmation message
- **Error Response**:
  - Error message if task ID does not exist
  - Error message if new description is empty

## Operation: Delete Task
- **Action**: Remove a task by its ID
- **Input**: Task ID (integer)
- **Validation**:
  - Task ID must exist
- **Success Response**:
  - Success confirmation message
- **Error Response**:
  - Error message if task ID does not exist

## Operation: Mark Task Complete
- **Action**: Update task status to complete (True)
- **Input**: Task ID (integer)
- **Validation**:
  - Task ID must exist
- **Success Response**:
  - Success confirmation message
- **Error Response**:
  - Error message if task ID does not exist

## Operation: Mark Task Incomplete
- **Action**: Update task status to incomplete (False)
- **Input**: Task ID (integer)
- **Validation**:
  - Task ID must exist
- **Success Response**:
  - Success confirmation message
- **Error Response**:
  - Error message if task ID does not exist

## Common Error Responses
- **Invalid ID Error**: "Task with ID [X] does not exist"
- **Empty Description Error**: "Task description cannot be empty"
- **General Error**: Appropriate user-friendly message explaining the issue

## Success Response Format
- Success messages follow format: "[Operation] successful: [details]"
- Task objects returned in JSON-like format with all attributes