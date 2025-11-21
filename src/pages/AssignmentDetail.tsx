import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import { ArrowLeft, Calendar, Users, Award, Eye, CreditCard as Edit } from 'lucide-react';

const AssignmentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{"role":"Student"}');
  const isProfessor = mockUser.role === 'Professor' || mockUser.role === 'Grader';

  const assignment = {
    id: 1,
    title: 'Binary Search Implementation',
    course: 'Data Structures',
    description: 'Implement binary search algorithm in your preferred language',
    instructions:
      'Your implementation should handle edge cases and have O(log n) time complexity. Make sure to include proper error handling and test your code with the provided test cases.',
    dueDate: '2025-10-12',
    maxAttempts: 3,
    points: 100,
    language: 'Python',
    testCases: 5,
    status: 'active',
  };

  const submissions = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      studentId: 'S001',
      submittedAt: '2025-10-05 14:30',
      attempt: 1,
      status: 'graded',
      grade: 88,
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      studentId: 'S002',
      submittedAt: '2025-10-04 09:15',
      attempt: 2,
      status: 'pending',
      grade: null,
    },
    {
      id: 3,
      studentName: 'Charlie Brown',
      studentId: 'S003',
      submittedAt: '2025-10-05 16:45',
      attempt: 1,
      status: 'graded',
      grade: 92,
    },
  ];

  const columns = [
    { header: 'Student', accessor: 'studentName' },
    { header: 'Student ID', accessor: 'studentId' },
    { header: 'Submitted', accessor: 'submittedAt' },
    { header: 'Attempt', accessor: 'attempt' },
    {
      header: 'Status',
      accessor: 'status',
      render: (value: string) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            value === 'graded'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {value === 'graded' ? 'Graded' : 'Pending'}
        </span>
      ),
    },
    {
      header: 'Grade',
      accessor: 'grade',
      render: (value: number | null) => (
        <span className={value ? 'font-semibold text-green-600' : 'text-gray-400'}>
          {value ? `${value}%` : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value: number) => (
        <Button
          variant="secondary"
          onClick={() => navigate(`/editor/${value}`)}
          className="text-sm px-3 py-1 flex items-center space-x-1"
        >
          <Eye size={16} />
          <span>View</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={() => navigate('/assignments')}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{assignment.title}</h1>
            <p className="text-blue-600 font-medium mt-1">{assignment.course}</p>
          </div>
        </div>
        {isProfessor && (
          <Button
            variant="primary"
            onClick={() => navigate(`/assignments/edit/${id}`)}
            className="flex items-center space-x-2"
          >
            <Edit size={18} />
            <span>Edit Assignment</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center space-x-3">
            <Calendar className="text-blue-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <Users className="text-green-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Submissions</p>
              <p className="font-semibold text-gray-800">{submissions.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <Award className="text-yellow-600" size={28} />
            <div>
              <p className="text-sm text-gray-500">Max Points</p>
              <p className="font-semibold text-gray-800">{assignment.points}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-sm text-gray-500">Max Attempts</p>
              <p className="font-semibold text-gray-800">{assignment.maxAttempts}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Assignment Description">
        <p className="text-gray-700 leading-relaxed">{assignment.description}</p>
      </Card>

      <Card title="Instructions">
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">{assignment.instructions}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Language</p>
              <p className="font-medium text-gray-800">{assignment.language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Test Cases</p>
              <p className="font-medium text-gray-800">{assignment.testCases}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {assignment.status === 'active' ? 'Active' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {isProfessor && (
        <Card title="Student Submissions">
          <Table columns={columns} data={submissions} />
        </Card>
      )}

      {!isProfessor && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={() => navigate(`/editor/${id}`)}
            className="px-8"
          >
            Start Assignment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetail;
