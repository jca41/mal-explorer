import { useSearchParams } from '@remix-run/react';

import { SeasonalSortQueryParam } from '~/contracts/mal';

export const SEASONAL_SORT_RADIOS: Record<SeasonalSortQueryParam, string> = {
  anime_score: 'score',
  anime_num_list_users: 'users',
};

function Radio({ name, label, value, defaultChecked = false }) {
  const id = `${name}-${value}`;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="radio" name={name} value={value} defaultChecked={defaultChecked} />
    </>
  );
}

export function RadioGroup({ name, radioMap }) {
  const [params] = useSearchParams();
  const defaultValue = params.get('sort');

  return (
    <div>
      {Object.keys(radioMap).map((r) => (
        <Radio key={r} name={name} label={radioMap[r]} value={r} defaultChecked={defaultValue === r} />
      ))}
    </div>
  );
}
