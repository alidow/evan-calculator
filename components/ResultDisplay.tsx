'use client';

import { FactoringResult } from '@/lib/factoring';

interface ResultDisplayProps {
  result: FactoringResult | null;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
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
    <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
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
      </div>
    </div>
  );
}