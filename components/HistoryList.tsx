'use client';

import { FactoringResult } from '@/lib/factoring';

interface HistoryListProps {
  history: FactoringResult[];
  onClear: () => void;
  onSelectHistoryItem: (expression: string) => void;
}

export default function HistoryList({ history, onClear, onSelectHistoryItem }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">History</h3>
        <button
          onClick={onClear}
          className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          Clear History
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelectHistoryItem(item.original)}
            className="w-full text-left p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
          >
            <p className="font-mono text-sm text-gray-800 dark:text-gray-200">{item.original} → {item.factored}</p>
          </button>
        ))}
      </div>
    </div>
  );
}