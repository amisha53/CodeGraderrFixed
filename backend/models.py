from pydantic import BaseModel

class Submission(BaseModel):
    student_id: str
    assignment_id: str
    filename: str
    path: str

class Report(BaseModel):
    assignment_id: str
    studentA: str
    studentB: str
    similarity: float
    status: str = "flagged"
