import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Portfolio from './pages/Portfolio.jsx';
import GlassBackground from './components/ui/GlassBackground.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import { useAuth } from './hooks/useAuth.js';
import LoadingSpinner from './components/LoadingSpinner.jsx';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <GlassBackground />
      <div className="App">
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              user ? <AdminDashboard /> : <Navigate to="/access" replace />
            }
          />
          <Route
            path="/access"
            element={
              user ? <Navigate to="/admin" replace /> : <AdminLogin />
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
