import { z } from 'zod';

import { MyListStatus, Node } from '~/contracts/mal';

import { getParsedIntSchema, StatusSchema } from './zod';

type FormListStatus = Partial<Omit<MyListStatus, 'updated_at' | 'is_rewatching' | 'start_date' | 'finish_date'>>;

const ParsedIntSchema = getParsedIntSchema();

const FormListStatusSchema = z
  .object({
    score: ParsedIntSchema,
    status: StatusSchema,
    num_episodes_watched: ParsedIntSchema,
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
  'num_episodes_watched',
  'priority',
  'comments',
  'rewatch_value',
  'num_times_rewatched',
];

export function getListStatusDiff({ currentListStatus, updatedListStatus }: Exclude<GetActionFormValuesReturn, 'action'>) {
  return listStatusKeys.reduce<FormListStatus>((acc, key) => {
    const currentValue = currentListStatus[key];
    const updatedValue = updatedListStatus[key];

    if (currentValue === updatedValue || updatedValue === undefined || acc[key]) {
      return acc;
    }

    return {
      ...acc,
      [key]: updatedValue,
    };
  }, {});
}
