import os
from shutil import move

BASE_DIR = "submissions"

def save_submission(file, assignment_id, student_id):
    folder = f"{BASE_DIR}/{assignment_id}"
    os.makedirs(folder, exist_ok=True)

    filepath = f"{folder}/{student_id}_{file.filename}"
    with open(filepath, "wb") as f:
        f.write(file.file.read())
    return filepath
