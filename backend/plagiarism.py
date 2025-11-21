from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from plagiarism import compare_files
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/plagiarism/compare")
async def compare(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    os.makedirs("temp", exist_ok=True)

    path1 = f"temp/{file1.filename}"
    path2 = f"temp/{file2.filename}"

    with open(path1, "wb") as f:
        f.write(await file1.read())
    with open(path2, "wb") as f:
        f.write(await file2.read())

    result = compare_files(path1, path2)

    os.remove(path1)
    os.remove(path2)

    return result
