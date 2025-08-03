declare module 'algebrite' {
  export function factor(expression: string): {
    toString(): string;
  };
  
  export function run(expression: string): any;
  
  const Algebrite: {
    factor: typeof factor;
    run: typeof run;
  };
  
  export default Algebrite;
}