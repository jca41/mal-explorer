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
  const id = `${name}-${value as string}`;
  return (
    <span className={`px-2.5 py-1.5 flex items-center bg-blue-50 bg-opacity-60`}>
      <input className="mr-2" id={id} type="radio" name={name} value={value?.toString()} onChange={onChange} defaultChecked={defaultChecked} />
      <label className="text-slate-600" htmlFor={id}>
        {label}
      </label>
    </span>
  );
}

export function RadioGroup<O extends Record<string | number, string>>({ label, name, radioMap, defaultValue, onChange }: RadioGroupProps<O>) {
  const [params] = useSearchParams();
  const defaultCheckedValue = params.get(name) ?? defaultValue;

  return (
    <div className="space-x-3 flex items-center">
      <span className="font-semibold">{label}</span>
      <div className="inline-flex space-x-2">
        {(Object.keys(radioMap) as (keyof typeof radioMap)[]).map((r) => (
          <Radio key={r as string} name={name} label={radioMap[r]} value={r} defaultChecked={defaultCheckedValue === r} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}
