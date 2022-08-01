import { useMachine } from '@xstate/react';

import { debounceMachine } from '~/machines/debounce';

type SearchInputProps = {
  defaultValue: string;
  onChange: CallableFunction;
};

export function SearchInput({ defaultValue, onChange }: SearchInputProps) {
  const [, send] = useMachine(debounceMachine, {
    context: {
      action: () => onChange(),
    },
  });

  return (
    <input
      type="text"
      name="q"
      placeholder="Search..."
      required
      defaultValue={defaultValue}
      onChange={() => send({ type: 'CHANGE' })}
      minLength={3} // min query is 3 chars
      autoComplete="off"
      className="rounded-lg h-12 w-full max-w-xs"
    />
  );
}
