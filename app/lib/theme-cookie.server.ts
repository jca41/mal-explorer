import { createCookie } from '@remix-run/node';

import { THEME_COOKIE, THEMES } from '~/constants';

const themeCookie = createCookie(THEME_COOKIE);

export const getThemeCookie = async (request: Request) => (await themeCookie.parse(request.headers.get('Cookie')))?.theme ?? THEMES[0];
