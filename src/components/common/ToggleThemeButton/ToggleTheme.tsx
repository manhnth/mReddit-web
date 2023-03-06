import { useTheme } from '@/lib/ThemeContext';
import React from 'react';

export const ToggleTheme: React.FC = ({}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-6"
    >
      <span>Dark Mode</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          checked={theme === 'dark'}
          type="checkbox"
          className="sr-only peer"
          disabled
        />
        <div className="w-11 h-6 bg-accent-7 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
      </label>
    </div>
  );
};
