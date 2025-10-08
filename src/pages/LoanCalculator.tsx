import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [years, setYears] = useState<number>(5);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    if (monthlyRate === 0) return principal / months;
    return (
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -months))
    );
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * years * 12;
  const totalInterest = totalPayment - principal;

  return (
    <div className="
      max-w-md mx-auto bg-white/90 dark:bg-slate-800/80
      backdrop-blur-lg rounded-xl shadow-lg p-6 border
      border-slate-200 dark:border-slate-700
      transition-colors duration-500
    ">
      <div className="mb-4 text-center">
        <div className="
          mx-auto mb-3 bg-blue-50 dark:bg-blue-500/20
          rounded-full flex items-center justify-center
          w-16 h-16
        ">
          {/* Calculator icon as per your App.tsx */}
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <rect x="8" y="6" width="8" height="2" rx="1" />
            <rect x="8" y="10" width="2" height="2" rx="0.5" />
            <rect x="8" y="14" width="2" height="2" rx="0.5" />
            <rect x="12" y="10" width="2" height="2" rx="0.5" />
            <rect x="12" y="14" width="2" height="2" rx="0.5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">Loan Calculator</h2>
        <p className="text-sky-700 dark:text-sky-300 text-sm font-medium">Calculate monthly loan payments</p>
      </div>

      <form className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={e => setPrincipal(Number(e.target.value))}
            className="
              w-full px-3 py-2 rounded-lg border-2
              border-slate-200 dark:border-slate-700
              bg-white/80 dark:bg-slate-800/50
              focus:outline-none focus:ring-2 focus:ring-sky-500
              transition-all shadow-sm
              text-slate-900 dark:text-white
            "
            min={0}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={e => setInterestRate(Number(e.target.value))}
            className="
              w-full px-3 py-2 rounded-lg border-2
              border-slate-200 dark:border-slate-700
              bg-white/80 dark:bg-slate-800/50
              focus:outline-none focus:ring-2 focus:ring-sky-500
              transition-all shadow-sm
              text-slate-900 dark:text-white
            "
            min={0}
            step={0.01}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Loan Term (years)
          </label>
          <input
            type="number"
            value={years}
            onChange={e => setYears(Number(e.target.value))}
            className="
              w-full px-3 py-2 rounded-lg border-2
              border-slate-200 dark:border-slate-700
              bg-white/80 dark:bg-slate-800/50
              focus:outline-none focus:ring-2 focus:ring-sky-500
              transition-all shadow-sm
              text-slate-900 dark:text-white
            "
            min={1}
          />
        </div>
      </form>

      <hr className="my-5 border-sky-200 dark:border-slate-600" />

      <div className="space-y-2 text-base">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Monthly Payment:</span>
          <span className="text-sky-700 dark:text-blue-300 font-bold">${monthlyPayment.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Total Interest:</span>
          <span className="text-orange-500 font-bold">${totalInterest.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Total Payment:</span>
          <span className="text-green-600 dark:text-green-300 font-bold">${totalPayment.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
