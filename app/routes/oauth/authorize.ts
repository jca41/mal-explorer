import { ActionFunction, redirect } from '@remix-run/node';

import { getAuthorizationUrl } from '~/lib/mal/oauth.server';
export const action: ActionFunction = async () => {
  return redirect(getAuthorizationUrl());
};
