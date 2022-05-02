import { FC } from 'react';

type StatPairProps = {
  icon: FC<{ className: string }>;
  value: string | number;
  iconClassname?: string;
  textClassName?: string;
};

export function StatPair({ icon: Icon, iconClassname = 'w-4', value, textClassName = 'text-sm tracking-tight' }: StatPairProps) {
  if (!value) return null;

  return (
    <div className="flex flex-row space-x-1 items-center">
      <Icon className={iconClassname} />
      <span className={textClassName}>{value}</span>
    </div>
  );
}
