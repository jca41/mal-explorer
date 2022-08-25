import { useState } from 'react';

export function useToggle({ initial }: { initial?: boolean } = {}) {
  const [on, setOn] = useState(!!initial);

  return {
    on,
    toggle: () => setOn((s) => !s),
  };
}
