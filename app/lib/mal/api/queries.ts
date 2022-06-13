import { ClientAuthState } from '~/contracts/auth';
import { RankingTypeParam, SeasonalSortQueryParam, SeasonParam } from '~/contracts/mal';

type DetailParams = { id: string };
type SeasonalParams = { season: SeasonParam; year: number };

export type ListQuery = {
  q: string;
  limit: number;
  offset?: number;
};

export type TopQuery = {
  ranking_type: RankingTypeParam;
  limit: number;
  offset?: number;
};

export type SeasonalQuery = {
  limit: number;
  offset?: number;
  sort: SeasonalSortQueryParam;
};

export type Query = ListQuery | TopQuery | SeasonalQuery;

export type Params = DetailParams | SeasonalParams;
export type GenericQueryFn = (data: unknown) => string;

export const QUERY_TYPES = {
  list: '/anime',
  detail: ({ id }: DetailParams) => `/anime/${id}`,
  top: '/anime/ranking',
  seasonal: ({ season, year }: SeasonalParams) => `/anime/season/${year}/${season}`,
} as const;

export const FIELD_TYPES = {
  list: 'id,title,main_picture,alternative_titles,mean,rank,popularity,media_type,status,start_season,num_episodes',
  detail: ({ signedIn }: ClientAuthState) => {
    const DEFAULT_DETAIL =
      'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,recommendations,studios,videos,statistics';

    return signedIn ? `${DEFAULT_DETAIL}, my_list_status` : DEFAULT_DETAIL;
  },
} as const;
