import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Clock, CheckCircle, FileText, Filter } from 'lucide-react';

const GraderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAssignment, setSelectedAssignment] = useState('all');

  const submissions = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      studentId: 'S001',
      assignment: 'Binary Search Implementation',
      submittedAt: '2025-10-05 14:30',
      status: 'pending',
      attempts: 1,
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      studentId: 'S002',
      assignment: 'REST API Development',
      submittedAt: '2025-10-04 09:15',
      status: 'pending',
      attempts: 2,
    },
    {
      id: 3,
      studentName: 'Charlie Brown',
      studentId: 'S003',
      assignment: 'Binary Search Implementation',
      submittedAt: '2025-10-05 16:45',
      status: 'graded',
      attempts: 1,
      grade: 88,
    },
    {
      id: 4,
      studentName: 'Diana Prince',
      studentId: 'S004',
      assignment: 'REST API Development',
      submittedAt: '2025-10-03 11:20',
      status: 'graded',
      attempts: 1,
      grade: 95,
    },
    {
      id: 5,
      studentName: 'Eve Martinez',
      studentId: 'S005',
      assignment: 'Binary Search Implementation',
      submittedAt: '2025-10-06 08:00',
      status: 'pending',
      attempts: 3,
    },
  ];

  const assignments = ['all', 'Binary Search Implementation', 'REST API Development'];

  const filteredSubmissions =
    selectedAssignment === 'all'
      ? submissions
      : submissions.filter((s) => s.assignment === selectedAssignment);

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;
  const gradedCount = submissions.filter((s) => s.status === 'graded').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Grader Dashboard</h1>
        <p className="text-gray-600 mt-1">Review and grade student submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{submissions.length}</p>
            </div>
            <FileText className="text-blue-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
            </div>
            <Clock className="text-yellow-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Graded</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{gradedCount}</p>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </Card>
      </div>

      <Card title="Student Submissions">
        <div className="mb-4 flex items-center space-x-3">
          <Filter size={20} className="text-gray-500" />
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {assignments.map((assignment) => (
              <option key={assignment} value={assignment}>
                {assignment === 'all' ? 'All Assignments' : assignment}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {filteredSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {submission.studentName}
                    </h3>
                    <span className="text-sm text-gray-500">({submission.studentId})</span>
                    {submission.status === 'pending' ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={14} className="mr-1" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" />
                        Graded
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{submission.assignment}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Submitted: {submission.submittedAt}</span>
                    <span>Attempt: {submission.attempts}</span>
                    {submission.grade && (
                      <span className="font-semibold text-green-600">
                        Grade: {submission.grade}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(`/editor/${submission.id}`)}
                  >
                    View Code
                  </Button>
                  {submission.status === 'pending' ? (
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/grade/${submission.id}`)}
                    >
                      Grade
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/feedback/${submission.id}`)}
                    >
                      Edit Grade
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

export default GraderDashboard;
