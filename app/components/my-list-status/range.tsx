import { useState } from 'react';

import { ParsedIntSchema } from '~/utils/zod';

type RangeProps = {
  name: string;
  initialValue?: number;
  max: number;
  disabled?: boolean;
};
export function Range({ name, initialValue, max, disabled = false }: RangeProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex flex-row items-center gap-1">
      <div className="badge font-mono badge-ghost">{value}</div>
      <input
        className="range"
        name={name}
        disabled={disabled}
        type="range"
        min={0}
        max={max}
        defaultValue={initialValue}
        onChange={(e) => setValue(ParsedIntSchema.parse(e.currentTarget.value))}
      ></input>
    </div>
  );
}
