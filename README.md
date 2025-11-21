CodeGraderr – Plagiarism Detection Feature Documentation
Overview
This document explains the components required for the Plagiarism Detection system in CodeGraderr. It covers backend FastAPI services, file comparison logic, frontend UI, and all fixes applied to make the feature functional.
1.	Backend (FastAPI)
The backend handles comparing two code files and storing reports temporarily while running locally.
Backend structure:
backend/
•	plagiarism_api.py
•	main.py
•	plagiarism.py
•	requirements.txt
2.	Frontend (React + TypeScript)
The frontend displays reports and allows code comparison.
Key updated files:
src/pages/Plagiarism.tsx
•	Fetches live reports from backend
•	Filters by assignment and similarity
•	Added Compare Files navigation
•	Prevents previous white screen crashes
src/pages/Compare.tsx
•	File upload UI
•	Calls backend /check endpoint
•	Displays similarity result
src/App.tsx
•	Added Compare route
•	Ensures navigation works
tsconfig.json
•	Updated to prevent React import crashes
3.	Testing
Backend testing:
•	Tested file uploads
•	Verified similarity logs
•	Confirmed working endpoints
Frontend testing:
•	Dashboard loads actual reports
•	Compare files page works
•	Slider and filters function normally
4.	How to Run and Test
Backend:
Open a terminal in backend folder
Activate the environment
Run: uvicorn plagiarism_api:app --reload
Backend starts at http://127.0.0.1:8000
5.	Frontend:
Open another terminal inside the main CodeGraderr folder
Run: npm run dev
Open the local URL printed (usually http://localhost:5173 or similar)
6.	Testing workflow:
Go to Dashboard
Open Plagiarism page to see stored reports
Click Compare Files to upload any two code files
View similarity percentage
Return to Plagiarism page to see new report appear
Summary
The plagiarism feature is fully functional. Backend compares files and records reports. Frontend displays them dynamically with filtering and navigation to the file comparison page.

