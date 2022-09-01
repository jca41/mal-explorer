import { useSearchParams } from '@remix-run/react';

export * from './data';

type SelectProps<O> = {
  onChange: () => void;
  name: string;
  optionMap: O;
  defaultValue: keyof O;
};
export function Select<O extends Record<string | number, string>>({ onChange, name, optionMap, defaultValue }: SelectProps<O>) {
  const [params] = useSearchParams();

  return (
    <select
      className="select select-sm select-primary z-30"
      name={name}
      defaultValue={params.get(name) ?? (defaultValue as string)}
      onChange={() => onChange()}
    >
      {(Object.keys(optionMap) as (keyof typeof optionMap)[]).map((r) => (
        <option key={r as string} value={r as string}>
          {optionMap[r]}
        </option>
      ))}
    </select>
  );
}
