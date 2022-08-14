// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: 'submit' | 'reportValidity';
    services: never;
    guards: 'isValid';
    delays: never;
  };
  eventsCausingActions: {
    reportValidity: 'TRIGGER';
    submit: 'TRIGGER';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isValid: 'TRIGGER';
  };
  eventsCausingDelays: {};
  matchesStates: 'idle' | 'invalid' | 'valid';
  tags: never;
}
