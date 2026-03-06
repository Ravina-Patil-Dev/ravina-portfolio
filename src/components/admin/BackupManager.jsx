import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Database, FileText, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase.js';
import toast from 'react-hot-toast';

const BackupManager = () => {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);

  const exportData = async () => {
    setExporting(true);
    try {
      if (!supabase) {
        toast.error('Database not configured');
        return;
      }

      const tables = [
        'profiles', 'projects', 'travel_experiences', 'certificates',
        'work_experience', 'education', 'research_papers', 'media_coverage', 'social_links'
      ];

      const exportData = {};

      for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*');
        if (error) throw error;
        exportData[table] = data;
      }

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Error exporting data');
    } finally {
      setExporting(false);
    }
  };

  const importData = async (file) => {
    setImporting(true);
    try {
      if (!supabase) {
        toast.error('Database not configured');
        return;
      }

      const text = await file.text();
      const data = JSON.parse(text);

      for (const [table, records] of Object.entries(data)) {
        if (Array.isArray(records) && records.length > 0) {
          const { error } = await supabase.from(table).upsert(records);
          if (error) throw error;
        }
      }

      toast.success('Data imported successfully');
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error('Error importing data');
    } finally {
      setImporting(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="text-blue-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Backup & Data Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Data */}
        <motion.div
          className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Download className="text-green-400" size={24} />
            <h3 className="text-xl font-semibold text-white">Export Data</h3>
          </div>
          
          <p className="text-white/70 mb-6">
            Download a complete backup of your portfolio data including all projects, experiences, and settings.
          </p>

          <button
            onClick={exportData}
            disabled={exporting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download size={20} />
                Export Portfolio Data
              </>
            )}
          </button>
        </motion.div>

        {/* Import Data */}
        <motion.div
          className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Upload className="text-blue-400" size={24} />
            <h3 className="text-xl font-semibold text-white">Import Data</h3>
          </div>
          
          <p className="text-white/70 mb-6">
            Restore your portfolio data from a previously exported backup file.
          </p>

          <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer">
            {importing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload size={20} />
                Import Portfolio Data
              </>
            )}
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              disabled={importing}
              className="hidden"
            />
          </label>
        </motion.div>
      </div>

      {/* Data Overview */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="text-purple-400" size={24} />
          <h3 className="text-xl font-semibold text-white">Data Overview</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Last Backup', value: 'Never', icon: Calendar },
            { label: 'Data Size', value: '~2.5 MB', icon: Database },
            { label: 'Total Records', value: '150+', icon: FileText },
            { label: 'Last Modified', value: 'Today', icon: Calendar }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-semibold">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
        <p className="text-yellow-300 text-sm">
          <strong>Important:</strong> Always backup your data before making major changes. 
          Import operations will overwrite existing data.
        </p>
      </div>
    </div>
  );
};

export default BackupManager;