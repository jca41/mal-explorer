import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type StatIconPairProps = {
  icon: FC<{ className: string }>;
  value: string | number;
  iconClassname?: string;
  textClassName?: string;
};

export function StatIconPair({ icon: Icon, iconClassname, value, textClassName }: StatIconPairProps) {
  if (!value) return null;

  return (
    <li className="flex flex-row space-x-1 items-center">
      <Icon className={twMerge('w-4', iconClassname)} />
      <span className={twMerge('text-sm tracking-tight', textClassName)}>{value}</span>
    </li>
  );
}

type StatPairProps = {
  label: string;
  value?: string | null;
};

export function StatPair({ label, value }: StatPairProps) {
  if (!value) return null;

  return (
    <li className="flex space-x-2">
      <span className="font-semibold">{`${label}: `}</span>
      <span>{value}</span>
    </li>
  );
}
