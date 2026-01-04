# Quickstart Guide: Phase I - Console Todo Application

## Overview
This guide provides instructions for running and using the Phase I console todo application.

## Prerequisites
- Python 3.11 or higher installed on your system
- No additional dependencies required (uses only Python standard library)

## Running the Application
1. Navigate to the project root directory
2. Execute the application: `python todo_app.py`
3. The menu-driven interface will start and display available options

## Basic Usage

### Adding Tasks
1. Select option "1" or "Add Task" from the main menu
2. Enter your task description when prompted
3. The task will be added with a unique ID and shown as incomplete

### Viewing Tasks
1. Select option "2" or "View Task List" from the main menu
2. All tasks will be displayed with their ID, description, status, and creation time

### Updating Tasks
1. Select option "3" or "Update Task" from the main menu
2. Enter the ID of the task you want to update
3. Enter the new description for the task

### Deleting Tasks
1. Select option "4" or "Delete Task" from the main menu
2. Enter the ID of the task you want to delete
3. Confirm the deletion when prompted

### Marking Tasks Complete/Incomplete
1. Select option "5" or "Mark Task Complete" (or "Mark Task Incomplete")
2. Enter the ID of the task you want to update
3. The task status will be updated accordingly

### Exiting the Application
1. Select option "6" or "Exit" from the main menu
2. The application will terminate (all data will be lost)

## Error Handling
- Invalid task IDs will show an error message
- Empty task descriptions will be rejected
- Invalid menu choices will prompt for a valid selection
- Empty task lists will display an appropriate message

## Development
- The main application logic is in `todo_app.py`
- Unit tests are in the `tests/` directory
- Run tests with: `python -m pytest tests/`

## Limitations
- Data is stored only in memory and will be lost when the application exits
- Single-user application only
- Maximum recommended tasks: 100 (for optimal performance)