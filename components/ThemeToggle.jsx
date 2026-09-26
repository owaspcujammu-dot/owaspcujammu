'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative grid h-10 w-10 place-items-center rounded-full border border-[rgb(var(--border))]
                  text-[rgb(var(--fg-muted))] transition-colors duration-200
                  hover:border-accent-500/50 hover:text-accent-500 ${className}`}
    >
      {/* Render a stable icon until mounted so server and client markup match */}
      {!mounted ? (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
