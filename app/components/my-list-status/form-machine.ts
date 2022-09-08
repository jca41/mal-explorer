import { assign, createMachine } from 'xstate';

import { MyListStatus } from '~/contracts/mal';
import { isNotStatus } from '~/utils/check-data';

type MContext = {
  state: { status: MyListStatus['status']; startDate: MyListStatus['start_date'] };
  visibleFields: {
    score: boolean;
    numEpisodesWatched: boolean;
    dates: boolean;
    finishDate: boolean;
  };
  numEpisodes: MyListStatus['num_episodes_watched'];
};

type MEvents = {
  type: 'FIELD_CHANGE';
  data: {
    status?: MyListStatus['status'];
    startDate?: MyListStatus['start_date'];
  };
};

export const myListStatusFormMachine = createMachine(
  {
    id: 'my-list-status-form',
    tsTypes: {} as import('./form-machine.typegen').Typegen0,
    schema: {
      events: {} as MEvents,
      context: {} as MContext,
    },
    initial: 'idle',
    states: {
      idle: {
        entry: 'updateVisibleFields',
        on: {
          FIELD_CHANGE: {
            target: 'status',
          },
        },
      },
      status: {
        entry: ['updateState', 'updateVisibleFields'],
        always: {
          target: 'idle',
        },
      },
    },
  },
  {
    actions: {
      updateState: assign({
        state: (ctx, e) => {
          const { type, ...eventData } = e;
          return {
            ...ctx.state,
            ...eventData.data,
          } as const;
        },
      }),
      updateVisibleFields: assign({
        visibleFields: (ctx) => {
          const {
            state: { status, startDate },
            numEpisodes,
          } = ctx;

          const isNotPlanToWatch = isNotStatus(status, 'plan_to_watch');

          return {
            score: isNotPlanToWatch,
            numEpisodesWatched: numEpisodes > 1 && isNotStatus(status, ['completed', 'plan_to_watch']),
            dates: isNotPlanToWatch,
            finishDate: isNotStatus(status, ['watching', 'on_hold']) && !!startDate,
          };
        },
      }),
    },
  }
);
