import { assign, createMachine } from 'xstate';

export const debounceMachine = createMachine(
  {
    id: 'debounce',
    schema: {
      context: {} as {
        action: CallableFunction;
        data: unknown;
      },
      events: {} as { type: 'CHANGE'; data?: unknown },
    },
    context: {
      action: () => null,
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
          DEFAULT: { target: 'idle', actions: 'callAction' },
        },
      },
    },
  },
  {
    actions: {
      assignDataToContext: assign({ data: (ctx, e) => ('data' in e ? e.data : ctx.data) }),
      callAction: (ctx) => ctx.action(ctx.data),
    },
    delays: {
      DEFAULT: 500,
    },
  }
);
