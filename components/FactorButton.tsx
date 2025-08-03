'use client';

interface FactorButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function FactorButton({ onClick, disabled = false }: FactorButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full md:w-auto px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
    >
      Factor Expression
    </button>
  );
}