import { FormMethod } from '@remix-run/react';

import { AuthState } from '~/contracts/auth';

import { BASE_PATH, CLIENT_ID } from '../constants.server';
import { getAuthHeaders } from './auth-helpers';

type GenericQueryParams = Record<string, string | number>;

function normaliseQuery(query: GenericQueryParams = {}) {
  return Object.keys(query).reduce((acc, key) => {
    const value = query[key];
    return { ...acc, [key]: typeof value !== 'string' ? value?.toString?.() : value };
  }, {});
}

type MalRequest = {
  method?: 'GET' | 'POST' | 'DELETE';
  path: string;
  params?: Record<string, string | number> & { fields: string };
  accessToken?: AuthState['accessToken'];
};
export async function malRequest<S extends object>({ method = 'GET', path, params, accessToken }: MalRequest): Promise<S> {
  const url = `${BASE_PATH}${path}?${new URLSearchParams(normaliseQuery(params)).toString()}`;

  const response = await fetch(url, {
    method,
    headers: {
      'X-MAL-CLIENT-ID': CLIENT_ID,
      ...getAuthHeaders(accessToken),
    },
  });

  return response.json();
}
