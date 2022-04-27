import { FC } from 'react';

type StatPairProps = {
  icon: FC<{ className: string }>;
  value: string | number;
  iconClassname?: string;
  textClassName?: string;
};

export function StatPair({ icon: Icon, iconClassname = '', value, textClassName = '' }: StatPairProps) {
  if (!value) return null;

  return (
    <div className="flex flex-row space-x-1 items-center">
      <Icon className={`w-4 ${iconClassname}`} />
      <span className={`text-sm tracking-tight ${textClassName}`}>{value}</span>
    </div>
  );
}
