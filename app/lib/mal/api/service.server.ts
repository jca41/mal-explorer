import { AuthState } from '~/contracts/auth';

import { BASE_PATH, CLIENT_ID } from '../constants.server';
import { getAuthHeaders } from './auth-helpers';
import { FIELD_TYPES, GenericQueryFn, Params, Query, QUERY_TYPES } from './queries';

type Service = {
  type: keyof typeof QUERY_TYPES;
  fields: keyof typeof FIELD_TYPES;
  query?: Query;
  params?: Params;
  accessToken?: AuthState['accessToken'];
};

function normaliseQuery(query: Query = {} as Query) {
  return Object.keys(query).reduce((acc, key) => {
    const value = query[key as keyof Query];
    return { ...acc, [key]: typeof value !== 'string' ? value?.toString?.() : value };
  }, {});
}

export async function malService<Result = unknown>({ type, fields, query, params, accessToken }: Service): Promise<Result> {
  const queryBuilder = QUERY_TYPES[type];
  const fieldBuilder = FIELD_TYPES[fields];

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
