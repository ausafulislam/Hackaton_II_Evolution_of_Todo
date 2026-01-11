from fastapi import FastAPI
from routers import tasks

app = FastAPI(title="Todo API Backend (Phase II)")

# Include the tasks router
app.include_router(tasks.router, prefix="/api/{user_id}", tags=["tasks"])

@app.get("/")
def read_root():
    return {"message": "Todo API Backend (Phase II) is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)