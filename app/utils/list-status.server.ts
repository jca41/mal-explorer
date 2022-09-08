import { z } from 'zod';

import { FormListStatus, MyListStatus, Node } from '~/contracts/mal';

import { isNotStatus, isStatus } from './check-data';
import { getParsedIntSchema, StatusSchema } from './zod';

const ParsedIntSchema = getParsedIntSchema();

const FormListStatusSchema = z
  .object({
    score: ParsedIntSchema,
    status: StatusSchema,
    num_watched_episodes: ParsedIntSchema,
    priority: getParsedIntSchema(z.union([z.literal(0), z.literal(1), z.literal(2)])),
    start_date: z.string(),
    finish_date: z.string(),
    comments: z.string(),
    rewatch_value: ParsedIntSchema,
    num_times_rewatched: ParsedIntSchema,
  })
  .partial();

function getMyListFromBase64(formData: FormData): MyListStatus {
  const myListStatus = formData.get('myListStatus');

  return myListStatus ? JSON.parse(atob(myListStatus as string)) : {};
}

type ActionType = 'edit' | 'delete' | null;

type GetActionFormValuesReturn = {
  action: ActionType;
  numEpisodes: Node['num_episodes'];
  currentListStatus: FormListStatus;
  updatedListStatus: FormListStatus;
};
export function getActionFormValues(formData: FormData): GetActionFormValuesReturn {
  const { _action: action, numEpisodes, myListStatus: _, ...updatedListStatus } = Object.fromEntries(formData);

  return {
    action: action as ActionType,
    currentListStatus: getMyListFromBase64(formData),
    numEpisodes: ParsedIntSchema.parse(numEpisodes),
    updatedListStatus: FormListStatusSchema.parse(updatedListStatus),
  };
}

const listStatusKeys: (keyof FormListStatus)[] = [
  'score',
  'status',
  'num_watched_episodes',
  'priority',
  'comments',
  'rewatch_value',
  'num_times_rewatched',
  'start_date',
  'finish_date',
];

type GetListStatusDiff = Omit<GetActionFormValuesReturn, 'action'>;

const formatMalDate = (date: Date) => date.toISOString().split('T')[0];

function handleDates(
  key: Extract<keyof FormListStatus, 'start_date' | 'finish_date'>,
  {
    acc,
    hasChanges,
    currentListStatus,
    updatedListStatus,
  }: { acc: FormListStatus; hasChanges: boolean } & Pick<GetListStatusDiff, 'currentListStatus' | 'updatedListStatus'>
): FormListStatus {
  const currentValue = currentListStatus[key];
  const updatedValue = updatedListStatus[key];

  if (hasChanges && updatedValue !== '') {
    return { [key]: updatedValue };
  }
  if (!acc.status || !!currentValue) {
    return {};
  }

  let data: FormListStatus = {};

  const now = formatMalDate(new Date());

  const isWatching = isStatus(acc.status, 'watching');

  switch (key) {
    case 'start_date':
      if (isWatching && currentListStatus.status && isNotStatus(currentListStatus.status, 'on_hold')) {
        data = { start_date: now };
      }
      break;
    case 'finish_date':
      if (isStatus(acc.status, ['completed', 'dropped'])) {
        data = { finish_date: now };
      } else if (isWatching) {
        data = { finish_date: '' };
      }
      break;
  }

  return data;
}

export function getListStatusDiff({ currentListStatus, updatedListStatus }: GetListStatusDiff) {
  return listStatusKeys.reduce<FormListStatus>((acc, key) => {
    const currentValue = currentListStatus[key];
    const updatedValue = updatedListStatus[key];

    const hasChanges = currentValue !== updatedValue && updatedValue !== undefined;

    let data: FormListStatus = hasChanges ? { [key]: updatedValue } : {};

    switch (key) {
      case 'finish_date':
      case 'start_date':
        data = handleDates(key, { acc, hasChanges, currentListStatus, updatedListStatus });
        break;
    }

    return {
      ...acc,
      ...data,
    };
  }, {});
}
