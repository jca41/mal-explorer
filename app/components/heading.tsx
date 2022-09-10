import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type HeadingProps = {
  as?: 'h1' | 'h2';
  children: ReactNode | string;
  className?: string;
};

export function Heading({ as: As = 'h1', children, className }: HeadingProps) {
  return <As className={twMerge('mb-4 text-center text-3xl font-bold tracking-wide md:mb-8', className)}>{children}</As>;
}
