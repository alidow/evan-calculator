'use client';

import { useState } from 'react';

interface TabContent {
  id: string;
  label: string;
  content: React.ReactNode;
}

export default function EducationalContent() {
  const [activeTab, setActiveTab] = useState('tips');

  const tabs: TabContent[] = [
    {
      id: 'tips',
      label: '💡 Tips & Tricks',
      content: <TipsAndTricks />
    },
    {
      id: 'mistakes',
      label: '⚠️ Common Mistakes',
      content: <CommonMistakes />
    },
    {
      id: 'patterns',
      label: '🔍 Patterns',
      content: <FactoringPatterns />
    },
    {
      id: 'practice',
      label: '🎯 Practice',
      content: <PracticeProblems />
    }
  ];

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Master Factoring: Learn Like a Pro! 🎓
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 dark:bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

function TipsAndTricks() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">
          🚀 Pro Tip: Always Look for GCF First!
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Before trying any fancy factoring techniques, always check for a Greatest Common Factor (GCF). 
          It's like finding free money in your couch cushions!
        </p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded border border-blue-200 dark:border-blue-800">
          <p className="font-mono text-sm">
            Example: 6x² + 12x = 6x(x + 2)
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Notice how we pulled out 6x from both terms? That's the GCF magic! ✨
          </p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-3">
          🎯 The "AC Method" for Tricky Quadratics
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          When ax² + bx + c doesn't factor nicely, use the AC method:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Multiply a × c</li>
          <li>Find two numbers that multiply to ac and add to b</li>
          <li>Rewrite the middle term using these numbers</li>
          <li>Factor by grouping</li>
        </ol>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 mb-3">
          🧠 Memory Tricks That Actually Work
        </h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">📐</span>
            <div>
              <strong>Difference of Squares:</strong> "First squared minus Last squared = (First + Last)(First - Last)"
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📦</span>
            <div>
              <strong>Perfect Square Trinomial:</strong> "Does it look like (a ± b)²? Check if the middle term is ±2ab!"
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function CommonMistakes() {
  return (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-3">
          ❌ Mistake #1: Forgetting the GCF
        </h3>
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-red-200 dark:border-red-800">
            <p className="font-mono text-sm line-through text-red-600 dark:text-red-400">
              x² - 4x = x(x - 4)
            </p>
            <p className="font-mono text-sm text-green-600 dark:text-green-400 mt-2">
              4x² - 16x = 4x(x - 4) ✓
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Always check if you can pull out more! Many students stop too early.
          </p>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-3">
          ⚡ Mistake #2: Sum of Squares Trap
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          Remember: x² + 4 CANNOT be factored over real numbers! Don't waste time trying.
        </p>
        <div className="bg-white dark:bg-gray-800 p-4 rounded border border-orange-200 dark:border-orange-800">
          <p className="text-sm">
            <span className="text-red-600 dark:text-red-400">Can't factor:</span> x² + 9, a² + 25, y² + 16
          </p>
          <p className="text-sm mt-2">
            <span className="text-green-600 dark:text-green-400">Can factor:</span> x² - 9 = (x+3)(x-3) ✓
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300 mb-3">
          🤔 Mistake #3: Sign Confusion
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Pay attention to signs! They're not just decoration:
        </p>
        <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
          <li>• x² + 5x + 6 = (x + 2)(x + 3) → Both signs positive</li>
          <li>• x² - 5x + 6 = (x - 2)(x - 3) → Both signs negative</li>
          <li>• x² + x - 6 = (x + 3)(x - 2) → Mixed signs</li>
        </ul>
      </div>
    </div>
  );
}

function FactoringPatterns() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          🎨 Pattern Recognition = Factoring Superpower
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Train your brain to spot these patterns instantly:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border-2 border-blue-200 dark:border-blue-600">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Perfect Square Trinomials
          </h4>
          <p className="font-mono text-sm mb-2">a² ± 2ab + b²</p>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>• x² + 6x + 9 = (x + 3)²</li>
            <li>• 4x² - 12x + 9 = (2x - 3)²</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border-2 border-green-200 dark:border-green-600">
          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
            Difference of Squares
          </h4>
          <p className="font-mono text-sm mb-2">a² - b²</p>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>• x² - 16 = (x + 4)(x - 4)</li>
            <li>• 9y² - 25 = (3y + 5)(3y - 5)</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border-2 border-purple-200 dark:border-purple-600">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
            Difference of Cubes
          </h4>
          <p className="font-mono text-sm mb-2">a³ - b³</p>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>• x³ - 8 = (x - 2)(x² + 2x + 4)</li>
            <li>• 27x³ - 1 = (3x - 1)(9x² + 3x + 1)</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border-2 border-orange-200 dark:border-orange-600">
          <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
            Sum of Cubes
          </h4>
          <p className="font-mono text-sm mb-2">a³ + b³</p>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>• x³ + 27 = (x + 3)(x² - 3x + 9)</li>
            <li>• 8x³ + 1 = (2x + 1)(4x² - 2x + 1)</li>
          </ul>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
        <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3">
          🎵 Remember the Cube Formulas with Songs!
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Sum of Cubes:</strong> "First plus second, squared minus product, plus squared second"<br/>
          <strong>Difference of Cubes:</strong> "First minus second, squared plus product, plus squared second"
        </p>
      </div>
    </div>
  );
}

function PracticeProblems() {
  const [showAnswers, setShowAnswers] = useState<boolean[]>([false, false, false, false]);

  const problems = [
    {
      question: "Factor: 2x² + 7x + 3",
      answer: "(2x + 1)(x + 3)",
      hint: "Look for two numbers that multiply to 6 and add to 7"
    },
    {
      question: "Factor: x² - 10x + 25",
      answer: "(x - 5)²",
      hint: "This is a perfect square trinomial!"
    },
    {
      question: "Factor: 3x³ - 12x",
      answer: "3x(x + 2)(x - 2)",
      hint: "First pull out the GCF, then look for a pattern"
    },
    {
      question: "Factor: x⁴ - 81",
      answer: "(x² + 9)(x + 3)(x - 3)",
      hint: "This is a difference of squares... twice!"
    }
  ];

  const toggleAnswer = (index: number) => {
    const newShowAnswers = [...showAnswers];
    newShowAnswers[index] = !newShowAnswers[index];
    setShowAnswers(newShowAnswers);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          🏋️ Time to Flex Those Factoring Muscles!
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Try these problems on your own first, then check your answers. Remember: practice makes perfect!
        </p>
      </div>

      <div className="space-y-4">
        {problems.map((problem, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                  Problem {index + 1}: {problem.question}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  💡 Hint: {problem.hint}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => toggleAnswer(index)}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {showAnswers[index] ? 'Hide Answer' : 'Show Answer'}
            </button>
            
            {showAnswers[index] && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-mono text-green-700 dark:text-green-300">
                  Answer: {problem.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
        <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
          📝 Want More Practice?
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          Use the calculator above to check your work on any factoring problem! 
          Try creating your own expressions and see if you can predict the factored form before hitting the button.
        </p>
      </div>
    </div>
  );
}