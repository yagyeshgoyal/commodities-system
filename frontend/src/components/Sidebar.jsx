import { Link, useLocation } from 'react-router-dom';
import { Home, Package, PlusCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { user, hasRole } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: Home,
      roles: ['Manager'],
    },
    {
      name: 'Products',
      path: '/products',
      icon: Package,
      roles: ['Manager', 'Store Keeper'],
    },
    {
      name: 'Add Product',
      path: '/products/add',
      icon: PlusCircle,
      roles: ['Manager', 'Store Keeper'],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            // Check if user has permission to see this menu item
            if (!item.roles.includes(user?.role)) {
              return null;
            }

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link key={item.name} to={item.path}>
                <div
                  className={`nav-link ${
                    active ? 'nav-link-active' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Role Info */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            Logged in as
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {user?.role}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;