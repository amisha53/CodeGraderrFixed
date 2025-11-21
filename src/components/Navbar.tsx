import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Button from './Button';
import Logo from './Logo';

interface NavbarProps {
  userRole?: string;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userRole = 'Student', userName = 'John Doe' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40 h-16">
      <div className="px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo variant="icon" size="md" />
          <h1 className="text-xl font-bold text-gray-800">Code Grader</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
