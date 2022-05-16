import { RankingTypeParam, SeasonParam } from '~/contracts/mal';

const BASE_PATH = 'https://api.myanimelist.net/v2';

const clientId = process.env.MAL_CLIENT_ID as string;

type DetailParams = { id: string };
type SeasonalParams = { season: SeasonParam; year: number };

const QUERY_TYPES = {
  list: '/anime',
  detail: ({ id }: DetailParams) => `/anime/${id}`,
  top: '/anime/ranking',
  seasonal: ({ season, year }: SeasonalParams) => `/anime/season/${year}/${season}`,
} as const;

const FIELD_TYPES = {
  list: 'id,title,main_picture,alternative_titles,mean,rank,popularity,media_type,status,start_season,num_episodes',
  detail:
    'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,recommendations,studios,videos,statistics',
} as const;

type ListQuery = {
  q: string;
  limit: number;
  offset?: number;
};

type TopQuery = {
  ranking_type: RankingTypeParam;
  limit: number;
  offset?: number;
};

type Query = ListQuery | TopQuery;

type Params = DetailParams | SeasonalParams;
type GenericQueryFn = (data: unknown) => string;

type Service = {
  type: keyof typeof QUERY_TYPES;
  fields: keyof typeof FIELD_TYPES;
  query?: Query;
  params?: Params;
};

function normaliseQuery(query: Query = {} as Query) {
  return Object.keys(query).reduce((acc, key) => {
    const value = query[key as keyof Query];
    return { ...acc, [key]: typeof value !== 'string' ? value?.toString?.() : value };
  }, {});
}

export async function malService<Result = unknown>({ type, fields, query, params }: Service): Promise<Result> {
  const queryBuilder = QUERY_TYPES[type];

  const path = typeof queryBuilder === 'function' ? (queryBuilder as GenericQueryFn)(params) : queryBuilder;
  const fieldsString = FIELD_TYPES[fields];

  const url = `${BASE_PATH}${path}?${new URLSearchParams({ fields: fieldsString, ...normaliseQuery(query) }).toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-MAL-CLIENT-ID': clientId,
    },
  });

  return response.json();
}
