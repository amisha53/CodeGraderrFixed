CodeGrader – Automated Code Submission & Plagiarism Detection System

PROJECT OVERVIEW:
CodeGrader is a full-stack web platform designed to simplify the submission, testing, grading, and plagiarism detection of student programming assignments. It provides role-based dashboards for Students, Professors, and Graders, along with integrated code comparison tools and automated report generation.

This version of the project includes full implementation of Member 4’s responsibilities:
- Plagiarism comparison engine
- File normalization (strip whitespace, punctuation)
- Multi‑algorithm similarity scoring (Levenshtein, difflib)
- JSON report storage
- Backend API endpoints
- Frontend UI integration
- Professor dashboard filtering

KEY FEATURES:
• Student Dashboard
• Professor Dashboard
• Grader Dashboard
• Plagiarism Detection Module:
  – Upload two files
  – Multiple algorithms
  – JSON reports
  – UI dashboard filtering
  – Future support for automatic bulk comparison

PROJECT STRUCTURE:
CodeGraderr-main/
│ backend/
│ ├── main.py               (FastAPI server + routes)
│ ├── compare_engine.py     (Similarity algorithms)
│ ├── plagiarism.py         (Normalization + comparison)
│ ├── storage.py            (Report storage)
│ └── requirements.txt
│
│ src/
│ ├── pages/                (React pages including Plagiarism.tsx)
│ ├── components/           (UI components)
│ └── main.tsx
│
└── public/

SETUP INSTRUCTIONS:

Clone repo:
git clone https://github.com/amisha53/CodeGraderrFixed.git
cd CodeGraderrFixed

BACKEND SETUP:
cd backend
python -m venv venv
./venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload

The backend will run at:
http://127.0.0.1:8000

FRONTEND SETUP:
cd ..
npm install
npm run dev

The frontend will run at:
http://localhost:5173

HOW TO TEST PLAGIARISM FEATURE:

1. Go to http://localhost:5173/plagiarism
2. Click “Compare Files”
3. Upload File A and File B
4. Backend performs:
   – normalization
   – algorithm comparison
   – score generation
5. JSON report is saved to backend/reports.json
6. UI automatically displays updated report count

API ENDPOINTS (Member 4 created):

POST /compare  
Input: two files  
Output: similarity score + JSON report entry  

GET /reports  
Retrieve all stored plagiarism reports  

POST /save_report  
Manually append a report (internal use)

CHANGES MADE:

1. Built compare_engine.py with all similarity logic  
2. Built plagiarism.py with normalization and scoring workflow  
3. Built storage backend for saving results  
4. Integrated backend endpoints into FastAPI  
5. Connected frontend Compare Files button to API  
6. Created dashboard UI for reports  
7. Added filtering + slider threshold  
8. Wrote documentation and testing steps  

 TEST:

Backend:
- Run uvicorn main:app --reload
- Test /compare with Postman
- Test /reports endpoint
- Check reports.json updates

Frontend:
- Run npm run dev
- Navigate to Plagiarism page
- Upload sample code files
- Confirm result appears on screen
- Check dashboard counters update

