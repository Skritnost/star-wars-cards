import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
      <QueryClientProvider client={queryClient}>
          <Router>
              <NavBar />
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* Future route: <Route path="/character/:id" /> */}
              </Routes>
          </Router>
      </QueryClientProvider>
  );
};

export default App;
