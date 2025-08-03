'use client';

import { useState } from 'react';
import { FactoringStep } from '@/lib/factoring';

interface StepByStepSolutionProps {
  steps: FactoringStep[];
}

export default function StepByStepSolution({ steps }: StepByStepSolutionProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(n => n !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const getTechniqueIcon = (technique: FactoringStep['technique']) => {
    switch (technique) {
      case 'gcf':
        return '🔍';
      case 'difference-of-squares':
        return '📐';
      case 'perfect-square':
        return '📦';
      case 'quadratic':
        return '🔢';
      case 'grouping':
        return '🎯';
      case 'sum-difference-cubes':
        return '🎲';
      default:
        return '✨';
    }
  };

  const getTechniqueColor = (technique: FactoringStep['technique']) => {
    switch (technique) {
      case 'gcf':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'difference-of-squares':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'perfect-square':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'quadratic':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'grouping':
        return 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800';
      case 'sum-difference-cubes':
        return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <span className="text-2xl">📚</span>
        Step-by-Step Solution
      </h3>
      
      <div className="space-y-3">
        {steps.map((step) => {
          const isExpanded = expandedSteps.includes(step.stepNumber);
          const techniqueColor = getTechniqueColor(step.technique);
          const techniqueIcon = getTechniqueIcon(step.technique);
          
          return (
            <div
              key={step.stepNumber}
              className={`border rounded-lg overflow-hidden transition-all ${techniqueColor}`}
            >
              <button
                onClick={() => toggleStep(step.stepNumber)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{techniqueIcon}</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Step {step.stepNumber}: {step.description}
                    </p>
                    <p className="font-mono text-lg mt-1 text-gray-700 dark:text-gray-200 whitespace-pre-line">
                      {step.expression}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {step.explanation}
                  </p>
                  {step.tip && (
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        {step.tip}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}