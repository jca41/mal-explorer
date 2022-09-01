import Cookies from 'js-cookie';
import { createContext, useContext, useMemo, useState } from 'react';

import { DEFAULT_THEME, THEME_COOKIE, THEMES } from '~/constants';
import { Theme, ThemeClientState } from '~/contracts/theme';

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
export function ThemePicker() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <select value={theme} className="select" onChange={(e) => setTheme(e.target.value as Theme)}>
      {THEMES.map((t) => (
        <option value={t}>{t}</option>
      ))}
    </select>
  );
}
