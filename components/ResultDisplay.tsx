'use client';

import { useState } from 'react';
import { FactoringResult } from '@/lib/factoring';
import StepByStepSolution from './StepByStepSolution';

interface ResultDisplayProps {
  result: FactoringResult | null;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const [showSteps, setShowSteps] = useState(false);

  if (!result) return null;

  if (result.error) {
    return (
      <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-700 dark:text-red-400 font-medium">Error:</p>
        <p className="text-red-600 dark:text-red-300">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Original Expression:</p>
            <p className="text-xl font-mono mt-1 text-gray-900 dark:text-gray-100">{result.original}</p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Factored Form:</p>
            <p className="text-xl font-mono mt-1 text-blue-600 dark:text-blue-400">{result.factored}</p>
          </div>

          {!result.isFactorable && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              This expression cannot be factored further or is already in its simplest form.
            </p>
          )}

          {result.steps && result.steps.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <span className="text-lg">{showSteps ? '📖' : '📘'}</span>
                {showSteps ? 'Hide Steps' : 'Show Steps'}
              </button>
            </div>
          )}
        </div>
      </div>

      {showSteps && result.steps && (
        <StepByStepSolution steps={result.steps} />
      )}
    </div>
  );
}