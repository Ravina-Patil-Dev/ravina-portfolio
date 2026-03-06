import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, ChartBar as BarChart3, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import toast from 'react-hot-toast';

const AdminLayout = ({ children, activeTab, onTabChange }) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile (Hero)', icon: User },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'projects', label: 'Projects', icon: BarChart3 },
    { id: 'certificates', label: 'Certificates', icon: Settings },
    { id: 'experience', label: 'Experience', icon: Settings },
    { id: 'education', label: 'Education', icon: Settings },
    { id: 'research', label: 'Research', icon: Settings },
    { id: 'media', label: 'Media', icon: Settings },
    { id: 'media-files', label: 'Media Files', icon: Settings },
    { id: 'social', label: 'Social Links', icon: Settings },
    { id: 'seo', label: 'SEO & Analytics', icon: Settings },
    { id: 'customization', label: 'Theme & Style', icon: Settings },
    { id: 'performance', label: 'Performance', icon: Settings },
    { id: 'backup', label: 'Backup & Export', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
