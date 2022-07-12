import { Node, NodeList, RankingTypeParam, SeasonalSortQueryParam, SeasonParam } from '~/contracts/mal';

type Limit = number;
type Offset = number;

export type QueryDef =
  | {
      type: 'list';
      input: {
        query: {
          q: string;
          limit: Limit;
          offset?: Offset;
        };
      };
      output: NodeList;
    }
  | {
      type: 'detail';
      input: {
        params: { id: string };
      };
      output: Node;
    }
  | {
      type: 'top';
      input: {
        query: {
          ranking_type: RankingTypeParam;
          limit: Limit;
          offset?: Offset;
        };
      };
      output: NodeList;
    }
  | {
      type: 'seasonal';
      input: {
        query: {
          sort: SeasonalSortQueryParam;
          limit: Limit;
          offset?: Offset;
        };
        params: { season: SeasonParam; year: number };
      };
      output: NodeList;
    };

export type QueryTypes = QueryDef['type'];

export type GenericQueryParams = Record<string, string | number>;

export type ExtractQueryDef<T extends QueryTypes> = Extract<QueryDef, { type: T }>;

export type ExtractInputParamsDef<T extends QueryTypes> = ExtractQueryDef<T> extends { input: { params: infer U } } ? U : never;
export type ExtractInputQueryDef<T extends QueryTypes> = ExtractQueryDef<T> extends { input: { query: infer U } } ? U : never;
export type ExtractOutputDef<T extends QueryTypes> = ExtractQueryDef<T>['output'];

export type BaseService = {
  [T in QueryDef['type']]: Omit<ExtractQueryDef<T>, 'output'>;
}[QueryTypes];

export type ExtractServiceDef<T extends QueryTypes> = Extract<BaseService, { type: T }>;
