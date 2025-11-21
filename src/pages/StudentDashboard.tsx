import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const assignments = [
    {
      id: 1,
      title: 'Binary Search Implementation',
      course: 'Data Structures',
      dueDate: '2025-10-12',
      status: 'pending',
      grade: null,
      attempts: 0,
      maxAttempts: 3,
    },
    {
      id: 2,
      title: 'REST API Development',
      course: 'Web Development',
      dueDate: '2025-10-08',
      status: 'submitted',
      grade: null,
      attempts: 1,
      maxAttempts: 2,
    },
    {
      id: 3,
      title: 'Sorting Algorithms',
      course: 'Algorithms',
      dueDate: '2025-09-30',
      status: 'graded',
      grade: 85,
      attempts: 2,
      maxAttempts: 3,
    },
    {
      id: 4,
      title: 'Database Design',
      course: 'Database Systems',
      dueDate: '2025-09-25',
      status: 'graded',
      grade: 92,
      attempts: 1,
      maxAttempts: 2,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={14} className="mr-1" />
            Pending
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FileText size={14} className="mr-1" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={14} className="mr-1" />
            Graded
          </span>
        );
      default:
        return null;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your assignments and grades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Assignments</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{assignments.length}</p>
            </div>
            <FileText className="text-blue-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {assignments.filter((a) => a.status === 'pending').length}
              </p>
            </div>
            <Clock className="text-yellow-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Grade</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {(
                  assignments.filter((a) => a.grade).reduce((sum, a) => sum + (a.grade || 0), 0) /
                  assignments.filter((a) => a.grade).length
                ).toFixed(0)}
                %
              </p>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </Card>
      </div>

      <Card title="My Assignments">
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                    {getStatusBadge(assignment.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span
                      className={`${
                        isOverdue(assignment.dueDate) && assignment.status === 'pending'
                          ? 'text-red-600 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span className="text-gray-500">
                      Attempts: {assignment.attempts}/{assignment.maxAttempts}
                    </span>
                    {assignment.grade !== null && (
                      <span className="font-semibold text-green-600">
                        Grade: {assignment.grade}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {assignment.status === 'pending' && (
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/editor/${assignment.id}`)}
                    >
                      Start
                    </Button>
                  )}
                  {assignment.status === 'submitted' && (
                    <Button variant="secondary" disabled>
                      Under Review
                    </Button>
                  )}
                  {assignment.status === 'graded' && (
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/feedback/${assignment.id}`)}
                    >
                      View Feedback
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentDashboard;
