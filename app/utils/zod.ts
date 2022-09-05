import { z, ZodNumber, ZodTypeAny, ZodUnion } from 'zod';

import { UNTYPED_LIST_STATUS } from '~/constants';

import { parseIntSafe } from './primitives';

export function getParsedIntSchema(zFn: ZodNumber | ZodUnion<[ZodTypeAny, ...ZodTypeAny[]]> = z.number()) {
  return z.preprocess(parseIntSafe, zFn);
}

export const ParsedIntSchema = getParsedIntSchema();

export const StatusSchema = z.enum(UNTYPED_LIST_STATUS);
