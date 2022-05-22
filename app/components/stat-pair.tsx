import { FC } from 'react';

type StatIconPairProps = {
  icon: FC<{ className: string }>;
  value: string | number;
  iconClassname?: string;
  textClassName?: string;
};

export function StatIconPair({ icon: Icon, iconClassname = 'w-4', value, textClassName = 'text-sm tracking-tight' }: StatIconPairProps) {
  if (!value) return null;

  return (
    <li className="flex flex-row space-x-1 items-center">
      <Icon className={iconClassname} />
      <span className={textClassName}>{value}</span>
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
