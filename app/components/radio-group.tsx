import { useSearchParams } from '@remix-run/react';

import { SeasonalSortQueryParam } from '~/contracts/mal';

export const SEASONAL_SORT_RADIOS: Record<SeasonalSortQueryParam, string> = {
  anime_score: 'score',
  anime_num_list_users: 'users',
};

type RadioGroupProps<O> = {
  onChange: () => void;
  name: string;
  radioMap: O;
  defaultValue: keyof O;
  label: string;
};

type RadioProps<O> = Pick<RadioGroupProps<O>, 'name' | 'onChange'> & {
  label: O[keyof O];
  value: keyof O;
  defaultChecked: boolean;
};

function Radio<O extends Record<string | number, string>>({ name, label, value, onChange, defaultChecked }: RadioProps<O>) {
  const id = `${name}-${value}`;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="radio" name={name} value={value?.toString()} onChange={onChange} defaultChecked={defaultChecked} />
    </>
  );
}

export function RadioGroup<O extends Record<string | number, string>>({ label, name, radioMap, defaultValue, onChange }: RadioGroupProps<O>) {
  const [params] = useSearchParams();
  const defaultCheckedValue = params.get(name) ?? defaultValue;

  return (
    <div>
      <span>{label}</span>
      {(Object.keys(radioMap) as (keyof typeof radioMap)[]).map((r) => (
        <Radio key={r as string} name={name} label={radioMap[r]} value={r} defaultChecked={defaultCheckedValue === r} onChange={onChange} />
      ))}
    </div>
  );
}
