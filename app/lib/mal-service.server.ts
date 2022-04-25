const BASE_PATH = 'https://api.myanimelist.net/v2';

const clientId = process.env.MAL_CLIENT_ID as string;

const QUERY_TYPES = {
  search: '/anime',
} as const;

type TMAL = {
  type: keyof typeof QUERY_TYPES;
  query?: Record<string, string>;
};

export async function MALQuery({ type, query }: TMAL) {
  const path = `${BASE_PATH}${QUERY_TYPES[type]}`;

  const url = !query ? path : `${path}?${new URLSearchParams(query).toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-MAL-CLIENT-ID': clientId,
    },
  });

  return response.json();
}
