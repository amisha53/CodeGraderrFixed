import React, { useState } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import {
  Users,
  BookOpen,
  Settings,
  BarChart3,
  Database,
  Bell,
  FileText,
  Upload,
  Download,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Server,
  Key,
  Shield,
  Zap,
  RefreshCw,
  Monitor,
  Moon,
  Sun,
  TrendingUp,
  UserPlus,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Student' | 'Professor' | 'Grader' | 'Admin';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinedAt: string;
  lastLogin: string;
  courses: number;
  assignments: number;
}

interface Course {
  id: number;
  name: string;
  code: string;
  professor: string;
  students: number;
  assignments: number;
  status: 'Active' | 'Archived';
  createdAt: string;
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalAssignments: number;
  totalSubmissions: number;
  plagiarismFlags: number;
  systemUptime: string;
  judge0Jobs: number;
  failedJobs: number;
}

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState<User | Course | null>(null);

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@university.edu',
      role: 'Student',
      status: 'Active',
      joinedAt: '2025-01-15',
      lastLogin: '2025-01-20',
      courses: 3,
      assignments: 12
    },
    {
      id: 2,
      name: 'Dr. Robert Smith',
      email: 'robert@university.edu',
      role: 'Professor',
      status: 'Active',
      joinedAt: '2024-08-20',
      lastLogin: '2025-01-20',
      courses: 2,
      assignments: 8
    },
    {
      id: 3,
      name: 'Emily Chen',
      email: 'emily@university.edu',
      role: 'Grader',
      status: 'Active',
      joinedAt: '2025-02-10',
      lastLogin: '2025-01-19',
      courses: 4,
      assignments: 15
    },
    {
      id: 4,
      name: 'Bob Williams',
      email: 'bob@university.edu',
      role: 'Student',
      status: 'Suspended',
      joinedAt: '2024-09-01',
      lastLogin: '2025-01-10',
      courses: 2,
      assignments: 6
    },
    {
      id: 5,
      name: 'Dr. Sarah Davis',
      email: 'sarah@university.edu',
      role: 'Professor',
      status: 'Active',
      joinedAt: '2024-07-15',
      lastLogin: '2025-01-20',
      courses: 3,
      assignments: 10
    }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: 'Java II',
      code: 'CS-265',
      professor: 'Dr. Indranil Roy',
      students: 35,
      assignments: 6,
      status: 'Active',
      createdAt: '2024-08-20'
    }
  ]);

  const systemStats: SystemStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    totalCourses: courses.length,
    totalAssignments: 45,
    totalSubmissions: 1234,
    plagiarismFlags: 12,
    systemUptime: '99.9%',
    judge0Jobs: 156,
    failedJobs: 3
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'assignments', label: 'Assignment Management', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'sandbox', label: 'Sandbox Control', icon: Server },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole as User['role'] } : user
    ));
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus as User['status'] } : user
    ));
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on users:`, selectedUsers);
    // Implement bulk actions
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview and management</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center space-x-2"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDarkMode ? 'Light' : 'Dark'} Mode</span>
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{systemStats.totalUsers}</p>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </div>
            <Users className="text-blue-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{systemStats.activeUsers}</p>
              <p className="text-xs text-gray-500 mt-1">{systemStats.totalUsers - systemStats.activeUsers} inactive</p>
            </div>
            <Activity className="text-green-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{systemStats.totalCourses}</p>
              <p className="text-xs text-gray-500 mt-1">3 archived</p>
            </div>
            <BookOpen className="text-purple-600" size={40} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">System Uptime</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{systemStats.systemUptime}</p>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </div>
            <Monitor className="text-green-600" size={40} />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="primary"
              onClick={() => { setModalType('addUser'); setIsModalOpen(true); }}
              className="flex items-center space-x-2"
            >
              <UserPlus size={18} />
              <span>Add User</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => { setModalType('importUsers'); setIsModalOpen(true); }}
              className="flex items-center space-x-2"
            >
              <Upload size={18} />
              <span>Import Users</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => { setModalType('systemBackup'); setIsModalOpen(true); }}
              className="flex items-center space-x-2"
            >
              <Database size={18} />
              <span>Backup System</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => { setModalType('maintenance'); setIsModalOpen(true); }}
              className="flex items-center space-x-2"
            >
              <Settings size={18} />
              <span>Maintenance</span>
            </Button>
          </div>
        </Card>

        <Card title="System Health">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Judge0 Sandbox</span>
              </div>
              <span className="text-sm text-green-600">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Database</span>
              </div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">File Storage</span>
              </div>
              <span className="text-sm text-yellow-600">85% Full</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Failed Jobs</span>
              </div>
              <span className="text-sm text-red-600">{systemStats.failedJobs}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <UserPlus className="text-blue-600" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium">New user registered</p>
              <p className="text-xs text-gray-500">Alice Johnson joined as Student</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <AlertTriangle className="text-red-600" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium">Plagiarism detected</p>
              <p className="text-xs text-gray-500">High similarity in Binary Search assignment</p>
            </div>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="text-green-600" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium">Assignment graded</p>
              <p className="text-xs text-gray-500">REST API Development completed</p>
            </div>
            <span className="text-xs text-gray-500">6 hours ago</span>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCourseManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
          <p className="text-gray-600 mt-1">Manage courses, professors, and student enrollment</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            onClick={() => { setModalType('addCourse'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Course</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => { setModalType('enrollStudents'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <UserPlus size={18} />
            <span>Enroll Students</span>
          </Button>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{courses.length}</p>
            </div>
            <BookOpen className="text-blue-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Courses</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{courses.filter(c => c.status === 'Active').length}</p>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{courses.reduce((sum, c) => sum + c.students, 0)}</p>
            </div>
            <Users className="text-purple-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Assignments</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{courses.reduce((sum, c) => sum + c.assignments, 0)}</p>
            </div>
            <FileText className="text-orange-600" size={40} />
          </div>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Archived</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Professors</option>
            <option>Dr. Indranil Roy</option>
          </select>
        </div>

        <Table
          columns={[
            { header: 'Course Name', accessor: 'name' },
            { header: 'Code', accessor: 'code' },
            { header: 'Professor', accessor: 'professor' },
            { header: 'Students', accessor: 'students' },
            { header: 'Assignments', accessor: 'assignments' },
            {
              header: 'Status',
              accessor: 'status',
              render: (value: string, row: Course) => (
                <select
                  value={value}
                  onChange={(e) => {
                    setCourses(courses.map(course => 
                      course.id === row.id ? { ...course, status: e.target.value as Course['status'] } : course
                    ));
                  }}
                  className={`px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                    value === 'Active' ? 'bg-green-100 text-green-800 border-green-300' :
                    'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              )
            },
            {
              header: 'Created',
              accessor: 'createdAt',
              render: (value: string) => new Date(value).toLocaleDateString()
            },
            {
              header: 'Actions',
              accessor: 'id',
              render: (value: number, row: Course) => (
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => { setSelectedItem(row); setModalType('viewCourse'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => { setSelectedItem(row); setModalType('editCourse'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => { setSelectedItem(row); setModalType('manageStudents'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Users size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => { setSelectedItem(row); setModalType('deleteCourse'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )
            }
          ]}
          data={courses}
        />
      </Card>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            onClick={() => { setModalType('addUser'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <UserPlus size={18} />
            <span>Add User</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => { setModalType('importUsers'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Upload size={18} />
            <span>Import CSV</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Roles</option>
            <option>Student</option>
            <option>Professor</option>
            <option>Grader</option>
            <option>Admin</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <span className="text-sm font-medium text-blue-800">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1 text-sm"
              >
                Activate
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleBulkAction('suspend')}
                className="px-3 py-1 text-sm"
              >
                Suspend
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleBulkAction('resetPassword')}
                className="px-3 py-1 text-sm"
              >
                Reset Password
              </Button>
              <Button
                variant="danger"
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1 text-sm"
              >
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <Table
          columns={[
            {
              header: '',
              accessor: 'id',
              render: (value: number) => (
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers([...selectedUsers, value]);
                    } else {
                      setSelectedUsers(selectedUsers.filter(id => id !== value));
                    }
                  }}
                  className="rounded border-gray-300"
                />
              )
            },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Role',
      accessor: 'role',
      render: (value: string, row: User) => (
        <select
          value={value}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Grader">Grader</option>
          <option value="Admin">Admin</option>
        </select>
              )
    },
    {
      header: 'Status',
      accessor: 'status',
              render: (value: string, row: User) => (
                <select
                  value={value}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  className={`px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                    value === 'Active' ? 'bg-green-100 text-green-800 border-green-300' :
                    value === 'Suspended' ? 'bg-red-100 text-red-800 border-red-300' :
                    'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              )
            },
            {
              header: 'Last Login',
              accessor: 'lastLogin',
              render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      header: 'Actions',
      accessor: 'id',
              render: (value: number, row: User) => (
        <div className="flex space-x-2">
          <Button
            variant="secondary"
                    onClick={() => { setSelectedItem(row); setModalType('viewUser'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Eye size={16} />
          </Button>
          <Button
                    variant="secondary"
                    onClick={() => { setSelectedItem(row); setModalType('editUser'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => { setSelectedItem(row); setModalType('resetPassword'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Key size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => { setSelectedItem(row); setModalType('deleteUser'); setIsModalOpen(true); }}
                    className="px-2 py-1"
                  >
                    <Trash2 size={16} />
          </Button>
        </div>
              )
            }
          ]}
          data={users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
          )}
        />
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure system preferences, integrations, and maintenance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={() => { setModalType('systemBackup'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Database size={18} />
            <span>Backup Now</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => { setModalType('maintenanceMode'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Settings size={18} />
            <span>Maintenance Mode</span>
          </Button>
        </div>
      </div>

      {/* System Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="General Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
              <input
                type="text"
                defaultValue="CodeGrader"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-6 (Central Time)</option>
                <option>UTC-7 (Mountain Time)</option>
                <option>UTC-8 (Pacific Time)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Enable email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Enable system announcements</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Enable debug mode</span>
              </label>
            </div>
            <Button variant="primary" className="w-full">
              Save Settings
            </Button>
          </div>
        </Card>

        <Card title="Integration Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LMS Integration</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Canvas</option>
                <option>Blackboard</option>
                <option>Moodle</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LMS API Key</label>
              <input
                type="password"
                placeholder="Enter API key"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Service</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>SendGrid</option>
                <option>Mailgun</option>
                <option>SMTP</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email API Key</label>
              <input
                type="password"
                placeholder="Enter email API key"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <Button variant="primary" className="w-full">
              Test Integration
            </Button>
          </div>
        </Card>
      </div>

      {/* Theme Customization */}
      <Card title="Theme & Branding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Color Scheme</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Primary</p>
                <input type="color" defaultValue="#3B82F6" className="w-full mt-1" />
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Success</p>
                <input type="color" defaultValue="#10B981" className="w-full mt-1" />
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Danger</p>
                <input type="color" defaultValue="#EF4444" className="w-full mt-1" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Logo & Branding</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Logo</span>
                  </div>
                  <Button variant="secondary">
                    Upload Logo
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">F</span>
                  </div>
                  <Button variant="secondary">
                    Upload Favicon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button variant="primary" className="w-full">
            Apply Theme Changes
          </Button>
        </div>
      </Card>

      {/* Backup & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Backup Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Manual Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup Retention (days)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Local Storage</option>
                <option>AWS S3</option>
                <option>Google Cloud</option>
                <option>Azure Blob</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Include user data</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Include system logs</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Compress backups</span>
              </label>
            </div>
            <div className="flex space-x-3">
              <Button variant="primary" className="flex-1">
                Update Settings
              </Button>
              <Button variant="secondary">
                Backup Now
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Maintenance Mode">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-800">Maintenance Mode: Disabled</span>
              </div>
              <Button variant="secondary" className="px-3 py-1 text-sm">
                Enable
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Message</label>
              <textarea
                rows={3}
                defaultValue="System is currently under maintenance. Please check back later."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Maintenance</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Allow admin access during maintenance</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Send maintenance notifications</span>
              </label>
            </div>
            <Button variant="primary" className="w-full">
              Update Maintenance Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* System Information */}
      <Card title="System Information">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Application</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="text-gray-900">2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Build:</span>
                <span className="text-gray-900">2025.01.20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Environment:</span>
                <span className="text-gray-900">Production</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Server</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">OS:</span>
                <span className="text-gray-900">Ubuntu 20.04</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Node.js:</span>
                <span className="text-gray-900">v18.17.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime:</span>
                <span className="text-gray-900">15 days</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Database</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="text-gray-900">PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="text-gray-900">14.8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="text-gray-900">2.3 GB</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notifications & Automation</h1>
          <p className="text-gray-600 mt-1">Manage automated alerts, announcements, and scheduled tasks</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            onClick={() => { setModalType('createNotification'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Create Notification</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => { setModalType('scheduleTask'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Clock size={18} />
            <span>Schedule Task</span>
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">12</p>
              <p className="text-xs text-blue-600 mt-1">Currently monitoring</p>
            </div>
            <Bell className="text-blue-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sent Today</p>
              <p className="text-3xl font-bold text-green-600 mt-1">47</p>
              <p className="text-xs text-green-600 mt-1">Notifications</p>
            </div>
            <Activity className="text-green-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Scheduled Tasks</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">8</p>
              <p className="text-xs text-purple-600 mt-1">Running automatically</p>
            </div>
            <Clock className="text-purple-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed Notifications</p>
              <p className="text-3xl font-bold text-red-600 mt-1">2</p>
              <p className="text-xs text-red-600 mt-1">Requires attention</p>
            </div>
            <AlertTriangle className="text-red-600" size={40} />
          </div>
        </Card>
      </div>

      {/* Alert Rules */}
      <Card title="Automated Alert Rules">
        <div className="space-y-4">
          {[
            {
              name: 'High Plagiarism Detection',
              condition: 'Similarity > 85%',
              action: 'Email professor + flag for review',
              status: 'active',
              lastTriggered: '2 hours ago'
            },
            {
              name: 'System Downtime',
              condition: 'Judge0 unavailable > 5 min',
              action: 'Email admin + Slack notification',
              status: 'active',
              lastTriggered: 'Never'
            },
            {
              name: 'Failed Job Queue',
              condition: 'Failed jobs > 10',
              action: 'Email admin + auto-retry',
              status: 'active',
              lastTriggered: '1 day ago'
            },
            {
              name: 'Low Storage Space',
              condition: 'Disk usage > 90%',
              action: 'Email admin + cleanup task',
              status: 'inactive',
              lastTriggered: '3 days ago'
            }
          ].map((rule, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
              rule.status === 'active' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  rule.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <div>
                  <h3 className="font-medium text-gray-900">{rule.name}</h3>
                  <p className="text-sm text-gray-600">{rule.condition}</p>
                  <p className="text-xs text-gray-500">{rule.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{rule.lastTriggered}</p>
                <div className="flex space-x-2 mt-2">
                  <Button variant="secondary" className="px-3 py-1 text-sm">
                    Edit
                  </Button>
                  <Button variant="secondary" className="px-3 py-1 text-sm">
                    {rule.status === 'active' ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Tasks */}
      <Card title="Scheduled Tasks">
        <div className="space-y-4">
          {[
            {
              name: 'Daily System Backup',
              schedule: 'Every day at 2:00 AM',
              lastRun: '2025-01-20 02:00:00',
              nextRun: '2025-01-21 02:00:00',
              status: 'success'
            },
            {
              name: 'Weekly Report Generation',
              schedule: 'Every Monday at 9:00 AM',
              lastRun: '2025-01-20 09:00:00',
              nextRun: '2025-01-27 09:00:00',
              status: 'success'
            },
            {
              name: 'Monthly Data Cleanup',
              schedule: '1st of every month at 1:00 AM',
              lastRun: '2025-01-01 01:00:00',
              nextRun: '2025-02-01 01:00:00',
              status: 'success'
            },
            {
              name: 'Failed Job Retry',
              schedule: 'Every 30 minutes',
              lastRun: '2025-01-20 14:30:00',
              nextRun: '2025-01-20 15:00:00',
              status: 'running'
            }
          ].map((task, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
              task.status === 'success' ? 'bg-green-50 border-green-200' :
              task.status === 'running' ? 'bg-blue-50 border-blue-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'success' ? 'bg-green-500' :
                  task.status === 'running' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}></div>
                <div>
                  <h3 className="font-medium text-gray-900">{task.name}</h3>
                  <p className="text-sm text-gray-600">{task.schedule}</p>
                  <p className="text-xs text-gray-500">Last: {task.lastRun} • Next: {task.nextRun}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" className="px-3 py-1 text-sm">
                  Edit
                </Button>
                <Button variant="secondary" className="px-3 py-1 text-sm">
                  Run Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Broadcast Messages */}
      <Card title="Broadcast Messages">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Send System-Wide Announcement</h3>
            <Button
              variant="primary"
              onClick={() => { setModalType('broadcastMessage'); setIsModalOpen(true); }}
            >
              Create Broadcast
            </Button>
          </div>
          
          <div className="space-y-3">
            {[
              {
                title: 'System Maintenance Scheduled',
                message: 'Scheduled maintenance will occur on Sunday from 2-4 AM EST.',
                recipients: 'All Users',
                sent: '2025-01-19 10:00:00',
                status: 'sent'
              },
              {
                title: 'New Feature Release',
                message: 'Check out the new plagiarism detection improvements!',
                recipients: 'Professors & Admins',
                sent: '2025-01-18 14:30:00',
                status: 'sent'
              },
              {
                title: 'Password Policy Update',
                message: 'New password requirements will be enforced starting next week.',
                recipients: 'All Users',
                sent: '2025-01-17 09:00:00',
                status: 'draft'
              }
            ].map((broadcast, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                broadcast.status === 'sent' ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{broadcast.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{broadcast.message}</p>
                    <p className="text-xs text-gray-500 mt-1">To: {broadcast.recipients} • {broadcast.sent}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="secondary" className="px-3 py-1 text-sm">
                      Edit
                    </Button>
                    {broadcast.status === 'draft' && (
                      <Button variant="primary" className="px-3 py-1 text-sm">
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Email Templates */}
      <Card title="Email Templates">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Welcome Email', type: 'User Registration', lastModified: '2025-01-15' },
            { name: 'Password Reset', type: 'Security', lastModified: '2025-01-10' },
            { name: 'Assignment Due', type: 'Reminder', lastModified: '2025-01-12' },
            { name: 'Grade Posted', type: 'Notification', lastModified: '2025-01-08' },
            { name: 'Plagiarism Alert', type: 'Alert', lastModified: '2025-01-14' },
            { name: 'System Maintenance', type: 'Announcement', lastModified: '2025-01-16' }
          ].map((template, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.type}</p>
              <p className="text-xs text-gray-500 mt-2">Modified: {template.lastModified}</p>
              <div className="flex space-x-2 mt-3">
                <Button variant="secondary" className="flex-1 px-3 py-1 text-sm">
                  Edit
                </Button>
                <Button variant="secondary" className="px-3 py-1 text-sm">
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSecurityCompliance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
      <div>
          <h1 className="text-3xl font-bold text-gray-800">Security & Compliance</h1>
          <p className="text-gray-600 mt-1">Manage security settings, audit logs, and compliance requirements</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={() => { setModalType('securityAudit'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Shield size={18} />
            <span>Run Security Audit</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => { setModalType('complianceReport'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Download size={18} />
            <span>Compliance Report</span>
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Sessions</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">47</p>
              <p className="text-xs text-green-600 mt-1">Normal activity</p>
            </div>
            <Users className="text-blue-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed Logins</p>
              <p className="text-3xl font-bold text-red-600 mt-1">3</p>
              <p className="text-xs text-red-600 mt-1">Last 24 hours</p>
            </div>
            <AlertTriangle className="text-red-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">2FA Enabled</p>
              <p className="text-3xl font-bold text-green-600 mt-1">89%</p>
              <p className="text-xs text-green-600 mt-1">Of all users</p>
            </div>
            <Shield className="text-green-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Audit Events</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">1,247</p>
              <p className="text-xs text-purple-600 mt-1">This month</p>
            </div>
            <FileText className="text-purple-600" size={40} />
          </div>
        </Card>
      </div>

      {/* Security Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Password Policy">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
              <input
                type="number"
                defaultValue="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
              <input
                type="number"
                defaultValue="90"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Require uppercase letters</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Require numbers</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Require special characters</span>
              </label>
            </div>
            <Button variant="primary" className="w-full">
              Update Password Policy
            </Button>
          </div>
        </Card>

        <Card title="Two-Factor Authentication">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">2FA Required for Admins</span>
              </div>
              <Button variant="secondary" className="px-3 py-1 text-sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-800">2FA Optional for Professors</span>
              </div>
              <Button variant="secondary" className="px-3 py-1 text-sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-800">2FA Disabled for Students</span>
              </div>
              <Button variant="secondary" className="px-3 py-1 text-sm">
                Configure
              </Button>
            </div>
            <Button variant="primary" className="w-full">
              Force 2FA Reset
            </Button>
          </div>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card title="Recent Audit Events">
        <div className="space-y-3">
          {[
            { 
              action: 'User Login', 
              user: 'Dr. Robert Smith', 
              ip: '192.168.1.100', 
              timestamp: '2025-01-20 14:30:25',
              status: 'success'
            },
            { 
              action: 'Role Changed', 
              user: 'Alice Johnson', 
              ip: '192.168.1.101', 
              timestamp: '2025-01-20 14:25:10',
              status: 'success'
            },
            { 
              action: 'Failed Login', 
              user: 'unknown@university.edu', 
              ip: '192.168.1.102', 
              timestamp: '2025-01-20 14:20:45',
              status: 'failed'
            },
            { 
              action: 'Grade Override', 
              user: 'Dr. Sarah Davis', 
              ip: '192.168.1.103', 
              timestamp: '2025-01-20 14:15:30',
              status: 'success'
            },
            { 
              action: 'System Backup', 
              user: 'System', 
              ip: '127.0.0.1', 
              timestamp: '2025-01-20 14:00:00',
              status: 'success'
            }
          ].map((event, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
              event.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  event.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{event.action}</p>
                  <p className="text-sm text-gray-500">{event.user} • {event.ip}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{event.status}</p>
                <p className="text-xs text-gray-500">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Button variant="secondary">
            View All Logs
          </Button>
          <Button variant="secondary">
            Export Logs
          </Button>
        </div>
      </Card>

      {/* FERPA Compliance */}
      <Card title="FERPA Compliance Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Data Privacy</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Anonymize student data in reports</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Require consent for data sharing</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Auto-delete old submissions after 7 years</span>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Access Controls</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Log all grade modifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Require justification for grade overrides</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm text-gray-700">Notify students of grade changes</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button variant="primary" className="w-full">
            Update Compliance Settings
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderSandboxControl = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sandbox Control</h1>
          <p className="text-gray-600 mt-1">Monitor Judge0 execution and manage grading environment</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={() => { setModalType('clearJobs'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <RefreshCw size={18} />
            <span>Clear Failed Jobs</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => { setModalType('systemRestart'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Zap size={18} />
            <span>Restart Sandbox</span>
          </Button>
        </div>
      </div>

      {/* Sandbox Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Jobs</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{systemStats.judge0Jobs}</p>
              <p className="text-xs text-green-600 mt-1">Processing</p>
            </div>
            <Cpu className="text-blue-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed Jobs</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{systemStats.failedJobs}</p>
              <p className="text-xs text-red-600 mt-1">Requires attention</p>
            </div>
            <AlertTriangle className="text-red-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Queue Length</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">23</p>
              <p className="text-xs text-yellow-600 mt-1">Pending execution</p>
            </div>
            <Clock className="text-yellow-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-1">98.1%</p>
              <p className="text-xs text-green-600 mt-1">Excellent</p>
            </div>
            <CheckCircle className="text-green-600" size={40} />
          </div>
        </Card>
      </div>

      {/* Language Support */}
      <Card title="Supported Programming Languages">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Python 3', version: '3.9.0', status: 'enabled', icon: '🐍' },
            { name: 'Java', version: '11.0.0', status: 'enabled', icon: '☕' },
            { name: 'C++', version: '17', status: 'enabled', icon: '⚡' },
            { name: 'JavaScript', version: 'Node.js 16', status: 'enabled', icon: '🟨' },
            { name: 'C', version: 'GCC 9.4', status: 'enabled', icon: '🔧' },
            { name: 'Go', version: '1.19', status: 'disabled', icon: '🐹' }
          ].map((lang, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              lang.status === 'enabled' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{lang.icon}</span>
                  <span className="font-medium text-gray-900">{lang.name}</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  lang.status === 'enabled' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{lang.version}</p>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => console.log(`Toggle ${lang.name}`)}
                  className="flex-1 px-2 py-1"
                >
                  {lang.status === 'enabled' ? 'Disable' : 'Enable'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => console.log(`Configure ${lang.name}`)}
                  className="px-2 py-1"
                >
                  <Settings size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Execution Limits */}
      <Card title="Execution Limits & Resources">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CPU Time Limit (seconds)</label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Memory Limit (MB)</label>
              <input
                type="number"
                defaultValue="128"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Size Limit (KB)</label>
              <input
                type="number"
                defaultValue="1024"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Jobs</label>
              <input
                type="number"
                defaultValue="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Queue Timeout (minutes)</label>
              <input
                type="number"
                defaultValue="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="pt-4">
              <Button variant="primary" className="w-full">
                Update Limits
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Job Queue */}
      <Card title="Current Job Queue">
        <div className="space-y-3">
          {[
            { id: 'J001', language: 'Python', status: 'running', duration: '2.3s', student: 'Alice Johnson' },
            { id: 'J002', language: 'Java', status: 'queued', duration: '-', student: 'Bob Williams' },
            { id: 'J003', language: 'C++', status: 'completed', duration: '1.8s', student: 'Emily Chen' },
            { id: 'J004', language: 'Python', status: 'failed', duration: '5.0s', student: 'David Wilson' },
            { id: 'J005', language: 'JavaScript', status: 'running', duration: '1.2s', student: 'Sarah Miller' }
          ].map((job, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
              job.status === 'running' ? 'bg-blue-50 border-blue-200' :
              job.status === 'completed' ? 'bg-green-50 border-green-200' :
              job.status === 'failed' ? 'bg-red-50 border-red-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  job.status === 'running' ? 'bg-blue-500' :
                  job.status === 'completed' ? 'bg-green-500' :
                  job.status === 'failed' ? 'bg-red-500' :
                  'bg-gray-400'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{job.id}</p>
                  <p className="text-sm text-gray-500">{job.language} • {job.student}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{job.status}</p>
                <p className="text-xs text-gray-500">{job.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
      <div>
          <h1 className="text-3xl font-bold text-gray-800">System Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive system insights and reporting</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={() => { setModalType('exportReport'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Download size={18} />
            <span>Export Report</span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => { setModalType('scheduleReport'); setIsModalOpen(true); }}
            className="flex items-center space-x-2"
          >
            <Clock size={18} />
            <span>Schedule Report</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Submissions</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{systemStats.totalSubmissions}</p>
              <p className="text-xs text-green-600 mt-1">+15% this week</p>
            </div>
            <FileText className="text-blue-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Grade</p>
              <p className="text-3xl font-bold text-green-600 mt-1">87.3%</p>
              <p className="text-xs text-green-600 mt-1">+2.1% improvement</p>
            </div>
            <TrendingUp className="text-green-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Plagiarism Rate</p>
              <p className="text-3xl font-bold text-red-600 mt-1">3.2%</p>
              <p className="text-xs text-red-600 mt-1">+0.5% increase</p>
            </div>
            <AlertTriangle className="text-red-600" size={40} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">System Load</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">68%</p>
              <p className="text-xs text-yellow-600 mt-1">Moderate usage</p>
            </div>
            <Activity className="text-yellow-600" size={40} />
          </div>
        </Card>
      </div>

      {/* Charts and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="User Activity Trends">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="mx-auto text-gray-400" size={48} />
              <p className="text-gray-500 mt-2">Chart visualization coming soon</p>
            </div>
          </div>
        </Card>

        <Card title="Assignment Completion Rates">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="mx-auto text-gray-400" size={48} />
              <p className="text-gray-500 mt-2">Chart visualization coming soon</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performers and At-Risk Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Performing Students">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <p className="font-medium text-gray-900">Alice Johnson</p>
                  <p className="text-sm text-gray-500">CS-301, CS-401</p>
                </div>
              </div>
              <span className="text-green-600 font-bold">96.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <p className="font-medium text-gray-900">Emily Chen</p>
                  <p className="text-sm text-gray-500">CS-301, CS-401</p>
                </div>
              </div>
              <span className="text-green-600 font-bold">94.2%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <p className="font-medium text-gray-900">David Wilson</p>
                  <p className="text-sm text-gray-500">CS-301</p>
                </div>
              </div>
              <span className="text-green-600 font-bold">92.1%</span>
            </div>
          </div>
        </Card>

        <Card title="At-Risk Students">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">!</div>
                <div>
                  <p className="font-medium text-gray-900">Bob Williams</p>
                  <p className="text-sm text-gray-500">CS-301, CS-401</p>
                </div>
              </div>
              <span className="text-red-600 font-bold">45.2%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">!</div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Miller</p>
                  <p className="text-sm text-gray-500">CS-301</p>
                </div>
              </div>
              <span className="text-yellow-600 font-bold">62.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">!</div>
                <div>
                  <p className="font-medium text-gray-900">Mike Davis</p>
                  <p className="text-sm text-gray-500">CS-401</p>
                </div>
              </div>
              <span className="text-yellow-600 font-bold">68.5%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* System Performance */}
      <Card title="System Performance Metrics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Cpu className="text-blue-600" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900">CPU Usage</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">42%</p>
            <p className="text-sm text-gray-500">Normal range</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HardDrive className="text-green-600" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900">Storage</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">2.3TB</p>
            <p className="text-sm text-gray-500">85% utilized</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wifi className="text-purple-600" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900">Network</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">156ms</p>
            <p className="text-sm text-gray-500">Average latency</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderModal = () => {
    switch (modalType) {
      case 'addUser':
  return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
                <option value="Grader">Grader</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Create User
              </Button>
            </div>
          </div>
        );
      
      case 'viewUser':
        return selectedItem && 'email' in selectedItem ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900 mt-1">{selectedItem.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900 mt-1">{selectedItem.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
                <p className="text-gray-900 mt-1">{selectedItem.role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
                <p className="text-gray-900 mt-1">{selectedItem.status}</p>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700">Courses</label>
                <p className="text-gray-900 mt-1">{selectedItem.courses}</p>
            </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Assignments</label>
                <p className="text-gray-900 mt-1">{selectedItem.assignments}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : null;
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Modal content not implemented yet</p>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="mt-4">
              Close
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'users' && renderUserManagement()}
          {activeSection === 'courses' && renderCourseManagement()}
          {activeSection === 'assignments' && (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-400" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mt-4">Assignment Management</h3>
              <p className="text-gray-500 mt-2">Coming soon...</p>
          </div>
        )}
          {activeSection === 'analytics' && renderAnalytics()}
          {activeSection === 'sandbox' && renderSandboxControl()}
          {activeSection === 'security' && renderSecurityCompliance()}
          {activeSection === 'notifications' && renderNotifications()}
          {activeSection === 'settings' && renderSettings()}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType.charAt(0).toUpperCase() + modalType.slice(1).replace(/([A-Z])/g, ' $1')}
      >
        {renderModal()}
      </Modal>
    </div>
  );
};

export default AdminDashboard;