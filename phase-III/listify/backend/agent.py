from openai import OpenAI
from mcp_server import add_task, list_tasks, complete_task, delete_task, update_task
import json
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

client = OpenAI(
    api_key=os.environ.get("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


# Define tools for OpenAI
tools = [
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a new task for the user",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {"type": "string", "description": "The user ID"},
                    "title": {"type": "string", "description": "The title of the task"},
                    "description": {"type": "string", "description": "Optional description of the task"}
                },
                "required": ["user_id", "title"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "List tasks for the user",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {"type": "string", "description": "The user ID"},
                    "status": {"type": "string", "enum": ["pending", "completed"], "description": "Filter by status"}
                },
                "required": ["user_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "complete_task",
            "description": "Mark a task as completed",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {"type": "string", "description": "The user ID"},
                    "task_id": {"type": "string", "description": "The ID of the task to complete"}
                },
                "required": ["user_id", "task_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Delete a task",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {"type": "string", "description": "The user ID"},
                    "task_id": {"type": "string", "description": "The ID of the task to delete"}
                },
                "required": ["user_id", "task_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "update_task",
            "description": "Update a task's details",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {"type": "string", "description": "The user ID"},
                    "task_id": {"type": "string", "description": "The ID of the task to update"},
                    "title": {"type": "string", "description": "New title"},
                    "description": {"type": "string", "description": "New description"}
                },
                "required": ["user_id", "task_id"]
            }
        }
    }
]

def run_agent(messages):
    """
    Run the agent with the given messages.
    Handles tool calls and returns the final response.
    """
    try:
        response = client.chat.completions.create(
            model="google/gemini-2.0-flash-001",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )

        response_message = response.choices[0].message
        
        # If the model calls a tool
        if response_message.tool_calls:
            print(f"Tool calls detected: {len(response_message.tool_calls)}")
            messages.append(response_message)
            
            for tool_call in response_message.tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)
                
                # Map function names to actual functions
                function_map = {
                    "add_task": add_task,
                    "list_tasks": list_tasks,
                    "complete_task": complete_task,
                    "delete_task": delete_task,
                    "update_task": update_task
                }
                
                function_to_call = function_map.get(function_name)
                
                if function_to_call:
                    print(f"Calling tool: {function_name} with args: {function_args}")
                    try:
                        function_response = function_to_call(**function_args)
                        content = json.dumps(function_response)
                    except Exception as e:
                        print(f"Error calling tool {function_name}: {e}")
                        content = json.dumps({"error": str(e)})
                    
                    messages.append({
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": content
                    })
                else:
                    print(f"Tool {function_name} not found")
                    messages.append({
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": json.dumps({"error": f"Tool {function_name} not found"})
                    })
            
            # Recurse for final answer (or next tool call)
            return run_agent(messages)
            
        return response_message.content

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Critical Agent Error: {e}")
        return f"I am sorry, I am encountering an error: {str(e)}"
