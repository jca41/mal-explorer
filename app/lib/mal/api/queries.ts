import { AuthState } from '~/contracts/auth';
import { MyListSortQueryParam, MyListStatus, Node, NodeList, RankingTypeParam, SeasonalSortQueryParam, SeasonParam } from '~/contracts/mal';

import { malRequest } from './request';
type Limit = number;
type Offset = number;

const LIST_FIELDS = 'id,title,main_picture,alternative_titles,mean,rank,popularity,media_type,status,start_season,num_episodes';
const DEFAULT_DETAIL_FIELDS =
  'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime{mean},recommendations{mean},studios,videos,statistics';

type AnimeList = {
  q: string;
  limit: Limit;
  offset?: Offset;
};
export const animeList = (params: AnimeList) => {
  return malRequest<NodeList>({
    path: '/anime',
    params: {
      fields: LIST_FIELDS,
      ...params,
    },
  });
};

type AnimeDetail = { id: Node['id']; accessToken?: AuthState['accessToken'] };
export const animeDetail = ({ id, accessToken }: AnimeDetail) => {
  return malRequest<Node>({
    path: `/anime/${id}`,
    params: {
      fields: accessToken ? `${DEFAULT_DETAIL_FIELDS},my_list_status{priority,comments,num_times_rewatched,rewatch_value}` : DEFAULT_DETAIL_FIELDS,
    },
  });
};

type TopAnime = { ranking_type: RankingTypeParam; limit: Limit; offset?: Offset };
export const topAnime = (params: TopAnime) => {
  return malRequest<NodeList>({
    path: '/anime/ranking',
    params: {
      fields: LIST_FIELDS,
      ...params,
    },
  });
};

type SeasonalAnime = { sort: SeasonalSortQueryParam; limit: Limit; offset?: Offset; season: SeasonParam; year: number };
export const seasonalAnime = ({ season, year, ...params }: SeasonalAnime) => {
  return malRequest<NodeList>({
    path: `/anime/season/${year}/${season}`,
    params: {
      fields: LIST_FIELDS,
      ...params,
    },
  });
};

type MyList = {
  status: MyListStatus['status'];
  accessToken: AuthState['accessToken'];
  sort: MyListSortQueryParam;
  limit: Limit;
  offset?: Offset;
};
export const myList = ({ accessToken, ...params }: MyList) => {
  return malRequest<NodeList>({
    path: '/users/@me/animelist',
    params: {
      fields: LIST_FIELDS,
      ...params,
    },
    accessToken,
  });
};
