import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Search, Filter, Plus } from 'lucide-react';

const AssignmentList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{"role":"Student"}');
  const isProfessor = mockUser.role === 'Professor';

  const assignments = [
    {
      id: 1,
      title: 'Binary Search Implementation',
      course: 'Data Structures',
      description: 'Implement binary search algorithm in your preferred language',
      dueDate: '2025-10-12',
      maxAttempts: 3,
      points: 100,
      status: 'active',
    },
    {
      id: 2,
      title: 'REST API Development',
      course: 'Web Development',
      description: 'Create a RESTful API using Node.js and Express',
      dueDate: '2025-10-08',
      maxAttempts: 2,
      points: 150,
      status: 'active',
    },
    {
      id: 3,
      title: 'Sorting Algorithms',
      course: 'Algorithms',
      description: 'Implement and compare various sorting algorithms',
      dueDate: '2025-09-30',
      maxAttempts: 3,
      points: 100,
      status: 'closed',
    },
    {
      id: 4,
      title: 'Database Design',
      course: 'Database Systems',
      description: 'Design and implement a relational database schema',
      dueDate: '2025-09-25',
      maxAttempts: 2,
      points: 120,
      status: 'closed',
    },
  ];

  const courses = ['all', ...new Set(assignments.map((a) => a.course))];

  const filteredAssignments = assignments
    .filter((a) => (filterCourse === 'all' ? true : a.course === filterCourse))
    .filter((a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
          <p className="text-gray-600 mt-1">Browse and manage coding assignments</p>
        </div>
        {isProfessor && (
          <Button
            variant="primary"
            onClick={() => navigate('/assignments/new')}
            className="flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Create Assignment</span>
          </Button>
        )}
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course === 'all' ? 'All Courses' : course}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/assignments/${assignment.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{assignment.title}</h3>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {assignment.status === 'active' ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium mb-2">{assignment.course}</p>
                  <p className="text-gray-600 mb-3">{assignment.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    <span>Max Attempts: {assignment.maxAttempts}</span>
                    <span>Points: {assignment.points}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No assignments found matching your criteria.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AssignmentList;
