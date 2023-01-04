import { SparklesIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { createContext, useContext, useMemo, useState } from 'react';

import { DARK_THEMES, DEFAULT_THEME, LIGHT_THEMES, THEME_COOKIE } from '~/constants';
import { Theme, ThemeClientState } from '~/contracts/theme';
import { capitalize } from '~/utils/primitives';

import { useRouteMatch } from './use-route-match';

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: DEFAULT_THEME, setTheme: () => null });

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

function ThemeItem({ theme, active, onClick }: { theme: Theme; active: boolean; onClick: (t: Theme) => void }) {
  return (
    <li key={theme}>
      <button onClick={() => onClick(theme)} className={clsx({ active })}>
        {capitalize(theme)}
      </button>
    </li>
  );
}
export function ThemePicker() {
  const { theme, setTheme } = useContext(ThemeContext);

  const onThemeChange = (t: Theme) => setTheme(t);
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm flex items-center">
        <SparklesIcon className="w-5" />
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box menu-compact mt-3 space-y-1.5 bg-base-300 p-2 shadow">
        <li className="menu-title">
          <span>Dark</span>
        </li>

        {DARK_THEMES.map((t) => (
          <ThemeItem key={t} theme={t} active={t === theme} onClick={onThemeChange} />
        ))}
        <li className="menu-title">
          <span>Light</span>
        </li>
        {LIGHT_THEMES.map((t) => (
          <ThemeItem key={t} theme={t} active={t === theme} onClick={onThemeChange} />
        ))}
      </ul>
    </div>
  );
}
