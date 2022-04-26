import { FC } from 'react';

type StatPairProps = {
  icon: FC<{ className: string }>;
  value: string | number;
};

export function StatPair({ icon: Icon, value }: StatPairProps) {
  if (!value) return null;
  return (
    <div className="flex flex-row space-x-1 items-center">
      <Icon className="w-4" />
      <span className="text-sm tracking-tight">{value}</span>
    </div>
  );
}
