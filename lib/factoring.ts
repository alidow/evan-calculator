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

// Helper function to find all factor pairs of a number
function findFactorPairs(n: number): Array<[number, number]> {
  const pairs: Array<[number, number]> = [];
  const absN = Math.abs(n);
  
  for (let i = 1; i <= Math.sqrt(absN); i++) {
    if (absN % i === 0) {
      const factor1 = i;
      const factor2 = absN / i;
      
      // For positive n, add both positive and negative factor pairs
      if (n > 0) {
        pairs.push([factor1, factor2]);
        if (factor1 !== factor2) {
          pairs.push([factor2, factor1]);
        }
        pairs.push([-factor1, -factor2]);
        if (factor1 !== factor2) {
          pairs.push([-factor2, -factor1]);
        }
      } else {
        // For negative n, one factor must be negative
        pairs.push([-factor1, factor2]);
        pairs.push([factor1, -factor2]);
        if (factor1 !== factor2) {
          pairs.push([-factor2, factor1]);
          pairs.push([factor2, -factor1]);
        }
      }
    }
  }
  
  return pairs;
}

// Helper function to expand and verify a factored expression
function verifyFactorization(factored: string, original: string): string {
  try {
    const expanded = Algebrite.run(`expand(${factored})`);
    return expanded.toString();
  } catch {
    return '';
  }
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
    const expanded = Algebrite.run(`expand(${currentExpression})`).toString();
    
    // Try to factor the current expression
    const innerFactored = Algebrite.factor(currentExpression).toString();
    const hasFactored = innerFactored !== currentExpression && innerFactored.includes('(');
    
    // Check for quadratic expressions (ax² + bx + c)
    // More robust pattern to catch all quadratics
    const hasSquareTerm = expanded.match(/[a-z]\s*\^\s*2/);
    const hasLinearTerm = expanded.match(/[+-]\s*\d*\s*\*?\s*[a-z](?!\s*\^)/);
    const hasConstantTerm = expanded.match(/[+-]\s*\d+(?!\s*\*?\s*[a-z])/);
    
    if (hasSquareTerm && (hasLinearTerm || hasConstantTerm)) {
      // This is a quadratic expression
      
      // Check if it's a perfect square
      if (innerFactored.match(/\([^)]+\)\^2/)) {
        const base = innerFactored.match(/\(([^)]+)\)\^2/)![1];
        
        // Extract parts of the perfect square
        const baseMatch = base.match(/([a-z])\s*([+-])\s*(\d+)/);
        if (baseMatch) {
          const [_, var1, sign, num] = baseMatch;
          const numValue = parseInt(num);
          
          steps.push({
            stepNumber: stepNumber++,
            description: 'Check for perfect square pattern',
            expression: `Is this a² ${sign} 2ab + b²?`,
            explanation: `Let's check if ${variable}² ${b >= 0 ? '+' : ''}${b}${variable} ${c >= 0 ? '+' : ''}${c} fits the pattern`,
            technique: 'perfect-square',
            tip: '🔍 Perfect squares have special structure'
          });
          
          steps.push({
            stepNumber: stepNumber++,
            description: 'Verify the pattern',
            expression: `a = ${var1}, b = ${numValue}`,
            explanation: `First term: a² = ${var1}² ✓\nMiddle term: 2ab = 2(${var1})(${numValue}) = ${2 * numValue}${var1} ${Math.abs(b) === Math.abs(2 * numValue) ? '✓' : '✗'}\nLast term: b² = ${numValue}² = ${numValue * numValue} ${c === numValue * numValue ? '✓' : '✗'}`,
            technique: 'perfect-square',
            tip: '📦 All three parts must match for a perfect square!'
          });
          
          steps.push({
            stepNumber: stepNumber++,
            description: 'Write as a perfect square',
            expression: `(${base})²`,
            explanation: `Since all parts match, this is (a ${sign} b)²`,
            technique: 'perfect-square',
            tip: '🎯 Perfect square trinomials factor into one binomial squared!'
          });
          
          // Verify
          const verification = verifyFactorization(`(${base})^2`, currentExpression);
          if (verification) {
            steps.push({
              stepNumber: stepNumber++,
              description: 'Verify by expanding',
              expression: `(${base})² = ${verification}`,
              explanation: `(a ${sign} b)² = a² ${sign} 2ab + b²`,
              technique: 'perfect-square',
              tip: '✅ Remember this pattern - it\\'s very common!'
            });
          }
        } else {
          steps.push({
            stepNumber: stepNumber++,
            description: 'Recognize Perfect Square Trinomial',
            expression: `(${base})²`,
            explanation: 'This follows the pattern a² ± 2ab + b² = (a ± b)²',
            technique: 'perfect-square',
            tip: '📦 Perfect square trinomials have the middle term equal to ±2ab!'
          });
        }
      } else if (hasFactored) {
        // Regular quadratic factoring - let's explain the process
        // Extract coefficients for better explanation
        const match = expanded.match(/(\d*)\s*\*?\s*([a-z])\s*\^\s*2\s*([+-]\s*\d*\s*\*?\s*[a-z])?\s*([+-]\s*\d+)?/);
        if (match) {
          const variable = match[2];
          // Parse coefficients more carefully
          // For x^2 + 24*x + 143 format
          let a = 1, b = 0, c = 0;
          
          // Extract a (coefficient of x^2)
          const aMatch = expanded.match(/^([+-]?\s*\d*)\s*\*?\s*[a-z]\s*\^\s*2/);
          if (aMatch) {
            const aStr = aMatch[1].replace(/\s/g, '');
            a = (!aStr || aStr === '+' || aStr === '') ? 1 : (aStr === '-' ? -1 : parseInt(aStr));
          }
          
          // Extract b (coefficient of x)
          const bMatch = expanded.match(/([+-]\s*\d+)\s*\*?\s*[a-z](?!\s*\^)/);
          if (bMatch) {
            b = parseInt(bMatch[1].replace(/\s/g, ''));
          }
          
          // Extract c (constant term)
          const cMatch = expanded.match(/([+-]\s*\d+)(?!\s*\*?\s*[a-z])/g);
          if (cMatch && cMatch.length > 0) {
            // Get the last match which should be the constant
            const lastMatch = cMatch[cMatch.length - 1];
            c = parseInt(lastMatch.replace(/\s/g, ''));
          }
          
          // First step: identify the quadratic
          steps.push({
            stepNumber: stepNumber++,
            description: 'Identify the quadratic expression',
            expression: `${a === 1 ? '' : a}${variable}² ${b >= 0 ? '+' : ''}${b}${variable} ${c >= 0 ? '+' : ''}${c}`,
            explanation: `This is a quadratic in standard form with a = ${a}, b = ${b}, c = ${c}`,
            technique: 'quadratic',
            tip: '📝 Standard form is ax² + bx + c'
          });
          
          // Second step: calculate what we need
          const product = a * c;
          steps.push({
            stepNumber: stepNumber++,
            description: 'Set up the factoring problem',
            expression: `Need two numbers that: multiply to ${product} AND add to ${b}`,
            explanation: `For factoring ax² + bx + c, we need two numbers that multiply to ac = ${a} × ${c} = ${product} and add to b = ${b}`,
            technique: 'quadratic',
            tip: '🎯 This is the key to factoring quadratics!'
          });
          
          // Third step: list and check factor pairs
          const factorPairs = findFactorPairs(product);
          const factorPairStrings = factorPairs.map(([f1, f2]) => 
            `(${f1}, ${f2}): ${f1} × ${f2} = ${product} ✓, ${f1} + ${f2} = ${f1 + f2} ${f1 + f2 === b ? '✓' : '✗'}`
          );
          
          // Find the correct pair
          const correctPair = factorPairs.find(([f1, f2]) => f1 + f2 === b);
          
          steps.push({
            stepNumber: stepNumber++,
            description: 'Check factor pairs of ' + product,
            expression: factorPairStrings.slice(0, 6).join('\\n'), // Show first 6 pairs
            explanation: correctPair 
              ? `The pair (${correctPair[0]}, ${correctPair[1]}) works because ${correctPair[0]} + ${correctPair[1]} = ${b}`
              : 'Finding the right factor pair...',
            technique: 'quadratic',
            tip: '💡 Start with smaller factors and work your way up'
          });
          
          // Fourth step: show the factoring process
          if (correctPair && a === 1) {
            steps.push({
              stepNumber: stepNumber++,
              description: 'Write the factored form',
              expression: `(${variable} ${correctPair[0] >= 0 ? '+' : ''}${correctPair[0]})(${variable} ${correctPair[1] >= 0 ? '+' : ''}${correctPair[1]})`,
              explanation: `Since ${correctPair[0]} and ${correctPair[1]} multiply to ${c} and add to ${b}, we can factor as shown`,
              technique: 'quadratic',
              tip: '🎉 Each binomial uses one of the numbers we found!'
            });
          } else {
            steps.push({
              stepNumber: stepNumber++,
              description: 'Write the factored form',
              expression: innerFactored,
              explanation: 'Using the factor pair we found, we get this factorization',
              technique: 'quadratic',
              tip: '📐 For a ≠ 1, the factoring is more complex'
            });
          }
          
          // Fifth step: verify the answer
          const verification = verifyFactorization(innerFactored, currentExpression);
          if (verification) {
            steps.push({
              stepNumber: stepNumber++,
              description: 'Verify by expanding',
              expression: `${innerFactored} = ${verification}`,
              explanation: 'Multiply the factors to check that we get back the original expression',
              technique: 'quadratic',
              tip: '✅ Always verify your answer by expanding!'
            });
          }
        } else {
          // Fallback for complex expressions
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
    }
    // Check for difference of squares (a² - b²)
    else if (expanded.match(/^[^+-]*\^2\s*-\s*[^+-]*$/)) {
      // Parse the two terms
      const parts = expanded.split('-').map(p => p.trim());
      if (parts.length === 2) {
        steps.push({
          stepNumber: stepNumber++,
          description: 'Recognize the pattern',
          expression: `${parts[0]} - ${parts[1]}`,
          explanation: 'This looks like a² - b² (difference of squares)',
          technique: 'difference-of-squares',
          tip: '🔍 Look for two perfect squares with a minus sign between them'
        });
        
        // Check if both are perfect squares
        const sqrt1 = isPerfectSquare(parts[0]);
        const sqrt2 = isPerfectSquare(parts[1]);
        
        if (sqrt1.isSquare && sqrt2.isSquare) {
          steps.push({
            stepNumber: stepNumber++,
            description: 'Identify the square roots',
            expression: `√(${parts[0]}) = ${sqrt1.root}, √(${parts[1]}) = ${sqrt2.root}`,
            explanation: `Since both terms are perfect squares, we can find their square roots`,
            technique: 'difference-of-squares',
            tip: '💡 Check: (${sqrt1.root})² = ${parts[0]} ✓ and (${sqrt2.root})² = ${parts[1]} ✓'
          });
          
          steps.push({
            stepNumber: stepNumber++,
            description: 'Apply the difference of squares formula',
            expression: `(${sqrt1.root} + ${sqrt2.root})(${sqrt1.root} - ${sqrt2.root})`,
            explanation: 'a² - b² = (a + b)(a - b)',
            technique: 'difference-of-squares',
            tip: '📐 This formula always works for difference of squares!'
          });
          
          // Verify
          const factored = `(${sqrt1.root} + ${sqrt2.root}) * (${sqrt1.root} - ${sqrt2.root})`;
          const verification = verifyFactorization(factored, currentExpression);
          if (verification) {
            steps.push({
              stepNumber: stepNumber++,
              description: 'Verify by expanding',
              expression: `(${sqrt1.root} + ${sqrt2.root})(${sqrt1.root} - ${sqrt2.root}) = ${verification}`,
              explanation: 'Using FOIL: First + Outer + Inner + Last',
              technique: 'difference-of-squares',
              tip: '✅ The middle terms cancel out: that\\'s the magic of this pattern!'
            });
          }
        }
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