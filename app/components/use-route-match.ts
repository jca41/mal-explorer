import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';

export function useRouteMatch<T = Record<string, unknown>>(routeId: string) {
  const matches = useMatches();

  return useMemo<T | Record<string, never>>(() => matches.find((match) => match.id === routeId) ?? {}, [matches]);
}
