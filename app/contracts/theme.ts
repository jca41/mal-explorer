import { DARK_THEMES, LIGHT_THEMES } from '~/constants';

export type Theme = typeof DARK_THEMES[number] | typeof LIGHT_THEMES[number];

export type ThemeClientState = {
  theme: Theme;
};
