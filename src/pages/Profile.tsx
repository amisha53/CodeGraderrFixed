import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile: React.FC = () => {
  const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{"role":"Student"}');

  const [formData, setFormData] = useState({
    name: mockUser.name || 'John Doe',
    email: mockUser.email || 'john.doe@university.edu',
    role: mockUser.role || 'Student',
    studentId: 'S12345',
    department: 'Computer Science',
    joinedDate: '2024-09-01',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account information</p>
      </div>

      <Card>
        <div className="flex items-center space-x-6 mb-6 pb-6 border-b border-gray-200">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
            <p className="text-gray-600">{formData.role}</p>
            <p className="text-sm text-gray-500 mt-1">{formData.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                Student ID
              </label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Account Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold text-gray-800">{formData.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="text-green-600" size={24} />
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-semibold text-gray-800">
                {new Date(formData.joinedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="text-yellow-600" size={24} />
            <div>
              <p className="text-sm text-gray-500">Email Verified</p>
              <p className="font-semibold text-green-600">Yes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="font-semibold text-green-600">Active</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
