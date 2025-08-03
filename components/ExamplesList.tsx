'use client';

import { exampleExpressions } from '@/lib/factoring';

interface ExamplesListProps {
  onSelectExample: (expression: string) => void;
}

export default function ExamplesList({ onSelectExample }: ExamplesListProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Try these examples:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {exampleExpressions.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectExample(example.expression)}
            className="text-left p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
          >
            <p className="font-mono text-blue-600 dark:text-blue-400">{example.expression}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{example.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}