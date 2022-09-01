export const LOADING_IMG_SRC = '/images/kon.webp';
export const NAV_IMG_SRC = '/images/bleach-badge.webp';

export const LIST_LIMIT = 25;

export const THEME_COOKIE = 'theme';

export const THEMES = ['dracula', 'cupcake', 'business', 'winter', 'night', 'fantasy', 'aqua', 'autumn', 'valentine'] as const;
export const DEFAULT_THEME: typeof THEMES[number] = 'dracula';
