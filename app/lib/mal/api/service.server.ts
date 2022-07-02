import { AuthState } from '~/contracts/auth';
import { QueryDef } from '~/contracts/service';

import { BASE_PATH, CLIENT_ID } from '../constants.server';
import { getAuthHeaders } from './auth-helpers';
import { FIELDS, PATHS } from './queries';

type Service = QueryDef & {
  fields: keyof typeof FIELDS;
  accessToken?: AuthState['accessToken'];
};

type GenericQueryParams = Record<string, string | number>;
type GenericQueryFn = (data: unknown) => string;

function normaliseQuery(query: GenericQueryParams = {}) {
  return Object.keys(query).reduce((acc, key) => {
    const value = query[key];
    return { ...acc, [key]: typeof value !== 'string' ? value?.toString?.() : value };
  }, {});
}

export async function malService<Result = unknown>({ type, fields, accessToken, ...options }: Service): Promise<Result> {
  const params = 'params' in options ? options['params'] : undefined;
  const query = 'query' in options ? options['query'] : undefined;

  const queryBuilder = PATHS[type];
  const fieldBuilder = FIELDS[fields];

  const path = typeof queryBuilder === 'function' ? (queryBuilder as GenericQueryFn)(params) : queryBuilder;
  const fieldsString = typeof fieldBuilder === 'function' ? fieldBuilder({ signedIn: !!accessToken }) : fieldBuilder;

  const url = `${BASE_PATH}${path}?${new URLSearchParams({ fields: fieldsString, ...normaliseQuery(query) }).toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-MAL-CLIENT-ID': CLIENT_ID,
      ...getAuthHeaders(accessToken),
    },
  });

  return response.json();
}
