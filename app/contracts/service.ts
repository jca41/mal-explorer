import { RankingTypeParam, SeasonalSortQueryParam, SeasonParam } from '~/contracts/mal';

type Limit = number;
type Offset = number;

export type QueryDef = {
  list: {
    query: {
      q: string;
      limit: Limit;
      offset?: Offset;
    };
  };
  detail: {
    params: { id: string };
  };
  top: {
    query: {
      ranking_type: RankingTypeParam;
      limit: Limit;
      offset?: Offset;
    };
  };
  seasonal: {
    query: {
      sort: SeasonalSortQueryParam;
      limit: Limit;
      offset?: Offset;
    };
    params: { season: SeasonParam; year: number };
  };
};

export type QueryKeys = keyof QueryDef;
export type GenericQueryParams = Record<string, string | number>;

type QueryDefForType<k extends keyof QueryDef> = QueryDef[k];

export type ExtractParamsDef<k extends keyof QueryDef> = QueryDefForType<k> extends { params: unknown } ? QueryDefForType<k>['params'] : never;
export type ExtractQueryDef<k extends keyof QueryDef> = QueryDefForType<k> extends { query: unknown } ? QueryDefForType<k>['query'] : never;
