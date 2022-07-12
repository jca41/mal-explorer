import { AuthState } from '~/contracts/auth';
import { BaseService, ExtractOutputDef } from '~/contracts/service';

import { BASE_PATH, CLIENT_ID } from '../constants.server';
import { getAuthHeaders } from './auth-helpers';
import { FIELDS, PATHS } from './queries';

type GenericQueryParams = Record<string, string | number>;
type GenericQueryFn = (data: unknown) => string;

function normaliseQuery(query: GenericQueryParams = {}) {
  return Object.keys(query).reduce((acc, key) => {
    const value = query[key];
    return { ...acc, [key]: typeof value !== 'string' ? value?.toString?.() : value };
  }, {});
}

type Service = BaseService & {
  fields: keyof typeof FIELDS;
  accessToken?: AuthState['accessToken'];
};

export async function malService<S extends Service>({ type, fields, input, accessToken }: S): Promise<ExtractOutputDef<S['type']>> {
  const params = 'params' in input ? input['params'] : undefined;
  const query = 'query' in input ? input['query'] : undefined;

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
