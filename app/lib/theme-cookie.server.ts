import { createCookie } from '@remix-run/node';

import { DEFAULT_THEME, THEME_COOKIE } from '~/constants';

const themeCookie = createCookie(THEME_COOKIE);

export const getThemeCookie = async (request: Request) => (await themeCookie.parse(request.headers.get('Cookie')))?.theme ?? DEFAULT_THEME;
