# Todo Project - Phase I Console Based Application

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Spec-Driven Development Approach](#spec-driven-development-approach)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Evolution of Todo Project is a spec-driven development initiative focused on building a comprehensive todo application. Phase I implements a console-based todo application in Python with in-memory storage. This application allows users to manage their tasks through a menu-driven interface without any persistence beyond runtime.

The project follows a strict spec-driven development methodology, ensuring that all features are clearly defined in specifications before implementation begins. This approach ensures that the application meets all requirements while maintaining clean architecture and testable code.

### Project Goals
- Implement a functional console-based todo application
- Follow spec-driven development principles
- Maintain clean, well-documented code
- Provide a foundation for future phases of development
- Demonstrate best practices in software architecture

### Constraints
- No external databases or file persistence
- Single-user application only
- No authentication or web interfaces
- In-memory storage only
- No advanced features beyond basic CRUD operations

## Features

The Phase I console todo application provides the following core functionality:

### 1. Add Tasks
- Add new tasks with text descriptions
- Automatic ID generation for each task
- Creation timestamp tracking
- Validation to prevent empty descriptions

### 2. View Task List
- Display all tasks with their completion status
- Show task ID, description, and creation timestamp
- Handle empty task list gracefully
- Formatted output for easy reading

### 3. Update Task Description
- Update existing task descriptions by ID
- Validation to prevent empty descriptions
- Error handling for invalid task IDs

### 4. Delete Tasks
- Remove tasks by ID
- Confirmation prompt before deletion
- Error handling for invalid task IDs

### 5. Mark Tasks Complete/Incomplete
- Mark tasks as complete (✓) or incomplete (○)
- Toggle between complete and incomplete states
- Error handling for invalid task IDs

### 6. Menu-Driven Interface
- Clear, intuitive menu system
- Input validation for all user choices
- Error messages for invalid inputs
- Graceful exit functionality

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:

### Core Components

#### Task Class
- Represents a single todo item
- Contains ID, description, status, and creation timestamp
- Provides string representation for display

#### TaskManager Class
- Manages in-memory storage of tasks
- Provides methods for all CRUD operations
- Uses both list (for ordered display) and dictionary (for O(1) ID lookup)
- Handles ID generation and validation

#### CLI Interface
- Menu-driven user interface
- Input validation and error handling
- Separation of display and business logic

### Data Model

#### Task Entity
- **id**: Integer, auto-incremented unique identifier
- **description**: Text description of the task (required, non-empty)
- **status**: Boolean completion status (default: False/incomplete)
- **created_at**: Datetime timestamp when task was created

#### Storage Structure
- **Primary storage**: List of Task objects for ordered display
- **Index storage**: Dictionary mapping ID to Task object for O(1) lookup
- **ID counter**: Integer counter for auto-generating next available ID

### Design Patterns
- Single-file application for simplicity
- Object-oriented design with clear class responsibilities
- Separation of data management and user interface concerns
- In-memory storage with no persistence beyond runtime

## Installation & Setup

### Prerequisites
- Python 3.11 or higher
- No additional dependencies required (uses only Python standard library)

### Setup Instructions
1. Clone or download the repository
2. Navigate to the project directory
3. Ensure Python 3.11+ is installed and accessible from command line
4. No additional setup required - the application uses only standard library

### Running the Application
```bash
python todo_app.py
```

## Usage

### Basic Usage Flow
1. Run the application: `python todo_app.py`
2. The main menu will display available options
3. Select an option by entering the corresponding number
4. Follow the prompts to complete your desired action
5. Press Enter to continue after each operation
6. Select option 7 to exit the application

### Detailed Usage Instructions

#### Adding Tasks
1. Select option "1" or "Add Task" from the main menu
2. Enter your task description when prompted
3. The task will be added with a unique ID and shown as incomplete
4. You'll receive a confirmation message with the task ID

#### Viewing Tasks
1. Select option "2" or "View Task List" from the main menu
2. All tasks will be displayed with their ID, description, status, and creation time
3. Completed tasks will show a "✓" symbol
4. Incomplete tasks will show a "○" symbol

#### Updating Tasks
1. Select option "3" or "Update Task" from the main menu
2. Enter the ID of the task you want to update
3. Enter the new description for the task
4. The task description will be updated immediately

#### Deleting Tasks
1. Select option "4" or "Delete Task" from the main menu
2. Enter the ID of the task you want to delete
3. Confirm the deletion when prompted
4. The task will be removed from the list

#### Marking Tasks Complete
1. Select option "5" or "Mark Task Complete" from the main menu
2. Enter the ID of the task you want to mark complete
3. The task status will change to complete (✓)

#### Marking Tasks Incomplete
1. Select option "6" or "Mark Task Incomplete" from the main menu
2. Enter the ID of the task you want to mark incomplete
3. The task status will change to incomplete (○)

#### Exiting the Application
1. Select option "7" or "Exit" from the main menu
2. The application will terminate (all data will be lost)

### Error Handling
- Invalid task IDs will show an error message
- Empty task descriptions will be rejected
- Invalid menu choices will prompt for a valid selection
- Empty task lists will display an appropriate message

## Code Structure

The application is implemented as a single Python file with the following structure:

```
todo_app.py
├── Task Class
│   ├── __init__ method
│   ├── __str__ method
│   └── Properties: id, description, status, created_at
├── TaskManager Class
│   ├── __init__ method
│   ├── add_task method
│   ├── get_task_by_id method
│   ├── get_all_tasks method
│   ├── update_task method
│   ├── delete_task method
│   ├── mark_task_complete method
│   └── mark_task_incomplete method
├── CLI Functions
│   ├── display_menu function
│   ├── get_user_choice function
│   ├── handle_add_task function
│   ├── handle_view_tasks function
│   ├── handle_update_task function
│   ├── handle_delete_task function
│   ├── handle_mark_complete function
│   ├── handle_mark_incomplete function
│   └── input validation functions
└── main function
    └── Application entry point and main loop
```

### Key Design Decisions
- Single-file implementation for simplicity and ease of understanding
- Object-oriented approach with clear class responsibilities
- In-memory storage using Python's built-in data structures
- Separation of business logic (TaskManager) and presentation (CLI functions)
- Comprehensive error handling and input validation
- Type hints for better code documentation and IDE support

## Spec-Driven Development Approach

This project follows a strict spec-driven development methodology with the following phases:

### 1. Constitution
- Defines project principles and constraints
- Establishes technology choices and development guidelines
- Sets quality standards and architectural principles

### 2. Specifications (Specs)
- Detailed feature specifications with user stories
- Acceptance criteria for each feature
- Edge cases and error handling requirements
- Functional and non-functional requirements

### 3. Planning (Plan)
- Technical implementation plan
- Architecture decisions and data models
- Project structure and file organization
- Complexity tracking and risk assessment

### 4. Tasks (Tasks)
- Detailed task breakdown for implementation
- Test-driven development approach
- Parallel execution opportunities
- Dependencies and execution order

### 5. Implementation
- Code implementation following the defined tasks
- Comprehensive testing and validation
- Documentation and quality assurance

### Spec Files Structure
```
specs/
└── 001-phase1-todo-cli/
    ├── spec.md          # Feature specification
    ├── plan.md          # Implementation plan
    ├── data-model.md    # Data model definition
    ├── quickstart.md    # Quickstart guide
    ├── research.md      # Research findings
    ├── tasks.md         # Implementation tasks
    ├── contracts/       # API contracts
    └── checklists/      # Quality checklists
```

## Project Structure

```
Hackathon II Spec-Driven Development/
├── todo_app.py              # Main application file
├── CLAUDE.md                # Claude agent configuration
├── .gitignore               # Git ignore patterns
├── .claude/                 # Claude agent configuration files
│   ├── settings.local.json  # Local settings
│   └── commands/            # Claude commands
├── .specify/                # SpecKit Plus configuration
│   ├── memory/              # Memory files
│   ├── scripts/             # Scripts
│   └── templates/           # Templates
├── history/                 # History of prompts and decisions
│   └── prompts/             # Prompt history records
├── specs/                   # Specifications
│   └── 001-phase1-todo-cli/ # Phase I specifications
│       ├── spec.md
│       ├── plan.md
│       ├── data-model.md
│       ├── quickstart.md
│       ├── research.md
│       ├── tasks.md
│       ├── contracts/
│       └── checklists/
└── README.md                # This file
```

## Testing

### Test Strategy
The project follows a test-driven development approach where tests are defined in the specification phase and implemented alongside the features. The testing strategy includes:

- Unit tests for individual components (Task, TaskManager)
- Integration tests for CLI interface functionality
- Contract tests to ensure API compliance
- Error case testing for all edge cases

### Test Organization
While test files are not yet created in this implementation, the specification defines the following test structure:
- `tests/test_todo_app.py` - Unit tests for task operations
- `tests/test_cli_interface.py` - Integration tests for CLI interactions

### Test Coverage
The specification ensures that all user stories have corresponding tests with defined acceptance scenarios. Each feature must be independently testable and validated.

## Development Guidelines

### Code Standards
- Follow Python PEP 8 style guidelines
- Use type hints for all function parameters and return values
- Write comprehensive docstrings for classes and functions
- Maintain clean separation of concerns
- Implement proper error handling and validation

### Architecture Principles
- Single responsibility principle: each class and function has one clear purpose
- Open/closed principle: modules are open for extension but closed for modification
- Dependency inversion: high-level modules don't depend on low-level modules
- Clean architecture: separation of business logic and presentation layers

### Quality Assurance
- All code changes must align with the specification
- No features beyond the defined scope should be implemented
- Error handling for all edge cases as defined in specifications
- Comprehensive input validation
- User-friendly error messages

## Contributing

This project follows a spec-driven development approach where contributions must align with the defined specifications. To contribute:

1. Review the existing specifications in the `specs/` directory
2. Identify areas for improvement or bug fixes
3. Follow the established development workflow
4. Ensure all changes comply with the project constitution
5. Submit changes for review with reference to the relevant specifications

### Development Workflow
1. Understand the specification requirements
2. Plan implementation following the defined architecture
3. Implement features following the task breakdown
4. Test functionality against acceptance criteria
5. Document changes and update relevant files
6. Submit for review with specification references

## License

This project is part of a spec-driven development hackathon and is intended for educational and demonstration purposes. The code is provided as-is without any warranty or license restrictions for learning and experimentation purposes.

---

*This README was generated based on the comprehensive analysis of the project's specification-driven development approach and implementation.*
*Built by ausafulislam*
