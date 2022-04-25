import { Error } from '~/contracts/mal';

const BASE_PATH = 'https://api.myanimelist.net/v2';

const clientId = process.env.MAL_CLIENT_ID as string;

const QUERY_TYPES = {
  list: '/anime',
} as const;

const FIELD_TYPES = {
  list: 'id,title,main_picture,alternative_titles,mean,rank,popularity,media_type,status,start_season',
  detail:
    'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,recommendations,studios,statistics',
} as const;

type ListQuery = {
  q: string;
  limit: number;
  offset?: number;
};
type Query = ListQuery;

type Service = {
  type: keyof typeof QUERY_TYPES;
  query?: Query;
};

function normaliseQuery(query: Query = {} as Query) {
  return Object.keys(query).reduce((acc, key) => {
    const value = query[key as keyof Query];
    return { ...acc, [key]: typeof value !== 'string' ? value?.toString?.() : value };
  }, {});
}

export async function malService<Result = unknown>({ type, query }: Service): Promise<Result> {
  const path = `${BASE_PATH}${QUERY_TYPES[type]}`;
  const fields = FIELD_TYPES[type];

  const url = `${path}?${new URLSearchParams({ fields, ...normaliseQuery(query) }).toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-MAL-CLIENT-ID': clientId,
    },
  });

  return response.json();
}
