import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PersonDetail from '@/pages/PersonDetails.tsx';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
          <Router>
              <header className="fixed top-0 left-0 w-full z-50">
                  <NavBar/>
              </header>
              <div className="pt-18 overscroll-none">
                  <Routes>
                      <Route path="/" element={<HomePage />}/>
                      <Route path="/:id" element={<PersonDetail />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
              </div>
          </Router>
      </QueryClientProvider>
  );
};

export default App;
