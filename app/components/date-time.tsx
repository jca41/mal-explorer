import { useMemo } from 'react';

import { Node } from '~/contracts/mal';

import { useClientSide } from './use-client-side';

export function DateTime({ date }: { date: Node['updated_at'] }) {
  const mounted = useClientSide();

  const dateInstance = useMemo(() => new Date(date), [date]);

  return mounted ? (
    <>
      <span>{dateInstance.toLocaleDateString()}</span>
      <span>{`, ${dateInstance.toLocaleTimeString()}`}</span>
    </>
  ) : null;
}
