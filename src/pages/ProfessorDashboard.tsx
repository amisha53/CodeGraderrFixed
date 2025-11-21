import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import { FileText, Users, CheckCircle, Plus, CreditCard as Edit, Trash2 } from 'lucide-react';

const ProfessorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [assignments] = useState([
    {
      id: 1,
      title: 'Binary Search Implementation',
      course: 'Data Structures',
      dueDate: '2025-10-12',
      submissions: 24,
      totalStudents: 30,
      graded: 0,
    },
    {
      id: 2,
      title: 'REST API Development',
      course: 'Web Development',
      dueDate: '2025-10-08',
      submissions: 28,
      totalStudents: 30,
      graded: 15,
    },
    {
      id: 3,
      title: 'Sorting Algorithms',
      course: 'Algorithms',
      dueDate: '2025-09-30',
      submissions: 30,
      totalStudents: 30,
      graded: 30,
    },
  ]);

  const columns = [
    { header: 'Assignment', accessor: 'title' },
    { header: 'Course', accessor: 'course' },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      header: 'Submissions',
      accessor: 'submissions',
      render: (value: number, row: any) => `${value}/${row.totalStudents}`,
    },
    {
      header: 'Graded',
      accessor: 'graded',
      render: (value: number, row: any) => (
        <div className="flex items-center">
          <span className={value === row.submissions ? 'text-green-600 font-medium' : ''}>
            {value}/{row.submissions}
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value: number) => (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/assignments/${value}`)}
            className="text-blue-600 hover:text-blue-800"
            title="View Details"
          >
            <FileText size={18} />
          </button>
          <button
            onClick={() => navigate(`/assignments/edit/${value}`)}
            className="text-gray-600 hover:text-gray-800"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => console.log('Delete', value)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Professor Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage assignments and track student progress</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/assignments/new')}
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Assignment</span>
        </Button>
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
              <p className="text-sm text-gray-500">Total Submissions</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {assignments.reduce((sum, a) => sum + a.submissions, 0)}
              </p>
            </div>
            <Users className="text-blue-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Grading Complete</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {Math.round(
                  (assignments.reduce((sum, a) => sum + a.graded, 0) /
                    assignments.reduce((sum, a) => sum + a.submissions, 0)) *
                    100
                )}
                %
              </p>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </Card>
      </div>

      <Card title="Your Assignments">
        <Table columns={columns} data={assignments} />
      </Card>

      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/plagiarism')}
            className="flex items-center justify-center space-x-2 py-4"
          >
            <span>View Plagiarism Reports</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/assignments')}
            className="flex items-center justify-center space-x-2 py-4"
          >
            <span>Browse All Assignments</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfessorDashboard;
