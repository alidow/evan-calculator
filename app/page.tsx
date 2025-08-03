'use client';

import { useState } from 'react';
import ExpressionInput from '@/components/ExpressionInput';
import FactorButton from '@/components/FactorButton';
import ResultDisplay from '@/components/ResultDisplay';
import ExamplesList from '@/components/ExamplesList';
import HistoryList from '@/components/HistoryList';
import DarkModeToggle from '@/components/DarkModeToggle';
import EducationalContent from '@/components/EducationalContent';
import { factorExpression, FactoringResult } from '@/lib/factoring';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function Home() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<FactoringResult | null>(null);
  const [history, setHistory] = useState<FactoringResult[]>([]);
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleFactor = () => {
    if (!expression.trim()) return;

    const factoringResult = factorExpression(expression);
    setResult(factoringResult);

    if (!factoringResult.error) {
      setHistory(prev => [factoringResult, ...prev.slice(0, 9)]);
    }
  };

  const handleSelectExample = (exampleExpression: string) => {
    setExpression(exampleExpression);
    setResult(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl mr-3">🧮</span>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              Algebraic Factoring Calculator
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Factor any polynomial instantly - Your homework helper! 
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Perfect for algebra students, teachers, and math enthusiasts
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="space-y-4">
            <ExpressionInput
              value={expression}
              onChange={setExpression}
              onSubmit={handleFactor}
            />
            
            <FactorButton
              onClick={handleFactor}
              disabled={!expression.trim()}
            />
          </div>

          <ResultDisplay result={result} />

          <ExamplesList onSelectExample={handleSelectExample} />

          <HistoryList
            history={history}
            onClear={handleClearHistory}
            onSelectHistoryItem={handleSelectExample}
          />
        </main>

        <EducationalContent />

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
          <p>Powered by Algebrite - Computer Algebra System</p>
          <p>© {new Date().getFullYear()} Celestial Platform, LLC. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}