import { THEMES } from '~/constants';

export type Theme = typeof THEMES[number];

export type ThemeClientState = {
  theme: Theme;
};
