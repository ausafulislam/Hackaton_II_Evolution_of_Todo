from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlmodel import Session, select
from database import get_session
from models import Conversation, Message
from agent import run_agent
from datetime import datetime
import uuid
from typing import List, Optional

router = APIRouter()

class ChatRequest(BaseModel):
    user_id: str
    conversation_id: Optional[str] = None
    message: str

class ChatResponse(BaseModel):
    response: str
    conversation_id: str

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, session: Session = Depends(get_session)):
    user_id = request.user_id
    conversation_id = request.conversation_id
    user_message = request.message
    
    # 1. Handle Conversation ID
    if not conversation_id:
        # Create new conversation if not provided
        conversation = Conversation(user_id=user_id)
        session.add(conversation)
        session.commit()
        session.refresh(conversation)
        conversation_id = conversation.id
    else:
        # Verify conversation exists
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            # If not found, create new one (or raise error? implied create new or error. Let's create new for robustness or error if invalid)
            # Spec says "Load conversation history". If ID provided but not found, it's an error usually.
            # But let's assume valid ID or create new if not found to be safe? 
            # Better to raise valid error if client thinks they have context.
            raise HTTPException(status_code=404, detail="Conversation not found")
            
    # 2. Save User Message
    new_message = Message(
        user_id=user_id,
        conversation_id=conversation_id,
        role="user",
        content=user_message,
        created_at=datetime.utcnow()
    )
    session.add(new_message)
    session.commit()
    
    # 3. Load History
    # Get all messages for this conversation sorted by time
    statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
    db_messages = session.exec(statement).all()
    
    # Convert to OpenAI format
    openai_messages = []
    
    # System Prompt with User Context
    system_prompt = f"""
    You are a smart Todo Assistant. The current user's ID is '{user_id}'.
    
    RULES:
    1. You must use this user_id for all tool calls.
    2. NEVER ask the user for a `task_id` or `user_id`.
    3. If the user refers to a task by name (e.g., "delete 'Buy Milk'" or "remove duplicate tasks"), you MUST first call `list_tasks` to find the task(s) and their IDs.
    4. After finding the task(s), perform the requested action (delete/update) using the retrieved ID(s).
    5. If the user request is ambiguous (e.g., "delete the task"), ask for clarification by listing the available tasks.
    6. When deleting a task, if the user hasn't explicitly confirmed (e.g. "yes delete it"), you may ask for confirmation or proceed if the intent is clear (e.g. "delete 'Buy Milk'"), but ALWAYS confirm the action completion by stating the deleted task's title.
    7. For "remove duplicates": List all tasks, find those with identical titles, keep one, and delete the rest. Report which were deleted.
    """
    
    openai_messages.append({
        "role": "system",
        "content": system_prompt
    })
    
    for msg in db_messages:
        openai_messages.append({"role": msg.role, "content": msg.content})
        
    # 4. Run Agent
    # The agent will execute tools and return the final response text
    try:
        assistant_content = run_agent(openai_messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")
    
    # 5. Save Assistant Response
    assistant_message = Message(
        user_id=user_id,
        conversation_id=conversation_id,
        role="assistant",
        content=assistant_content or "I processed your request.", # Handle None content if any
        created_at=datetime.utcnow()
    )
    session.add(assistant_message)
    session.commit()
    
    return ChatResponse(response=assistant_message.content, conversation_id=conversation_id)
