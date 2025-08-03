// Google Analytics event tracking helper functions

// Helper to check if gtag is available
export const isGtagAvailable = () => {
  return typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined';
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (isGtagAvailable()) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track factoring events
export const trackFactoring = (expression: string, success: boolean) => {
  trackEvent(
    'factor_expression',
    'calculator',
    expression,
    success ? 1 : 0
  );
};

// Track example selection
export const trackExampleClick = (example: string) => {
  trackEvent(
    'select_example',
    'calculator',
    example
  );
};

// Track educational tab views
export const trackEducationalTab = (tabName: string) => {
  trackEvent(
    'view_educational_tab',
    'education',
    tabName
  );
};

// Track step-by-step views
export const trackStepByStep = (expression: string) => {
  trackEvent(
    'view_steps',
    'calculator',
    expression
  );
};

// Track dark mode toggle
export const trackDarkModeToggle = (isDark: boolean) => {
  trackEvent(
    'toggle_dark_mode',
    'ui',
    isDark ? 'dark' : 'light'
  );
};