import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import LoanCalculator from './pages/LoanCalculator';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
      </Routes>
    </Router>
  </StrictMode>,
);
