import { SparklesIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { createContext, useContext, useMemo, useState } from 'react';

import { THEME_COOKIE, THEMES } from '~/constants';
import { Theme, ThemeClientState } from '~/contracts/theme';

import { useRouteMatch } from './use-route-match';

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: 'retro', setTheme: () => null });

function setThemeCookie(theme: Theme) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 2);

  Cookies.set(THEME_COOKIE, btoa(JSON.stringify({ theme })), { expires: date });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: defaultTheme } = useRouteMatch<{ data: ThemeClientState }>('root').data;

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme: (t: Theme) => {
        setTheme(t);
        setThemeCookie(t);
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
export function ThemePicker() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="dropdown dropdown-left">
      <label tabIndex={0} className="btn btn-circle btn-xs ml-1 flex items-center">
        <SparklesIcon className="w-4 h-4" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu menu-compact p-2 shadow-md bg-base-100 rounded-box">
        <li className="menu-title">
          <span>Theme</span>
        </li>
        {THEMES.map((t) => (
          <li key={t} className="py-0.5">
            <button onClick={() => setTheme(t)} className={clsx({ active: theme === t })}>
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
