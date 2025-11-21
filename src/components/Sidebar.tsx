import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, MessageSquare, Copy, User } from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  roles?: string[];
}

interface SidebarProps {
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const menuItems: MenuItem[] = [
    {
      icon: <Home size={20} />,
      label: 'Dashboard',
      path: '/dashboard',
      roles: ['Student', 'Professor', 'Grader', 'Admin'],
    },
    {
      icon: <FileText size={20} />,
      label: 'Assignments',
      path: '/assignments',
      roles: ['Student', 'Professor', 'Grader'],
    },
    {
      icon: <MessageSquare size={20} />,
      label: 'Feedback',
      path: '/feedback',
      roles: ['Student', 'Grader', 'Professor'],
    },
    {
      icon: <Copy size={20} />,
      label: 'Plagiarism',
      path: '/plagiarism',
      roles: ['Professor', 'Grader'],
    },
    {
      icon: <User size={20} />,
      label: 'Profile',
      path: '/profile',
      roles: ['Student', 'Professor', 'Grader', 'Admin'],
    },
  ];

  const filteredItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  return (
    <aside className="bg-gray-50 border-r border-gray-200 fixed left-0 top-16 bottom-0 w-64 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {filteredItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
