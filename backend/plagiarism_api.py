from fastapi import APIRouter, UploadFile, File, Form
import os
from .storage import save_submission
from .compare_engine import compare_files

router = APIRouter()
REPORTS = []
SUBMISSIONS = {}

@router.post("/submit")
def submit_file(
    student_id: str = Form(...),
    assignment_id: str = Form(...),
    file: UploadFile = File(...)
):
    path = save_submission(file, assignment_id, student_id)
    SUBMISSIONS.setdefault(assignment_id, [])
    SUBMISSIONS[assignment_id].append((student_id, path))
    return {"status": "submitted", "path": path}

@router.get("/scan/{assignment_id}")
def scan_assignment(assignment_id: str):
    reports = []
    subs = SUBMISSIONS.get(assignment_id, [])

    for i in range(len(subs)):
        for j in range(i + 1, len(subs)):
            sA, pA = subs[i]
            sB, pB = subs[j]
            sim = compare_files(pA, pB)

            report = {
                "assignment": assignment_id,
                "studentA": sA,
                "studentB": sB,
                "similarity": sim,
                "status": "flagged" if sim >= 50 else "cleared",
            }
            reports.append(report)
            REPORTS.append(report)
    return reports

@router.get("/reports")
def get_reports():
    return REPORTS
