import { ClientAuthState } from '~/contracts/auth';
import { ExtractParamsDef } from '~/contracts/service';

export type GenericQueryFn = (data: unknown) => string;

export const PATHS = {
  list: '/anime',
  detail: ({ id }: ExtractParamsDef<'detail'>) => `/anime/${id}`,
  top: '/anime/ranking',
  seasonal: ({ season, year }: ExtractParamsDef<'seasonal'>) => `/anime/season/${year}/${season}`,
} as const;

export const FIELDS = {
  list: 'id,title,main_picture,alternative_titles,mean,rank,popularity,media_type,status,start_season,num_episodes',
  detail: ({ signedIn }: ClientAuthState) => {
    const DEFAULT_DETAIL =
      'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,recommendations,studios,videos,statistics';

    return signedIn ? `${DEFAULT_DETAIL}, my_list_status` : DEFAULT_DETAIL;
  },
} as const;
