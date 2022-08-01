// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.after(DEFAULT)#debounce.debounce': { type: 'xstate.after(DEFAULT)#debounce.debounce' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignDataToContext: 'CHANGE';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {
    DEFAULT: 'CHANGE';
  };
  matchesStates: 'idle' | 'debounce' | 'trigger';
  tags: never;
}
