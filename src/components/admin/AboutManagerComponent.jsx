import React from 'react';
import { User } from 'lucide-react';

const AboutManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="text-blue-400" size={24} />
        <h2 className="text-2xl font-bold text-white">About Me Manager</h2>
      </div>
      <p className="text-white/70">About Manager component pending full conversion.</p>
    </div>
  );
};

export default AboutManager;
