from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
from difflib import SequenceMatcher

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

#   STORE REPORTS HERE
REPORTS = []

# Compare files using difflib
def compare_files(path1, path2):
    with open(path1, "r") as f1, open(path2, "r") as f2:
        text1 = f1.read()
        text2 = f2.read()

    similarity = SequenceMatcher(None, text1, text2).ratio()
    return round(similarity * 100, 2)


#   POST /check

@app.post("/check")
async def compare(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    path1 = f"temp/{file1.filename}"
    path2 = f"temp/{file2.filename}"

    os.makedirs("temp", exist_ok=True)

    with open(path1, "wb") as f:
        f.write(await file1.read())
    with open(path2, "wb") as f:
        f.write(await file2.read())

    similarity = compare_files(path1, path2)

    # store report
    REPORTS.append({
        "id": len(REPORTS) + 1,
        "assignment": "Uploaded Manual Check",
        "studentA": file1.filename,
        "studentB": file2.filename,
        "similarity": similarity,
        "status": "flagged" if similarity >= 85 else "reviewed"
    })

    os.remove(path1)
    os.remove(path2)

    return {"similarity": similarity}

# ---------------------
#   GET /reports
# ---------------------
@app.get("/reports")
async def get_reports():
    return REPORTS
