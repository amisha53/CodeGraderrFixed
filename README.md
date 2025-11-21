PROJECT TITLE:
CodeGrader – Automated Code Submission & Plagiarism Detection System

PROJECT OVERVIEW:
CodeGrader is a full-stack web platform designed to simplify the submission, testing, grading, and plagiarism detection of student programming assignments. It provides role-based dashboards for Students, Professors, and Graders, along with integrated code comparison tools and automated report generation.

This document explains how the project works, its file structure, how to set it up, and the functionality delivered by each component, especially the Plagiarism Detection module.

KEY FEATURES:

• Student Dashboard: Submit assignments, view attempts, run code locally.
• Professor Dashboard: Create assignments, monitor submissions, access plagiarism reports.
• Grader Tools: Review attempts, provide feedback.
• Plagiarism Detection (Member 4 feature):
– Upload two files and compare similarity
– Multiple similarity algorithms
– Clean normalization
– Results saved as JSON reports
– UI dashboard for reports

PROJECT STRUCTURE:

CodeGraderr-main/
│
├── backend/
│   main.py
│   compare_engine.py
│   plagiarism.py
│   storage.py
│   requirements.txt
│
├── src/
│   pages/
│   components/
│   main.tsx
│
└── public/


SETUP INSTRUCTIONS

1. Clone the Repository
Copy and paste:

git clone https://github.com/amisha53/CodeGraderrFixed.git
cd CodeGraderrFixed

BACKEND SETUP (FASTAPI)

Step 1: Navigate to backend

cd backend


Step 2: Create virtual environment

python -m venv venv


Step 3: Activate environment (Windows)

.\venv\Scripts\activate


Step 4: Install required packages

pip install -r requirements.txt


Step 5: Start backend server

uvicorn main:app --reload


Backend will run on:
http://127.0.0.1:8000

FRONTEND SETUP (REACT + TYPESCRIPT + VITE)

Step 1: Return to project root

cd ..


Step 2: Install dependencies

npm install


Step 3: Start development server

npm run dev


Frontend will run on:
http://localhost:5173

PLAGIARISM DETECTION WORKFLOW

The system supports both manual and (planned) automatic comparison.

Manual Comparison:

Open the Plagiarism page

Click “Compare Files”

Upload File A and File B

View similarity percentage

Reports are saved into reports.json

Automatic Comparison:
(Enabled once the submissions backend is fully integrated)
The pipeline will be:
Student submits → File stored → System compares all submissions → Report generated → Dashboard updated

BACKEND API ENDPOINTS

POST /compare
Upload two files → Returns similarity score

GET /reports
Returns all saved plagiarism reports

POST /save_report
Adds a new plagiarism report to reports.json
