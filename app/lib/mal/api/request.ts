import { AuthState } from '~/contracts/auth';

import { BASE_PATH, CLIENT_ID } from '../constants.server';
import { getAuthHeaders } from './auth-helpers';

export type GenericSearchParams = Record<string, string | number>;

function normaliseSearchParams(query: GenericSearchParams = {}) {
  return Object.keys(query).reduce((acc, key) => {
    const value = query[key];
    return { ...acc, [key]: value?.toString?.() };
  }, {});
}

type MalRequest = {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  path: string;
  params?: GenericSearchParams & { fields: string };
  body?: GenericSearchParams;
  accessToken?: AuthState['accessToken'];
};
export async function malRequest<S>({ method = 'GET', path, params, body, accessToken }: MalRequest): Promise<S> {
  const url = `${BASE_PATH}${path}?${new URLSearchParams(normaliseSearchParams(params)).toString()}`;
  const bodyData = body ? { body: new URLSearchParams(normaliseSearchParams(body)).toString() } : null;

  const response = await fetch(url, {
    method,
    ...bodyData,
    headers: {
      'X-MAL-CLIENT-ID': CLIENT_ID,
      'Content-Type': 'application/x-www-form-urlencoded',
      ...getAuthHeaders(accessToken),
    },
  });

  return response.json();
}
