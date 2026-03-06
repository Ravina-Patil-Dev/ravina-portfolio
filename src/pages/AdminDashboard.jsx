import React, { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout.jsx';
import ProjectManager from '../components/admin/ProjectManager.jsx';
import ProfileManager from '../components/admin/ProfileManager.jsx';
import AboutManagerComponent from '../components/admin/AboutManagerComponent.jsx';
import CertificateManager from '../components/admin/CertificateManager.jsx';
import ExperienceManager from '../components/admin/EducationManager.jsx';
import EducationManager from '../components/admin/ResearchManager.jsx';
import ResearchManager from '../components/admin/MediaManager.jsx';
import MediaManager from '../components/admin/SEOManager.jsx';
import MediaFilesManager from '../components/admin/MediaFilesManager.jsx';
import SocialLinksManager from '../components/admin/SocialLinksManager.jsx';
import SEOManager from '../components/admin/PerformanceManager.jsx';
import CustomizationManager from '../components/admin/PerformanceManager.jsx';
import PerformanceManager from '../components/admin/SEOManager.jsx';
import BackupManager from '../components/admin/PerformanceManager.jsx';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileManager />;
      case 'about':
        return <AboutManagerComponent />;
      case 'projects':
        return <ProjectManager />;
      case 'certificates':
        return <CertificateManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'education':
        return <EducationManager />;
      case 'research':
        return <ResearchManager />;
      case 'media':
        return <MediaManager />;
      case 'media-files':
        return <MediaFilesManager />;
      case 'social':
        return <SocialLinksManager />;
      case 'seo':
        return <SEOManager />;
      case 'customization':
        return <CustomizationManager />;
      case 'performance':
        return <PerformanceManager />;
      case 'backup':
        return <BackupManager />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
