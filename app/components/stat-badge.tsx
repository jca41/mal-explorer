import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type StatIconBadgeProps = {
  icon?: FC<{ className: string }>;
  value: string | number | ReactNode;
  classname?: string;
  iconClassname?: string;
  textClassName?: string;
  as?: 'div' | 'li';
};

export function StatIconBadge({ icon: Icon, classname, iconClassname, value, textClassName, as: As = 'li' }: StatIconBadgeProps) {
  if (!value) return null;

  return (
    <As className={twMerge('badge gap-1', classname)}>
      {!!Icon && <Icon className={twMerge('h-[90%]', iconClassname)} />}
      <span className={textClassName}>{value}</span>
    </As>
  );
}

export function StatBadge(props: StatIconBadgeProps) {
  return <StatIconBadge {...props} icon={undefined} />;
}

type StatLabelBadgeProps = {
  label: string;
  value?: string | null;
};

export function StatLabelBadge({ label, value }: StatLabelBadgeProps) {
  if (!value) return null;

  return (
    <li className="flex space-x-2">
      <span className="font-semibold">{`${label}: `}</span>
      <span>{value}</span>
    </li>
  );
}
