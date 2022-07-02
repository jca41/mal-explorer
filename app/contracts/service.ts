import { RankingTypeParam, SeasonalSortQueryParam, SeasonParam } from '~/contracts/mal';

type Limit = number;
type Offset = number;

export type QueryDef =
  | {
      type: 'list';
      query: {
        q: string;
        limit: Limit;
        offset?: Offset;
      };
    }
  | {
      type: 'detail';
      params: { id: string };
    }
  | {
      type: 'top';
      query: {
        ranking_type: RankingTypeParam;
        limit: Limit;
        offset?: Offset;
      };
    }
  | {
      type: 'seasonal';
      query: {
        sort: SeasonalSortQueryParam;
        limit: Limit;
        offset?: Offset;
      };
      params: { season: SeasonParam; year: number };
    };

type QueryTypes = QueryDef['type'];

export type QueryKeys = keyof QueryDef;
export type GenericQueryParams = Record<string, string | number>;

type QueryDefForType<T extends QueryTypes> = Extract<QueryDef, { type: T }>;

export type ExtractParamsDef<T extends QueryTypes> = QueryDefForType<T> extends { params: infer U } ? U : never;
export type ExtractQueryDef<T extends QueryTypes> = QueryDefForType<T> extends { query: infer U } ? U : never;
