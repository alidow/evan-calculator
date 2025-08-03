export function DarkModeScript() {
  const script = `
    (function() {
      function getThemePreference() {
        const stored = localStorage.getItem('darkMode');
        if (stored) {
          return stored === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      const isDark = getThemePreference();
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}