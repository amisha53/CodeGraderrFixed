from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from rapidfuzz import fuzz

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/check")
async def check_plagiarism(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    code1 = (await file1.read()).decode("utf-8")
    code2 = (await file2.read()).decode("utf-8")

    similarity = fuzz.ratio(code1, code2)

    return {
        "similarity": similarity,
        "status": (
            "flagged" if similarity >= 85 
            else "review" if similarity >= 70 
            else "cleared"
        )
    }
