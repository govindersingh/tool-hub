import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react';
import AdBlock from '../components/AdBlock';
import SEO from '../components/SEO';

const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
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
  const totalMonths = years * 12;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Loan Calculator",
    "description": "Free online loan calculator to calculate monthly payments, total interest, and loan costs. Simple, fast, and accurate loan payment calculations.",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEO
        title="Free Loan Calculator - Calculate Monthly Payments & Interest | Free Tools"
        description="Free online loan calculator. Calculate monthly loan payments, total interest, and total loan cost. Easy-to-use with instant results for personal loans, mortgages, and more."
        keywords="loan calculator, mortgage calculator, monthly payment calculator, loan interest calculator, car loan calculator, personal loan calculator"
        canonical="https://freetools.example.com/loan-calculator"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4 transition-colors duration-500">
        <div className="max-w-6xl mx-auto" role="main">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl shadow-lg mb-4" aria-hidden="true">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Free Loan Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Calculate your monthly loan payments and plan your finances with ease
          </p>
        </header>

        <AdBlock position="Top Banner" size="hero" />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700 transition-all duration-500">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                Loan Details
              </h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="loan-amount" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-semibold">$</span>
                    <input
                      id="loan-amount"
                      type="number"
                      value={principal}
                      onChange={e => setPrincipal(Number(e.target.value))}
                      aria-label="Loan amount in dollars"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white font-semibold text-lg"
                      min={0}
                    />
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={principal}
                    onChange={e => setPrincipal(Number(e.target.value))}
                    className="w-full mt-3 accent-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="interest-rate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Annual Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      id="interest-rate"
                      type="number"
                      value={interestRate}
                      onChange={e => setInterestRate(Number(e.target.value))}
                      aria-label="Annual interest rate percentage"
                      className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white font-semibold text-lg"
                      min={0}
                      step={0.1}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-semibold">%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="w-full mt-3 accent-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="loan-term" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Loan Term
                  </label>
                  <div className="relative">
                    <input
                      id="loan-term"
                      type="number"
                      value={years}
                      onChange={e => setYears(Number(e.target.value))}
                      aria-label="Loan term in years"
                      className="w-full pl-4 pr-20 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 dark:text-white font-semibold text-lg"
                      min={1}
                      max={30}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-semibold">years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={years}
                    onChange={e => setYears(Number(e.target.value))}
                    className="w-full mt-3 accent-blue-600"
                  />
                </div>
              </form>
            </section>

            <section className="bg-gradient-to-br from-blue-600 to-sky-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" aria-hidden="true" />
                Payment Breakdown
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-white/80 text-sm font-medium mb-2">Monthly Payment</div>
                  <div className="text-3xl font-bold">${monthlyPayment.toFixed(2)}</div>
                  <div className="text-white/70 text-xs mt-2">for {totalMonths} months</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-white/80 text-sm font-medium mb-2">Total Interest</div>
                  <div className="text-3xl font-bold">${totalInterest.toFixed(2)}</div>
                  <div className="text-white/70 text-xs mt-2">{((totalInterest / principal) * 100).toFixed(1)}% of principal</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-white/80 text-sm font-medium mb-2">Total Payment</div>
                  <div className="text-3xl font-bold">${totalPayment.toFixed(2)}</div>
                  <div className="text-white/70 text-xs mt-2">over {years} years</div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <AdBlock position="Sidebar - Top" size="sidebar" />

            <aside className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700 transition-all duration-500">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Loan Amount</span>
                  <span className="font-semibold text-slate-900 dark:text-white">${principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Interest Rate</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{interestRate}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Term</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{years} years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Total Months</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{totalMonths}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 mt-4">
                  <span className="text-blue-900 dark:text-blue-300 font-medium">Monthly Payment</span>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400">${monthlyPayment.toFixed(2)}</span>
                </div>
              </div>
            </aside>

            <AdBlock position="Sidebar - Bottom" size="sidebar" />
          </div>
        </div>

        <AdBlock position="Bottom Banner" />
      </div>
    </div>
    </>
  );
};

export default LoanCalculator;
