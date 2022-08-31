import { createMachine } from 'xstate';

import { ParentTriggerEvent } from '~/machines/debounce';

export const searchMachine = createMachine({
  id: 'search',
  tsTypes: {} as import('./search.typegen').Typegen0,
  schema: {
    events: {} as ParentTriggerEvent,
  },
  initial: 'idle',
  on: {
    TRIGGER: [
      {
        target: 'valid',
        internal: false,
        cond: 'isValid',
      },
      { target: 'invalid', internal: false },
    ],
  },
  states: {
    idle: {},
    valid: {
      entry: 'submit',
    },
    invalid: {
      entry: 'reportValidity',
    },
  },
});
