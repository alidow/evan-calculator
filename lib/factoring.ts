import Algebrite from 'algebrite';

export interface FactoringStep {
  stepNumber: number;
  description: string;
  expression: string;
  explanation: string;
  technique: 'gcf' | 'difference-of-squares' | 'perfect-square' | 'quadratic' | 'grouping' | 'sum-difference-cubes' | 'other';
  tip?: string;
}

export interface FactoringResult {
  original: string;
  factored: string;
  isFactorable: boolean;
  error?: string;
  steps?: FactoringStep[];
}

export function factorExpression(expression: string): FactoringResult {
  // Now use the new factorWithSteps function to get both result and steps
  return factorWithSteps(expression);
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

// Helper function to check if an expression is a perfect square
function isPerfectSquare(expr: string): { isSquare: boolean; root?: string } {
  try {
    const sqrtExpr = Algebrite.run(`sqrt(${expr})`);
    const squared = Algebrite.run(`(${sqrtExpr})^2`);
    const simplified = Algebrite.run(`${squared} - (${expr})`);
    
    if (simplified === '0') {
      return { isSquare: true, root: sqrtExpr };
    }
  } catch {}
  return { isSquare: false };
}

// Helper function to extract GCF
function extractGCF(expression: string): { gcf: string; remaining: string; hasGCF: boolean } | null {
  try {
    // Use Algebrite to factor and check if there's a common factor
    const factored = Algebrite.factor(expression).toString();
    
    // Check various patterns for GCF extraction
    // Pattern 1: number * (expression)
    let match = factored.match(/^(-?\d+)\s*\*\s*\(([^)]+)\)$/);
    if (match && match[1] !== '1' && match[1] !== '-1') {
      return { gcf: match[1], remaining: match[2].trim(), hasGCF: true };
    }
    
    // Pattern 2: variable * (expression) or number*variable * (expression)
    match = factored.match(/^([^(]+)\s*\*\s*\(([^)]+)\)$/);
    if (match) {
      const gcf = match[1].trim();
      // Check if it's not just a trivial factor
      if (gcf !== '1' && gcf !== expression) {
        return { gcf: gcf, remaining: match[2].trim(), hasGCF: true };
      }
    }
  } catch {}
  return { gcf: '', remaining: expression, hasGCF: false };
}

// Main function to factor with steps
export function factorWithSteps(expression: string): FactoringResult {
  const steps: FactoringStep[] = [];
  let currentExpression = expression.trim();
  let stepNumber = 1;

  try {
    if (!currentExpression) {
      return {
        original: expression,
        factored: '',
        isFactorable: false,
        error: 'Please enter an expression'
      };
    }

    // Get the final factored form first to analyze the process
    const finalFactored = Algebrite.factor(expression).toString();
    const isFactorable = finalFactored !== expression;

    if (!isFactorable) {
      return {
        original: expression,
        factored: finalFactored,
        isFactorable: false
      };
    }

    // Step 1: Check for GCF
    const gcfResult = extractGCF(currentExpression);
    if (gcfResult && gcfResult.hasGCF) {
      steps.push({
        stepNumber: stepNumber++,
        description: 'Extract Greatest Common Factor (GCF)',
        expression: `${gcfResult.gcf} * (${gcfResult.remaining})`,
        explanation: `We can factor out ${gcfResult.gcf} from all terms`,
        technique: 'gcf',
        tip: '🚀 Always check for GCF first! It\'s like finding free money in your couch cushions!'
      });
      currentExpression = gcfResult.remaining;
    }

    // Step 2: Analyze the expression pattern
    const expanded = Algebrite.expand(currentExpression).toString();
    
    // Check for quadratic expressions (ax² + bx + c)
    if (expanded.match(/[+-]?[^+-]*\*?[a-z]\^2/) && expanded.match(/[+-]?[^+-]*\*?[a-z](?!\^)/)) {
      // This is a quadratic - let's see how it factors
      const innerFactored = Algebrite.factor(currentExpression).toString();
      
      // Check if it's a perfect square
      if (innerFactored.match(/\([^)]+\)\^2/)) {
        const base = innerFactored.match(/\(([^)]+)\)\^2/)![1];
        steps.push({
          stepNumber: stepNumber++,
          description: 'Recognize Perfect Square Trinomial',
          expression: `(${base})²`,
          explanation: 'This follows the pattern a² ± 2ab + b² = (a ± b)²',
          technique: 'perfect-square',
          tip: '📦 Perfect square trinomials have the middle term equal to ±2ab!'
        });
      } else if (innerFactored.includes('(') && innerFactored.includes(')')) {
        // Regular quadratic factoring
        steps.push({
          stepNumber: stepNumber++,
          description: 'Factor the quadratic expression',
          expression: innerFactored,
          explanation: 'Finding two binomials that multiply to give the original expression',
          technique: 'quadratic',
          tip: '🎯 For ax² + bx + c, find factors of ac that add up to b!'
        });
      }
    }
    // Check for difference of squares (a² - b²)
    else if (expanded.match(/^[^+-]*\^2\s*-\s*[^+-]*$/)) {
      const innerFactored = Algebrite.factor(currentExpression).toString();
      if (innerFactored.includes('(') && innerFactored.includes(')')) {
        steps.push({
          stepNumber: stepNumber++,
          description: 'Apply Difference of Squares pattern',
          expression: innerFactored,
          explanation: 'This follows the pattern a² - b² = (a + b)(a - b)',
          technique: 'difference-of-squares',
          tip: '📐 Remember: "First squared minus Last squared = (First + Last)(First - Last)"'
        });
      }
    }
    // Check for sum/difference of cubes
    else if (expanded.match(/^[^+-]*\^3\s*[+-]\s*[^+-]*$/)) {
      const innerFactored = Algebrite.factor(currentExpression).toString();
      const isSum = expanded.includes('+');
      steps.push({
        stepNumber: stepNumber++,
        description: `Apply ${isSum ? 'Sum' : 'Difference'} of Cubes pattern`,
        expression: innerFactored,
        explanation: isSum 
          ? 'a³ + b³ = (a + b)(a² - ab + b²)'
          : 'a³ - b³ = (a - b)(a² + ab + b²)',
        technique: 'sum-difference-cubes',
        tip: '🎲 Remember the cube formulas with: "First ± second, squared ∓ product, plus squared second"'
      });
    }
    // General factoring
    else {
      const innerFactored = Algebrite.factor(currentExpression).toString();
      if (innerFactored !== currentExpression && innerFactored.includes('(')) {
        steps.push({
          stepNumber: stepNumber++,
          description: 'Factor the expression',
          expression: innerFactored,
          explanation: 'Using algebraic factoring techniques',
          technique: 'other'
        });
      }
    }

    // Add final step if we had GCF and other steps
    if (steps.length > 1 && gcfResult && gcfResult.hasGCF) {
      steps.push({
        stepNumber: stepNumber++,
        description: 'Combine all factors',
        expression: finalFactored,
        explanation: 'Multiply the GCF by the factored expression',
        technique: 'other'
      });
    }

    return {
      original: expression,
      factored: finalFactored,
      isFactorable: isFactorable,
      steps: steps.length > 0 ? steps : undefined
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