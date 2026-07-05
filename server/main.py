from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "CodeSage AI Backend Running 🚀"}