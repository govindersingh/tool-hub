import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import LoanCalculator from './pages/LoanCalculator';
import GSTCalculator from './pages/GSTCalculator';
import TipCalculator from './pages/TipCalculator';
import PercentageCalculator from './pages/PercentageCalculator';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/gst-calculator" element={<GSTCalculator />} />
        <Route path="/tip-calculator" element={<TipCalculator />} />
        <Route path="/percentage-calculator" element={<PercentageCalculator />} />
      </Routes>
    </Router>
  </StrictMode>,
);
