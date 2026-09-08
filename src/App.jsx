import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import Home from './home';
import AdminPanel from './admin/AdminPanel';

function App() {
  return (
    <PortfolioProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PortfolioProvider>
  );
}

export default App;
