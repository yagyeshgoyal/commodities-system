import { useState, useEffect } from 'react';
import { Package, AlertTriangle, XCircle, CheckCircle, DollarSign } from 'lucide-react';
import { productsAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await productsAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className="card animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>
        <div className={`p-4 ${bgColor} rounded-full`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Overview of your commodities inventory
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Products"
                value={stats?.totalProducts || 0}
                icon={Package}
                color="text-blue-600 dark:text-blue-400"
                bgColor="bg-blue-100 dark:bg-blue-900"
              />
              <StatCard
                title="In Stock"
                value={stats?.inStockProducts || 0}
                icon={CheckCircle}
                color="text-green-600 dark:text-green-400"
                bgColor="bg-green-100 dark:bg-green-900"
              />
              <StatCard
                title="Low Stock"
                value={stats?.lowStockProducts || 0}
                icon={AlertTriangle}
                color="text-yellow-600 dark:text-yellow-400"
                bgColor="bg-yellow-100 dark:bg-yellow-900"
              />
              <StatCard
                title="Out of Stock"
                value={stats?.outOfStockProducts || 0}
                icon={XCircle}
                color="text-red-600 dark:text-red-400"
                bgColor="bg-red-100 dark:bg-red-900"
              />
            </div>

            {/* Total Value Card */}
            <div className="mb-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Total Inventory Value</p>
                  <p className="text-4xl font-bold">
                    ${stats?.totalValue?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <DollarSign className="w-16 h-16 opacity-50" />
              </div>
            </div>

            {/* Category Distribution */}
            {stats?.categoryDistribution &&
              stats.categoryDistribution.length > 0 && (
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Category Distribution
                  </h2>
                  <div className="space-y-4">
                    {stats.categoryDistribution.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {category._id}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {category.count} products ({category.totalQuantity}{' '}
                            units)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                (category.count / stats.totalProducts) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;