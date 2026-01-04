"""
Console Todo Application - Phase I Implementation

This is a single-file Python console application for managing todo tasks in-memory.
The application provides a menu-driven interface allowing users to add, view,
update, delete, and mark tasks as complete/incomplete. All data is stored in-memory
only and will be lost when the application terminates.

Features:
- Add new tasks with descriptions
- View all tasks with completion status
- Update task descriptions
- Delete tasks
- Mark tasks as complete/incomplete
- Menu-driven CLI interface
- Error handling for invalid inputs
"""
import datetime
from typing import List, Optional, Dict


class Task:
    """
    Represents a single todo item with required attributes.

    Attributes:
        id: Unique identifier for the task (integer, auto-incremented)
        description: Text description of the task (string, required, non-empty)
        status: Completion status (boolean, defaults to false/incomplete)
        created_at: Timestamp when task was created (datetime, auto-generated)
    """

    def __init__(self, task_id: int, description: str, status: bool = False):
        self.id = task_id
        self.description = description
        self.status = status
        self.created_at = datetime.datetime.now()

    def __str__(self) -> str:
        status_str = "✓" if self.status else "○"
        return f"[{status_str}] {self.id}. {self.description} (Created: {self.created_at.strftime('%Y-%m-%d %H:%M:%S')})"


class TaskManager:
    """
    Manages in-memory storage and operations for tasks.

    Provides methods to add, get, update, delete, and list tasks.
    Uses both a list for ordered display and a dictionary for O(1) ID lookup.
    """

    def __init__(self):
        self.tasks: List[Task] = []
        self.task_map: Dict[int, Task] = {}  # Maps ID to Task for O(1) lookup
        self.next_id = 1  # Auto-incrementing ID counter

    def add_task(self, description: str) -> Optional[Task]:
        """
        Add a new task with the provided description.

        Args:
            description: Text description of the task

        Returns:
            Task object if successful, None if description is invalid
        """
        if not description or not description.strip():
            return None

        task = Task(self.next_id, description.strip())
        self.tasks.append(task)
        self.task_map[task.id] = task
        self.next_id += 1
        return task

    def get_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Retrieve a task by its ID.

        Args:
            task_id: The ID of the task to retrieve

        Returns:
            Task object if found, None otherwise
        """
        return self.task_map.get(task_id)

    def get_all_tasks(self) -> List[Task]:
        """
        Retrieve all tasks in creation order.

        Returns:
            List of all Task objects
        """
        return self.tasks

    def update_task(self, task_id: int, new_description: str) -> bool:
        """
        Update the description of an existing task.

        Args:
            task_id: The ID of the task to update
            new_description: The new description for the task

        Returns:
            True if update was successful, False otherwise
        """
        if not new_description or not new_description.strip():
            return False

        task = self.task_map.get(task_id)
        if task:
            task.description = new_description.strip()
            return True
        return False

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id: The ID of the task to delete

        Returns:
            True if deletion was successful, False otherwise
        """
        task = self.task_map.get(task_id)
        if task:
            self.tasks.remove(task)
            del self.task_map[task_id]
            return True
        return False

    def mark_task_complete(self, task_id: int) -> bool:
        """
        Mark a task as complete (status = True).

        Args:
            task_id: The ID of the task to mark complete

        Returns:
            True if operation was successful, False otherwise
        """
        task = self.task_map.get(task_id)
        if task:
            task.status = True
            return True
        return False

    def mark_task_incomplete(self, task_id: int) -> bool:
        """
        Mark a task as incomplete (status = False).

        Args:
            task_id: The ID of the task to mark incomplete

        Returns:
            True if operation was successful, False otherwise
        """
        task = self.task_map.get(task_id)
        if task:
            task.status = False
            return True
        return False


def display_menu():
    """Display the main menu options to the user."""
    print("\n" + "="*50)
    print("TODO APPLICATION - MAIN MENU")
    print("="*50)
    print("1. Add Task")
    print("2. View Task List")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Mark Task Complete")
    print("6. Mark Task Incomplete")
    print("7. Exit")
    print("-"*50)


def get_user_choice() -> str:
    """
    Get and validate user menu choice.

    Returns:
        The user's menu choice as a string
    """
    while True:
        choice = input("Enter your choice (1-7): ").strip()
        if choice in ['1', '2', '3', '4', '5', '6', '7']:
            return choice
        else:
            print("Invalid choice. Please enter a number between 1 and 7.")


def handle_add_task(task_manager: TaskManager):
    """Handle the add task functionality."""
    print("\n--- ADD TASK ---")
    description = input("Enter task description: ").strip()

    if not description:
        print("Error: Task description cannot be empty.")
        return

    task = task_manager.add_task(description)
    if task:
        print(f"Task added successfully! ID: {task.id}")
    else:
        print("Error: Failed to add task.")


def handle_view_tasks(task_manager: TaskManager):
    """Handle the view tasks functionality."""
    print("\n--- TASK LIST ---")
    tasks = task_manager.get_all_tasks()

    if not tasks:
        print("No tasks in the list.")
        return

    for task in tasks:
        print(task)


def handle_update_task(task_manager: TaskManager):
    """Handle the update task functionality."""
    print("\n--- UPDATE TASK ---")

    if not task_manager.get_all_tasks():
        print("No tasks available to update.")
        return

    try:
        task_id = int(input("Enter task ID to update: "))
    except ValueError:
        print("Error: Invalid task ID. Please enter a number.")
        return

    task = task_manager.get_task_by_id(task_id)
    if not task:
        print(f"Error: Task with ID {task_id} does not exist.")
        return

    new_description = input(f"Enter new description for task {task_id} ('{task.description}'): ").strip()

    if not new_description:
        print("Error: Task description cannot be empty.")
        return

    if task_manager.update_task(task_id, new_description):
        print("Task updated successfully!")
    else:
        print("Error: Failed to update task.")


def handle_delete_task(task_manager: TaskManager):
    """Handle the delete task functionality."""
    print("\n--- DELETE TASK ---")

    if not task_manager.get_all_tasks():
        print("No tasks available to delete.")
        return

    try:
        task_id = int(input("Enter task ID to delete: "))
    except ValueError:
        print("Error: Invalid task ID. Please enter a number.")
        return

    task = task_manager.get_task_by_id(task_id)
    if not task:
        print(f"Error: Task with ID {task_id} does not exist.")
        return

    confirm = input(f"Are you sure you want to delete task '{task.description}'? (y/N): ").lower()
    if confirm in ['y', 'yes']:
        if task_manager.delete_task(task_id):
            print("Task deleted successfully!")
        else:
            print("Error: Failed to delete task.")
    else:
        print("Task deletion cancelled.")


def handle_mark_complete(task_manager: TaskManager):
    """Handle marking a task as complete."""
    print("\n--- MARK TASK COMPLETE ---")

    if not task_manager.get_all_tasks():
        print("No tasks available.")
        return

    try:
        task_id = int(input("Enter task ID to mark complete: "))
    except ValueError:
        print("Error: Invalid task ID. Please enter a number.")
        return

    task = task_manager.get_task_by_id(task_id)
    if not task:
        print(f"Error: Task with ID {task_id} does not exist.")
        return

    if task_manager.mark_task_complete(task_id):
        print(f"Task {task_id} marked as complete!")
    else:
        print("Error: Failed to mark task as complete.")


def handle_mark_incomplete(task_manager: TaskManager):
    """Handle marking a task as incomplete."""
    print("\n--- MARK TASK INCOMPLETE ---")

    if not task_manager.get_all_tasks():
        print("No tasks available.")
        return

    try:
        task_id = int(input("Enter task ID to mark incomplete: "))
    except ValueError:
        print("Error: Invalid task ID. Please enter a number.")
        return

    task = task_manager.get_task_by_id(task_id)
    if not task:
        print(f"Error: Task with ID {task_id} does not exist.")
        return

    if task_manager.mark_task_incomplete(task_id):
        print(f"Task {task_id} marked as incomplete!")
    else:
        print("Error: Failed to mark task as incomplete.")


def main():
    """Main application loop."""
    print("Welcome to the Console Todo Application!")
    print("This is Phase I - In-memory console application")

    task_manager = TaskManager()

    while True:
        display_menu()
        choice = get_user_choice()

        if choice == '1':
            handle_add_task(task_manager)
        elif choice == '2':
            handle_view_tasks(task_manager)
        elif choice == '3':
            handle_update_task(task_manager)
        elif choice == '4':
            handle_delete_task(task_manager)
        elif choice == '5':
            handle_mark_complete(task_manager)
        elif choice == '6':
            handle_mark_incomplete(task_manager)
        elif choice == '7':
            print("\nThank you for using the Todo Application. Goodbye!")
            break

        # Pause to let user see results before showing menu again
        input("\nPress Enter to continue...")


if __name__ == "__main__":
    main()