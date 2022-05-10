import { useSearchParams } from '@remix-run/react';

import { RankingTypeParam } from '~/contracts/mal';

const RANKING_TYPES: Record<RankingTypeParam, string> = {
  all: 'Rating',
  bypopularity: 'Popularity',
  airing: 'Airing',
  movie: 'Movie',
  tv: 'TV',
  upcoming: 'Upcoming',
  favorite: 'Favorite',
  ova: 'OVA',
  special: 'Special',
};

export function RankingTypeSelect({ onSubmit }: { onSubmit: () => void }) {
  const [params] = useSearchParams();

  return (
    <select name="sort" defaultValue={params.get('sort') ?? 'all'} onChange={() => onSubmit()}>
      {(Object.keys(RANKING_TYPES) as (keyof typeof RANKING_TYPES)[]).map((r) => (
        <option key={r} value={r}>
          {RANKING_TYPES[r]}
        </option>
      ))}
    </select>
  );
}
