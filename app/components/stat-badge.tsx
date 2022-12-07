import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Tooltip } from './tooltip';

type StatIconBadgeProps = {
  icon?: FC<{ className: string }>;
  value: string | number | ReactNode;
  classname?: string;
  iconClassname?: string;
  textClassName?: string;
  as?: 'div' | 'li';
  tooltip?: string;
};

export function StatIconBadge({ icon: Icon, classname, iconClassname, value, textClassName, as = 'li', tooltip }: StatIconBadgeProps) {
  if (!value) return null;

  const ComponentAs: NonNullable<StatIconBadgeProps['as']> = tooltip ? 'div' : as;

  const content = (
    <ComponentAs className={twMerge(clsx('badge gap-1 whitespace-nowrap', classname))}>
      {!!Icon && <Icon className={twMerge('h-[90%]', iconClassname)} />}
      <span className={textClassName}>{value}</span>
    </ComponentAs>
  );
  return tooltip ? (
    <Tooltip text={tooltip} as={as}>
      {content}
    </Tooltip>
  ) : (
    content
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
