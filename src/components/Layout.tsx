import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const mockUser = JSON.parse(localStorage.getItem('mockUser') || '{"role":"Student","name":"User"}');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userRole={mockUser.role} userName={mockUser.name} />
      <Sidebar userRole={mockUser.role} />
      <main className="ml-64 mt-16 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
