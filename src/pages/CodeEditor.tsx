import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Button from '../components/Button';
import Card from '../components/Card';
import { ArrowLeft, Play, Save, Send, History } from 'lucide-react';

const CodeEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`def binary_search(arr, target):
    """
    Implement binary search algorithm

    Args:
        arr: Sorted list of integers
        target: Value to search for

    Returns:
        Index of target if found, -1 otherwise
    """
    # Your code here
    pass

# Test your implementation
arr = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7
result = binary_search(arr, target)
print(f"Target {target} found at index: {result}")
`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const submissionHistory = [
    { attempt: 1, date: '2025-10-05 10:30', score: 60, status: 'Failed' },
    { attempt: 2, date: '2025-10-05 14:20', score: 85, status: 'Passed' },
  ];

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    setTimeout(() => {
      setOutput(
        `Running code...\n\nTest Case 1: PASSED ✓\nInput: [1, 3, 5, 7, 9], Target: 5\nExpected: 2, Got: 2\n\nTest Case 2: PASSED ✓\nInput: [1, 3, 5, 7, 9], Target: 1\nExpected: 0, Got: 0\n\nTest Case 3: FAILED ✗\nInput: [1, 3, 5, 7, 9], Target: 10\nExpected: -1, Got: None\n\nTarget 7 found at index: 3\n\n3 / 5 test cases passed (60%)`
      );
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your code? This will count as an attempt.')) {
      console.log('Submitting code:', code);
      alert('Code submitted successfully! You will receive feedback once grading is complete.');
      navigate('/dashboard');
    }
  };

  const handleSave = () => {
    console.log('Saving code:', code);
    alert('Code saved as draft!');
  };

  const languageOptions = [
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'javascript', label: 'JavaScript' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Binary Search Implementation</h1>
            <p className="text-gray-600 text-sm mt-1">Data Structures - Due: Oct 12, 2025</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button variant="secondary" onClick={handleSave} className="flex items-center space-x-2">
            <Save size={18} />
            <span>Save</span>
          </Button>
          <Button variant="primary" onClick={handleRun} disabled={isRunning} className="flex items-center space-x-2">
            <Play size={18} />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </Button>
          <Button variant="success" onClick={handleSubmit} className="flex items-center space-x-2">
            <Send size={18} />
            <span>Submit</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <Editor
                height="500px"
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                }}
              />
            </div>
          </Card>

          <Card title="Output Console">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] max-h-[300px] overflow-y-auto">
              <pre className="whitespace-pre-wrap">{output || 'Run your code to see output here...'}</pre>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Assignment Info">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Max Attempts:</span>
                <span className="font-semibold text-gray-800">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Used Attempts:</span>
                <span className="font-semibold text-gray-800">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Points:</span>
                <span className="font-semibold text-gray-800">100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-semibold text-red-600">Oct 12, 2025</span>
              </div>
            </div>
          </Card>

          <Card title="Submission History">
            <div className="space-y-3">
              {submissionHistory.map((submission) => (
                <div
                  key={submission.attempt}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">Attempt {submission.attempt}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        submission.status === 'Passed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{submission.date}</p>
                  <p className="text-sm font-semibold text-blue-600">Score: {submission.score}%</p>
                </div>
              ))}
              {submissionHistory.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No submissions yet</p>
              )}
            </div>
          </Card>

          <Card title="Instructions">
            <div className="text-sm space-y-2 text-gray-700">
              <p>1. Implement the binary search function</p>
              <p>2. Handle all edge cases</p>
              <p>3. Test with provided test cases</p>
              <p>4. Click Run to test locally</p>
              <p>5. Click Submit when ready</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
