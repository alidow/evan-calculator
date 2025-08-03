'use client';

import { ChangeEvent, KeyboardEvent } from 'react';

interface ExpressionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export default function ExpressionInput({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "Enter an algebraic expression (e.g., x^2 - 4)" 
}: ExpressionInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleBlur = () => {
    // Ensure state is up to date on blur
    // This helps with the button click issue
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      onBlur={handleBlur}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-lg border-2 border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
      autoFocus
    />
  );
}