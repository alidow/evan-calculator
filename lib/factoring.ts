import Algebrite from 'algebrite';

export interface FactoringResult {
  original: string;
  factored: string;
  isFactorable: boolean;
  error?: string;
}

export function factorExpression(expression: string): FactoringResult {
  try {
    // Clean up the expression
    const cleanedExpression = expression.trim();
    
    if (!cleanedExpression) {
      return {
        original: expression,
        factored: '',
        isFactorable: false,
        error: 'Please enter an expression'
      };
    }

    // Factor the expression using Algebrite
    const factored = Algebrite.factor(cleanedExpression).toString();
    
    // Check if factoring actually occurred
    const isFactorable = factored !== cleanedExpression;
    
    return {
      original: cleanedExpression,
      factored: factored,
      isFactorable: isFactorable
    };
  } catch (error) {
    return {
      original: expression,
      factored: '',
      isFactorable: false,
      error: error instanceof Error ? error.message : 'Invalid expression'
    };
  }
}

export function validateExpression(expression: string): boolean {
  try {
    // Try to parse the expression with Algebrite
    Algebrite.run(expression);
    return true;
  } catch {
    return false;
  }
}

// Common examples for users
export const exampleExpressions = [
  { expression: 'x^2 - 4', description: 'Difference of squares' },
  { expression: 'x^2 + 5*x + 6', description: 'Quadratic trinomial' },
  { expression: 'x^2 - 6*x + 9', description: 'Perfect square trinomial' },
  { expression: 'x^3 - 8', description: 'Difference of cubes' },
  { expression: '2*x^2 + 8*x + 8', description: 'Quadratic with common factor' },
  { expression: 'x^4 - 16', description: 'Difference of fourth powers' },
];