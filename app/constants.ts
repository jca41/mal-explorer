import { MyListStatus } from './contracts/mal';

export const LOADING_IMG_SRC = '/images/kon.webp';
export const NAV_IMG_SRC = '/images/bleach-badge.webp';

export const UNTYPED_LIST_STATUS = ['watching', 'plan_to_watch', 'on_hold', 'dropped', 'completed'] as const;
export const LIST_STATUS: ReadonlyArray<NonNullable<MyListStatus['status']>> = UNTYPED_LIST_STATUS;

export const LIST_LIMIT = 25;

export const THEME_COOKIE = 'theme';

export const THEMES = ['dracula', 'cupcake', 'business', 'winter', 'night', 'fantasy', 'autumn', 'valentine', 'black', 'halloween', 'forest'] as const;
export const DEFAULT_THEME: typeof THEMES[number] = 'dracula';
