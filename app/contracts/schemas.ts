import { z } from 'zod';

export const rankingTypeParamSchema = z.union([z.literal('all'), z.literal('airing'), z.literal('upcoming')]);
export type RankingTypeParam = z.infer<typeof rankingTypeParamSchema>;

export const seasonParamSchema = z.union([z.literal('winter'), z.literal('spring'), z.literal('summer'), z.literal('fall')]);
export type SeasonParam = z.infer<typeof seasonParamSchema>;

export const seasonalSortParamSchema = z.union([z.literal('anime_score'), z.literal('anime_num_list_users')]);
export type SeasonalSortQueryParam = z.infer<typeof seasonalSortParamSchema>;

export const myListStatusTypeSchema = z.union([
  z.literal('completed'),
  z.literal('plan_to_watch'),
  z.literal('watching'),
  z.literal('on_hold'),
  z.literal('dropped'),
]);
export type MyListStatusType = z.infer<typeof myListStatusTypeSchema>;

export const myListSortParamSchema = z.union([
  z.literal('list_score'),
  z.literal('list_updated_at'),
  z.literal('anime_title'),
  z.literal('anime_start_date'),
]);
export type MyListSortQueryParam = z.infer<typeof myListSortParamSchema>;
