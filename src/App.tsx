import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AssignmentList from "./pages/AssignmentList";
import AssignmentForm from "./pages/AssignmentForm";
import AssignmentDetail from "./pages/AssignmentDetail";
import CodeEditor from "./pages/CodeEditor";
import Feedback from "./pages/Feedback";
import Plagiarism from "./pages/Plagiarism";
import Profile from "./pages/Profile";
import Compare from "./pages/Compare";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/assignments" element={<AssignmentList />} />
          <Route path="/assignments/new" element={<AssignmentForm />} />
          <Route path="/assignments/edit/:id" element={<AssignmentForm />} />
          <Route path="/assignments/:id" element={<AssignmentDetail />} />

          <Route path="/editor/:id" element={<CodeEditor />} />

          <Route path="/grade/:id" element={<Feedback />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback/:id" element={<Feedback />} />

          <Route path="/plagiarism" element={<Plagiarism />} />

          <Route path="/compare/:id" element={<Compare />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
