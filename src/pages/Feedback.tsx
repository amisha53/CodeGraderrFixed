import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Save } from 'lucide-react';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{"role":"Student"}');
  const isGrader = mockUser.role === 'Grader' || mockUser.role === 'Professor';

  const [feedback, setFeedback] = useState(
    'Good implementation overall. Your binary search algorithm is correct and handles most edge cases well. However, consider adding more detailed error handling for empty arrays.'
  );

  const testCases = [
    {
      id: 1,
      name: 'Test Case 1: Basic Search',
      input: 'arr = [1, 3, 5, 7, 9], target = 5',
      expected: '2',
      actual: '2',
      status: 'passed',
    },
    {
      id: 2,
      name: 'Test Case 2: First Element',
      input: 'arr = [1, 3, 5, 7, 9], target = 1',
      expected: '0',
      actual: '0',
      status: 'passed',
    },
    {
      id: 3,
      name: 'Test Case 3: Element Not Found',
      input: 'arr = [1, 3, 5, 7, 9], target = 10',
      expected: '-1',
      actual: 'None',
      status: 'failed',
    },
    {
      id: 4,
      name: 'Test Case 4: Last Element',
      input: 'arr = [1, 3, 5, 7, 9], target = 9',
      expected: '4',
      actual: '4',
      status: 'passed',
    },
    {
      id: 5,
      name: 'Test Case 5: Empty Array',
      input: 'arr = [], target = 5',
      expected: '-1',
      actual: 'Error',
      status: 'error',
    },
  ];

  const submission = {
    studentName: 'Alice Johnson',
    studentId: 'S001',
    assignment: 'Binary Search Implementation',
    submittedAt: '2025-10-05 14:30',
    attempt: 2,
    grade: 85,
    totalPoints: 100,
    passedTests: 3,
    totalTests: 5,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'failed':
        return <XCircle className="text-red-600" size={20} />;
      case 'error':
        return <AlertCircle className="text-yellow-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-50 border-green-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      case 'error':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleSaveFeedback = () => {
    console.log('Saving feedback:', feedback);
    alert('Feedback saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Submission Feedback</h1>
            <p className="text-gray-600 mt-1">{submission.assignment}</p>
          </div>
        </div>
        {isGrader && (
          <Button
            variant="primary"
            onClick={handleSaveFeedback}
            className="flex items-center space-x-2"
          >
            <Save size={18} />
            <span>Save Feedback</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Grade</p>
            <p className="text-3xl font-bold text-blue-600">
              {submission.grade}/{submission.totalPoints}
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Test Cases</p>
            <p className="text-3xl font-bold text-green-600">
              {submission.passedTests}/{submission.totalTests}
            </p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Attempt</p>
            <p className="text-3xl font-bold text-gray-800">{submission.attempt}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle size={16} className="mr-1" />
              Passed
            </span>
          </div>
        </Card>
      </div>

      <Card title="Submission Details">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Student Name</p>
            <p className="font-semibold text-gray-800">{submission.studentName}</p>
          </div>
          <div>
            <p className="text-gray-500">Student ID</p>
            <p className="font-semibold text-gray-800">{submission.studentId}</p>
          </div>
          <div>
            <p className="text-gray-500">Submitted At</p>
            <p className="font-semibold text-gray-800">{submission.submittedAt}</p>
          </div>
          <div>
            <p className="text-gray-500">Attempt</p>
            <p className="font-semibold text-gray-800">{submission.attempt}</p>
          </div>
        </div>
      </Card>

      <Card title="Test Results">
        <div className="space-y-3">
          {testCases.map((testCase) => (
            <div
              key={testCase.id}
              className={`border rounded-lg p-4 ${getStatusColor(testCase.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(testCase.status)}
                  <h4 className="font-semibold text-gray-800">{testCase.name}</h4>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    testCase.status === 'passed'
                      ? 'bg-green-100 text-green-800'
                      : testCase.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {testCase.status.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="bg-white bg-opacity-60 rounded p-2">
                  <p className="text-gray-600 font-medium">Input:</p>
                  <p className="font-mono text-gray-800">{testCase.input}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white bg-opacity-60 rounded p-2">
                    <p className="text-gray-600 font-medium">Expected:</p>
                    <p className="font-mono text-gray-800">{testCase.expected}</p>
                  </div>
                  <div className="bg-white bg-opacity-60 rounded p-2">
                    <p className="text-gray-600 font-medium">Actual:</p>
                    <p className="font-mono text-gray-800">{testCase.actual}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Instructor Feedback">
        {isGrader ? (
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="Provide detailed feedback to the student..."
          />
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed">{feedback}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Feedback;
