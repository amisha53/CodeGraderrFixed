import React from 'react';
import StudentDashboard from './StudentDashboard';
import ProfessorDashboard from './ProfessorDashboard';
import GraderDashboard from './GraderDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{"role":"Student"}');

  switch (mockUser.role) {
    case 'Professor':
      return <ProfessorDashboard />;
    case 'Grader':
      return <GraderDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default Dashboard;
