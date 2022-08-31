import { BackspaceIcon } from '@heroicons/react/outline';
import { useMachine } from '@xstate/react';
import { useRef } from 'react';
import { AnyInterpreter, createMachine, forwardTo, send, sendParent } from 'xstate';

import { debounceMachine } from '~/machines/debounce';

type SearchInputProps = {
  defaultValue: string;
  // onChange: CallableFunction;
  parentService: AnyInterpreter;
};

const searchInputMachine = createMachine({
  id: 'search-input',
  tsTypes: {} as import('./search-input.typegen').Typegen0,
  initial: 'debouncing',
  on: {
    RESET: {
      actions: ['reset', send('TRIGGER')],
    },
  },
  states: {
    debouncing: {
      invoke: {
        id: 'debouncer',
        src: debounceMachine,
      },
      on: {
        CHANGE: {
          actions: forwardTo('debouncer'),
        },
        TRIGGER: {
          actions: sendParent((_, e) => e),
        },
      },
    },
  },
});

export function SearchInput({ defaultValue, parentService }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [, send] = useMachine(searchInputMachine, {
    parent: parentService,
    actions: {
      reset: () => {
        if (ref.current?.value) {
          ref.current.value = '';
        }
      },
    },
  });

  return (
    <div className="relative w-full max-w-xs">
      <input
        ref={ref}
        type="text"
        name="q"
        placeholder="Search..."
        required
        defaultValue={defaultValue}
        onChange={() => send({ type: 'CHANGE' })}
        minLength={3} // min query is 3 chars
        autoComplete="off"
        className="input input-bordered w-full input-md"
      />
      <div className="absolute right-2 inset-y-0 flex items-center">
        <button onClick={() => send('RESET')} className="h-min">
          <BackspaceIcon className="w-5 text-secondary" />
        </button>
      </div>
    </div>
  );
}
