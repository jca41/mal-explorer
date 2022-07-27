import { useState } from 'react';

type RangeProps = {
  name: string;
  initialValue?: number;
  max: number;
  disabled?: boolean;
};
export function Range({ name, initialValue, max, disabled = false }: RangeProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex">
      <div className={'mr-2 bg-blue-100 p-1 rounded-md text-xs font-mono'}>{value}</div>
      <input
        name={name}
        disabled={disabled}
        type="range"
        min={0}
        max={max}
        defaultValue={initialValue}
        onChange={(e) => setValue(parseInt(e.currentTarget.value))}
      ></input>
    </div>
  );
}
