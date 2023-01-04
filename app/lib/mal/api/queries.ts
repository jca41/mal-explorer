import { z } from 'zod';

import { t } from '~/backend/trpc.server';
import { MyListNodeList, Node, NodeList } from '~/contracts/mal';
import {
  myListSortParamSchema,
  myListStatusTypeSchema,
  rankingTypeParamSchema,
  seasonalSortParamSchema,
  seasonParamSchema,
} from '~/contracts/schemas';

import { malRequest } from './request';

const limitSchema = z.number();
const offsetSchema = z.number().optional();
const accessTokenSchema = z.string();

const LIST_FIELDS = 'id,title,main_picture,alternative_titles,mean,rank,popularity,media_type,status,start_season,num_episodes';
const DEFAULT_DETAIL_FIELDS =
  'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime{mean},recommendations{mean},studios,videos,statistics';

export const queriesRouter = t.router({
  animeList: t.procedure
    .input(
      z.object({
        q: z.string(),
        limit: limitSchema,
        offset: offsetSchema,
      })
    )
    .query(({ input }) => {
      return malRequest<NodeList>({
        path: '/anime',
        params: {
          fields: LIST_FIELDS,
          ...input,
        },
      });
    }),
  animeDetail: t.procedure
    .input(
      z.object({
        id: z.number(),
        accessToken: z.optional(accessTokenSchema),
      })
    )
    .query(({ input: { id, accessToken } }) => {
      return malRequest<Node>({
        path: `/anime/${id}`,
        params: {
          fields: accessToken
            ? `${DEFAULT_DETAIL_FIELDS},my_list_status{priority,comments,num_times_rewatched,rewatch_value}`
            : DEFAULT_DETAIL_FIELDS,
        },
        accessToken,
      });
    }),
  topAnime: t.procedure
    .input(
      z.object({
        ranking_type: rankingTypeParamSchema,
        limit: limitSchema,
        offset: offsetSchema,
      })
    )
    .query(({ input }) => {
      return malRequest<NodeList>({
        path: '/anime/ranking',
        params: {
          fields: LIST_FIELDS,
          ...input,
        },
      });
    }),
  seasonalAnime: t.procedure
    .input(
      z.object({
        year: z.number(),
        season: seasonParamSchema,
        sort: seasonalSortParamSchema,
        limit: limitSchema,
        offset: offsetSchema,
      })
    )
    .query(({ input: { season, year, ...params } }) => {
      return malRequest<NodeList>({
        path: `/anime/season/${year}/${season}`,
        params: {
          fields: LIST_FIELDS,
          ...params,
        },
      });
    }),
  myList: t.procedure
    .input(
      z.object({
        status: myListStatusTypeSchema,
        accessToken: accessTokenSchema,
        sort: myListSortParamSchema,
        limit: limitSchema,
        offset: offsetSchema,
      })
    )
    .query(({ input: { accessToken, ...params } }) => {
      return malRequest<MyListNodeList>({
        path: '/users/@me/animelist',
        params: {
          fields: `${LIST_FIELDS},list_status{start_date,finish_date}`,
          ...params,
        },
        accessToken,
      });
    }),
  suggestedAnime: t.procedure
    .input(
      z.object({
        accessToken: accessTokenSchema,
        limit: limitSchema,
        offset: offsetSchema,
      })
    )
    .query(({ input: { accessToken, ...params } }) => {
      return malRequest<NodeList>({
        path: `/anime/suggestions`,
        params: {
          fields: LIST_FIELDS,
          ...params,
        },
        accessToken,
      });
    }),
});

// type AnimeList = {
//   q: string;
//   limit: Limit;
//   offset?: Offset;
// };
// export const animeList = (params: AnimeList) => {
//   return malRequest<NodeList>({
//     path: '/anime',
//     params: {
//       fields: LIST_FIELDS,
//       ...params,
//     },
//   });
// };

// type AnimeDetail = { id: Node['id']; accessToken?: AuthState['accessToken'] };
// export const animeDetail = ({ id, accessToken }: AnimeDetail) => {
//   return malRequest<Node>({
//     path: `/anime/${id}`,
//     params: {
//       fields: accessToken ? `${DEFAULT_DETAIL_FIELDS},my_list_status{priority,comments,num_times_rewatched,rewatch_value}` : DEFAULT_DETAIL_FIELDS,
//     },
//     accessToken,
//   });
// };

// type TopAnime = { ranking_type: RankingTypeParam; limit: Limit; offset?: Offset };
// export const topAnime = (params: TopAnime) => {
//   return malRequest<NodeList>({
//     path: '/anime/ranking',
//     params: {
//       fields: LIST_FIELDS,
//       ...params,
//     },
//   });
// };

// type SeasonalAnime = { sort: SeasonalSortQueryParam; limit: Limit; offset?: Offset; season: SeasonParam; year: number };
// export const seasonalAnime = ({ season, year, ...params }: SeasonalAnime) => {
//   return malRequest<NodeList>({
//     path: `/anime/season/${year}/${season}`,
//     params: {
//       fields: LIST_FIELDS,
//       ...params,
//     },
//   });
// };

// type MyList = {
//   status: MyListStatus['status'];
//   accessToken: AuthState['accessToken'];
//   sort: MyListSortQueryParam;
//   limit: Limit;
//   offset?: Offset;
// };
// export const myList = ({ accessToken, ...params }: MyList) => {
//   return malRequest<MyListNodeList>({
//     path: '/users/@me/animelist',
//     params: {
//       fields: `${LIST_FIELDS},list_status{start_date,finish_date}`,
//       ...params,
//     },
//     accessToken,
//   });
// };

// type SuggestedAnime = { limit: Limit; offset?: Offset; accessToken: AuthState['accessToken'] };
// export const suggestedAnime = ({ accessToken, ...params }: SuggestedAnime) => {
//   return malRequest<NodeList>({
//     path: `/anime/suggestions`,
//     params: {
//       fields: LIST_FIELDS,
//       ...params,
//     },
//     accessToken,
//   });
// };
