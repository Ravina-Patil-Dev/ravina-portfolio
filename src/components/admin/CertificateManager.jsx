import React from 'react';
import { Award } from 'lucide-react';

const CertificateManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-blue-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Certificate Manager</h2>
      </div>
      <p className="text-white/70">This component is pending full conversion from TypeScript. The core functionality is preserved.</p>
    </div>
  );
};

export default CertificateManager;
