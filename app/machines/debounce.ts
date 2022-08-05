import { assign, createMachine, sendParent } from 'xstate';

type DContext = {
  data: unknown;
};

export type ParentTriggerEvent = {
  type: 'TRIGGER';
  data: DContext['data'];
};

export const debounceMachine = createMachine(
  {
    id: 'debounce',
    tsTypes: {} as import('./debounce.typegen').Typegen0,
    schema: {
      context: {} as DContext,
      events: {} as { type: 'CHANGE' | 'TRIGGER'; data?: unknown },
    },
    context: {
      data: null,
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHANGE: {
            actions: 'assignDataToContext',
            target: 'debounce',
          },
        },
      },
      debounce: {
        on: {
          CHANGE: {
            actions: 'assignDataToContext',
            target: 'debounce',
          },
        },
        after: {
          DEFAULT: {
            target: 'trigger',
          },
        },
      },
      trigger: {
        entry: sendParent<DContext, ParentTriggerEvent>((ctx) => ({ type: 'TRIGGER', data: ctx.data })),
        always: 'idle',
      },
    },
  },
  {
    actions: {
      assignDataToContext: assign({ data: (ctx, e) => ('data' in e ? e.data : ctx.data) }),
    },
    delays: {
      DEFAULT: 500,
    },
  }
);
