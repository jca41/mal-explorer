import { queriesRouter } from '~/lib/mal/api/service.server';

import { t } from './trpc.server';

export const router = t.mergeRouters(queriesRouter);
