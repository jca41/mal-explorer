import { redirect } from '@remix-run/node';

import { getAuthorizationUrl } from '~/lib/mal/oauth.server';
export const action = async () => {
  return redirect(getAuthorizationUrl());
};
