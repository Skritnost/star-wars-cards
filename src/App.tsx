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
              <header className="fixed top-0 left-0 w-full z-50">
                  <NavBar/>
              </header>
              <div className="pt-18 overscroll-none">
                  <Routes>
                      <Route path="/" element={<HomePage/>}/>
                      {/* Future route: <Route path="/character/:id" /> */}
                  </Routes>
              </div>
          </Router>
      </QueryClientProvider>
  );
};

export default App;
